import express from 'express';
import { createUser, detailUser, updateUser, deleteUser } from '../controllers/users.js';

const Router = express.Router();

Router.post('/users', createUser)
.get('/users/:id', detailUser)
.patch('/users/:id', updateUser)
.delete('/users/:id', deleteUser);

export default Router;