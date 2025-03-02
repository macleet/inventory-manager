// import https from "https";
// import fs from "fs";
import express, { json, urlencoded } from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRouter from './authRouter.js';

const app = express();
const port = 8000;

// Load SSL certificate and key
const options = {
    // key: fs.readFileSync("./tls.key"),
    // cert: fs.readFileSync("./tls.cert"),
};

// Middleware
app.use(json({ extended: true }));
app.use(cors({ 
    origin: '*',
    // origin: "http://10.0.2.16", 
    credentials: true,
}));
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

// Routers
app.use('/auth', authRouter);

app.listen(port, "0.0.0.0", () => {
    console.log(`HTTP server running on port ${port}`);
});
