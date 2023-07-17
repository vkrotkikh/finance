"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const costs_1 = require("../../data/costs");
const uuid_1 = require("uuid");
const getCosts = () => {
    return costs_1.costsData;
};
const findCosts = (userId) => {
    const costs = costs_1.costsData.filter((c) => c.userId === userId);
    return costs;
};
const findById = (id) => {
    const cost = costs_1.costsData.find(c => c.id === id);
    return cost;
};
const addCost = (data) => {
    const cost = Object.assign({ id: (0, uuid_1.v1)() }, data);
    costs_1.costsData.push(cost);
    const updatedCosts = findCosts(cost.userId);
    return updatedCosts;
};
const removeCost = (id) => {
    const index = costs_1.costsData.findIndex(c => c.id === id);
    costs_1.costsData.splice(index, 1);
    return costs_1.costsData;
};
exports.default = {
    getCosts, findCosts, findById, addCost, removeCost
};
