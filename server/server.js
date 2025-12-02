import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import cookieParser from 'cookie-parser';

import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import educationRouter from './routes/educationRoutes.js'
import workRouter from './routes/workRoutes.js'
import socialRouter from './routes/socialMediaRoutes.js'
import projectRouter from './routes/projectRoutes.js'
import milestoneRouter from './routes/milestoneRoutes.js'
import dashboardRouter from './routes/dashboardRoutes.js'

const app = express();
const port = process.env.PORT || 5000;
connectDB();

const allowedOrigins = [
    'http://localhost:5173'
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

// API Endpoints
app.get('/', (req, res) => {
    res.send('API is running');
});
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);
app.use('/api/education', educationRouter);
app.use('/api/work', workRouter);
app.use('/api/social', socialRouter);
app.use('/api/project', projectRouter);
app.use('/api/milestone', milestoneRouter);
app.use('/api/dashboard', dashboardRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});