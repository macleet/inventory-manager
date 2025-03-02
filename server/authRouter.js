import { Router } from "express";
import argon2 from "argon2";
import pool from "./db.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { authenticateToken } from "./authMiddleware.js";
const authRouter = Router();

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Registration
authRouter.post("/register", async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
        // Check if email still exists in DB and send message to client if so
        const result = await pool.query("SELECT 1 FROM users WHERE email = $1", [email]);

        if (result.rows.length > 0) {
            return res.status(409).json({ message: "User with email already exists." });
        }

        const hashedPassword = await argon2.hash(password, {
            // OWASP min specs
            type: argon2.argon2id,
            memoryCost: 20000,
            timeCost: 2,
            parallelism: 1
        });

        // Store hashed password + personal info in DB
        await pool.query(
            "INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4)", 
            [firstName, lastName, email, hashedPassword]
        );

        res.json({message: "User successfully created."});
    } catch (error) {
        console.error("Error registering new user:", error);
    }
});

// Login 
authRouter.post("/login", async (req, res) => {
    const { email, password, rememberMe } = req.body;
    try {
        const { id, password_hash: hashedPassword } = (await pool.query("SELECT id, password_hash FROM users WHERE email = $1", [email])).rows[0];

        // Check if user with email exists in DB
        if (!hashedPassword) { 
            res.status(409).json({message: "User with email not found."});
        }
        
        const validPassword = await argon2.verify(hashedPassword, password);
        if (!validPassword) {
            res.status(401).json({message: "Invalid password."});
        }

        // Generate JWT token
        const token = jwt.sign({ id, email }, JWT_SECRET, { expiresIn: rememberMe ? "30d" : "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: rememberMe ? 2592000000 : 3600000 // 30 days : 1 hour
        });

        res.status(200).json({message: "Sucessful login."});
    } catch (error) {
        console.error("Unexpected error logging in:", error);
    }
});

authRouter.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
});

authRouter.get("/check-auth", (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.json({ loggedIn: false });
  
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({ loggedIn: true, user: decoded });
    } catch {
        res.json({ loggedIn: false });
    }
});

authRouter.get("/profile", authenticateToken, async (req, res) => {
    const user = await pool.query("SELECT first_name, last_name, email, phone_number, address, role, notifications_enabled, mfa_enabled FROM users WHERE id = $1", [req.user.id]);
    res.json(user.rows[0]);
});

export default authRouter;
