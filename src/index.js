import express from 'express';
import cors from 'cors';
import r_users from './routers/users.js';

const app = express();

const PORT = 9000;

//use cors
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ limit:"5mb", extended: true }));

// parse application/json
app.use(express.json({ limit:"5mb" }));

// use route in express
app.use('/api/v1', r_users);

app.listen(PORT, () => {
    console.log(`Server berhasil di running di PORT: ${PORT}`);
});