import express from 'express';
import r_users from './routers/users.js';

const app = express();

const PORT = 9000;

app.use(express.urlencoded({ limit:"5mb", extended: true }));
app.use(express.json({ limit:"5mb" }));

// routers
app.use('/api/v1', r_users);

app.listen(PORT, () => {
    console.log(`Server berhasil di running di PORT: ${PORT}`);
});