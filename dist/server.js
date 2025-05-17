// server.ts
import express from 'express';
import routes from './routes/index.js';
import mongoose from './config/connection.js';
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});
