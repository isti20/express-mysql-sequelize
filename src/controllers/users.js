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

const detailUser = async (req, res) => {
    const id_user = req.params.id;

    try {
        await Users.sync();
        const detail = await Users.findOne({
            where: { id: id_user },
        });

        if (!detail) {
            return messages(res, 404, `User id ${id_user} not found`);
        } else {
            return messages(res, 200, "GET detail user success", detail);
        }

    } catch (error) {
        messages(res, 500, "Internal server error");
    }
};

export { createUser, detailUser };