"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenses = void 0;
const types_1 = require("../src/types");
exports.expenses = [
    {
        id: '7fbba320-18fd-11ee-bb1e-b9518f783aff',
        userId: '2fdfcfe0-2030-11ee-aeaa-b3b9a3d1d08c',
        name: 'Food',
        limit: 1000,
        spent: 400,
        type: types_1.ExpenseType.Household,
        date: '7/3/2023'
    },
    {
        id: 'a0fb2470-18fd-11ee-9f3d-b778201ce227',
        userId: '2fdfcfe0-2030-11ee-aeaa-b3b9a3d1d08c',
        name: 'Entertainment',
        limit: 800,
        spent: 180,
        type: types_1.ExpenseType.Household,
        date: '7/3/2023'
    },
    {
        id: 'a5b6fed0-18fd-11ee-9f3d-b778201ce227',
        userId: '2fdfcfe0-2030-11ee-aeaa-b3b9a3d1d08c',
        name: 'Transport',
        limit: 168,
        spent: 96,
        type: types_1.ExpenseType.Household,
        date: '7/3/2023'
    },
    {
        id: 'd72fe6b0-18fd-15ee-fa3d-c778201ce556',
        userId: '2fdfcfe0-2030-11ee-aeaa-b3b9a3d1d08c',
        name: 'Rent',
        limit: 2650,
        spent: 2650,
        type: types_1.ExpenseType.Fixed,
        date: '7/3/2023'
    }
];
