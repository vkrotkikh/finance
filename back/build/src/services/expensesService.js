"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expenses_1 = require("../../data/expenses");
const uuid_1 = require("uuid");
const getExpenses = () => {
    return expenses_1.expenses;
};
const findById = (id) => {
    const expense = expenses_1.expenses.find(e => e.id === id);
    return expense;
};
const findExpensesByUserId = (userId) => {
    const entry = expenses_1.expenses.filter(e => e.userId === userId);
    return entry;
};
const addExpenseCategory = (data) => {
    const updatedExpense = Object.assign(Object.assign({ id: (0, uuid_1.v1)() }, data), { spent: 0 });
    expenses_1.expenses.push(updatedExpense);
    return findExpensesByUserId(updatedExpense.userId);
};
const removeExpenseCategory = (id) => {
    const expense = findById(id);
    if (expense) {
        const userId = expense.userId;
        const index = expenses_1.expenses.findIndex(e => e.id === expense.id);
        expenses_1.expenses.splice(index, 1);
        return findExpensesByUserId(userId);
    }
    else {
        return [];
    }
};
exports.default = {
    getExpenses, findById, addExpenseCategory, removeExpenseCategory, findExpensesByUserId
};
