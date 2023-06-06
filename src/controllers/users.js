import Users from '../models/users.js';
import messages from '../utils/messages.js';

// CRUD to MySQL Database
const createUser = async (req, res) => {
    const data = req.body;
    const file = req.file;

    if (file) {
        try {
            await Users.sync();
            const detail_email = await Users.findOne({
                where: { email: data.email }
            });
    
            if (detail_email) {
                return messages(res, 404, "Email has been register");
            } else {
                data.image = `${file.filename}`;
                const result = await Users.create(data);
                messages(res, 201, "Create user success", { result, file });
            }
        } catch (error) {
            messages(res, 500, "Internal server error");
        } 
    } else {
        return messages(res, 423, "Field image required");
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

const updateUser = async (req, res) => {
    const id_user = req.params.id;
    const data = req.body;

    try {
        await Users.sync();
        await Users.update(data, {
            where: { id: id_user },
        });

        return messages(res, 200, "UPDATE user success");
    } catch (error) {
        messages(res, 500, "Internal server error");
    }
};

const deleteUser = async (req, res) => {
    const id_user = req.params.id;

    try {
        await Users.sync();
        const detail = await Users.destroy({
            where: { id: id_user },
        });

        if (!detail) {
            return messages(res, 404, `User id ${id_user} not found`);
        } else {
            return messages(res, 200, "DELETE user success");
        }

    } catch (error) {
        messages(res, 500, "Internal server error");
    }
};

export { createUser, detailUser, updateUser, deleteUser };