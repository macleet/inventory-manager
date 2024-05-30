
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import itemsRouter from './items.mjs';

const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(json({ extended: true }));
app.use(urlencoded({ extended: true }));

// Routers
app.use('/items', itemsRouter);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});