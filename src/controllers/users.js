import Users from '../models/users.js';

// CRUD to MySQL Database
// CREATE - POST
const createUser = (req, res) => {
    const body = req.body;
    res.send(body);
};

export { createUser };