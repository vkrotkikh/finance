"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { v1: uuid } = require('uuid');
const User = require('./../models/User');
const bcrypt = require('bcrypt');
const router = (0, express_1.Router)();
const asyncMiddleware = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const checkEmail = yield User.findOne({ email: req.body.email });
    if (!checkEmail) {
        const password = yield bcrypt.hash(req.body.password, 10);
        const user = new User(Object.assign(Object.assign({}, req.body), { password, id: uuid() }));
        yield user.save();
        res.status(201).send({
            message: 'User created successfully',
            user
        });
    }
    else {
        res.status(409).send({
            message: 'User with this Email already exists'
        });
    }
});
router.post('/', asyncMiddleware(createUser));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({ email: req.body.email });
    if (user) {
        bcrypt.compare(req.body.password, user.password).then((response) => {
            if (response) {
                res.status(200).send({ message: '', user });
            }
            else {
                res.status(401).send({ message: 'Password is not correct', id: '' });
            }
        });
    }
    else {
        res.status(401).send({ message: 'User does not exist', id: '' });
    }
});
router.post('/login', asyncMiddleware(loginUser));
router.get('/', (_req, res) => {
    User.find({}).then((users) => {
        res.json(users);
    });
});
router.get('/:id', (req, res) => {
    User.findOne({ id: req.params.id }).then((user) => {
        if (user) {
            res.send(user);
        }
        else {
            res.sendStatus(404);
        }
    });
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    User.findOneAndUpdate({ id: req.params.id }, { [req.body.paramName]: req.body.paramValue }, { new: true })
        .then((user) => {
        res.send(user);
    });
});
router.put('/:id', asyncMiddleware(updateUser));
exports.default = router;
