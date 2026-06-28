import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Backend Engine is running smoothly!' });
});

// Boot logic
const PORT = process.env.PORT || 8000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
