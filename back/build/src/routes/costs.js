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
const Cost = require('./../models/Cost');
const router = (0, express_1.Router)();
const asyncMiddleware = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
router.get('/', (req, res) => {
    Cost.find({ userId: req.query.userId }).then((costs) => {
        res.send(costs);
    });
});
router.get('/:id', (req, res) => {
    Cost.findOne({ id: req.params.id }).then((cost) => {
        if (cost) {
            res.send(cost);
        }
        else {
            res.sendStatus(404);
        }
    });
});
const createCost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cost = new Cost(Object.assign(Object.assign({}, req.body), { id: uuid() }));
        yield cost.save();
        const costs = yield Cost.find({ userId: cost.userId });
        res.status(200).send(costs);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
router.post('/', asyncMiddleware(createCost));
const deleteCost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cost = yield Cost.findOneAndDelete({ id: req.params.id });
    const costs = yield Cost.find({ userId: cost.userId });
    res.send(costs);
});
router.delete('/:id', asyncMiddleware(deleteCost));
exports.default = router;
