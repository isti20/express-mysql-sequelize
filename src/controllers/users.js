import Users from '../models/users.js';
import messages from '../utils/messages.js';
import { Op } from 'sequelize';
import fs from "fs";

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
                const path = `./public/${file.filename}`;
                fs.unlinkSync(path);
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

const allUser = async (req, res) => {
    const q = req.query.q ? req.query.q : "";
    const order_by = req.query.order_by ? req.query.order_by : 'ASC';
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const per_page = req.query.per_page ? parseInt(req.query.per_page) : 10;
    
    try {
        await Users.sync();
        const total = await Users.findAndCountAll();
        const datas = await Users.findAll({
            where: {
                email: { [Op.substring]: q },
            },

            order: [["id", order_by]],
            offset: page === 1 ? 0 : (page - 1) * per_page,
            limit: per_page,
        });

        return messages(res, 200, "Users", datas, { 
            page, 
            per_page, 
            total: total.count });
    } catch (error) {
        return messages(res, 500, "Internal server error");
    }
}

export { createUser, detailUser, updateUser, deleteUser, allUser };