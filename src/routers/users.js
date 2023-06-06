import express from 'express';
import { createUser, detailUser, deleteUser } from '../controllers/users.js';

const Router = express.Router();

Router.post('/users', createUser)
.get('/users/:id', detailUser)
.delete('/users/:id', deleteUser);

export default Router;