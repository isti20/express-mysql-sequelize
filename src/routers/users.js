import express from 'express';
import { createUser } from '../controllers/users.js';

const Router = express.Router();

Router.post('/users', createUser);

export default Router;