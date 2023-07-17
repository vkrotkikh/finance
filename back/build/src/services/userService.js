"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../../data/users");
const uuid_1 = require("uuid");
const bcrypt = require('bcrypt');
const getUsers = () => {
    return users_1.userData;
};
const findById = (id) => {
    const entry = users_1.userData.find(u => u.id === id);
    return entry;
};
const findByEmail = (email) => {
    const entry = users_1.userData.find(u => u.email === email);
    return entry;
};
const loginUser = (email, password) => {
    const user = findByEmail(email);
    const response = {
        status: 401,
        message: '',
        id: ''
    };
    if (user) {
        return bcrypt.compare(password, user.password).then((res) => {
            return res ? Object.assign(Object.assign({}, response), { status: 200, id: user.id }) : Object.assign(Object.assign({}, response), { message: 'Password is not correct' });
        });
    }
    else {
        return Object.assign(Object.assign({}, response), { message: 'User does not exist' });
    }
};
const addUser = (data) => {
    return bcrypt.hash(data.password, 10).then((hash) => {
        const createdUser = Object.assign(Object.assign({}, data), { id: (0, uuid_1.v1)(), password: hash });
        users_1.userData.push(createdUser);
        return createdUser.id;
    });
};
exports.default = {
    getUsers, findById, addUser, findByEmail, loginUser
};
