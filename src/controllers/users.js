import Users from '../models/users.js';
import messages from '../utils/messages.js';

// CRUD to MySQL Database
// CREATE - POST
const createUser = async (req, res) => {
    const data = req.body;

    try {
        await Users.sync();
        const result = await Users.create(data);
        messages(res, 201, "Create user success", result);
    } catch (error) {
        messages(res, 500, "Internal server error");
    }
};

export { createUser };