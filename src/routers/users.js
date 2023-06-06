import express from 'express';
import { createUser, detailUser } from '../controllers/users.js';

const Router = express.Router();

Router.post('/users', createUser);
Router.get('/users/:id', detailUser);

export default Router;