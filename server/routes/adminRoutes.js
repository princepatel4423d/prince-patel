import express from 'express';
import adminAuth from '../middlewares/adminAuth.js';
import { getAdminData } from '../controllers/dataControllers.js';

const adminRouter = express.Router();

adminRouter.get('/data', adminAuth, getAdminData);

export default adminRouter;