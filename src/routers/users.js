import express from 'express';
import { createUser, detailUser, updateUser, deleteUser, allUser } from '../controllers/users.js';

import multer from 'multer';
import path from 'path';
// const upload = multer({ dest: './public/' });

const Router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `user_${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueSuffix);
    },
});

const upload = multer({storage: storage});

Router.post('/users', upload.single('image'), createUser)
.get('/users/', allUser)
.get('/users/:id', detailUser)
.patch('/users/:id', updateUser)
.delete('/users/:id', deleteUser);

export default Router;