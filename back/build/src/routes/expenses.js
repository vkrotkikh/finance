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
//import expensesService from '../services/expensesService';
const { v1: uuid } = require('uuid');
const Expense = require('./../models/Expense');
const router = (0, express_1.Router)();
const asyncMiddleware = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
// FIX TYPES FOR ALL ELEMENTS
router.get('/', (req, res) => {
    Expense.find({ userId: req.query.userId }).then((expenses) => {
        res.send(expenses);
    });
});
router.get('/:id', (req, res) => {
    Expense.findOne({ id: req.params.id }).then((expense) => {
        if (expense) {
            res.send(expense);
        }
        else {
            res.sendStatus(404);
        }
    });
});
const updateExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Expense.replaceOne({ id: req.body.id }, req.body);
        const expenses = yield Expense.find({ userId: req.body.userId });
        res.send(expenses);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
router.put('/:id', asyncMiddleware(updateExpense));
const createExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expense = new Expense(Object.assign(Object.assign({}, req.body), { id: uuid() }));
        yield expense.save();
        const expenses = yield Expense.find({ userId: expense.userId });
        res.status(200).send(expenses);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
router.post('/', asyncMiddleware(createExpense));
const deleteExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const expense = yield Expense.findOneAndDelete({ id: req.params.id });
    const expenses = yield Expense.find({ userId: expense.userId });
    res.send(expenses);
});
router.delete('/:id', asyncMiddleware(deleteExpense));
exports.default = router;
