import express from 'express';
import { register, login } from '../controllers/authController.js';

const autRouter = express.Router();

autRouter.post('/register', register);
autRouter.post('/login', login);

export default autRouter;
