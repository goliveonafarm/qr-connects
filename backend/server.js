import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import userEventRoutes from './routes/userEvent.routes.js';
import responseRoutes from './routes/response.routes.js';
import participantRoutes from './routes/participant.routes.js';
import connectToMongoDB from './db/connectToMongoDB.js';

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json()); // to parse the incoming request with JSON payloads (from req.body)
app.use(cookieParser()); // to parse the incoming request cookies

app.use("/api/auth", authRoutes);
app.use("/api/events", userEventRoutes);
app.use("/api/responses", responseRoutes);
app.use("/api/participant", participantRoutes);

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
})

app.get('/', (req, res) => {

    res.send("Hello Washington!");
});

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server running on port ${PORT}`);
});

