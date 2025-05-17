// routes/index.ts
import { Router } from 'express';
//import userRoutes from './api/userRoutes';
//import thoughtRoutes from './api/thoughtRoutes';

import apiRoutes from './api/index.js';

const router = Router();

//router.use('/api/users', userRoutes);
//router.use('/api/thoughts', thoughtRoutes);

router.use('/api', apiRoutes);

// Fallback route if no API route is matched
router.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default router;