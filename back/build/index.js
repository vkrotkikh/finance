"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const costs_1 = __importDefault(require("./src/routes/costs"));
const expenses_1 = __importDefault(require("./src/routes/expenses"));
const users_1 = __importDefault(require("./src/routes/users"));
const logger = require('./src/utils/logger');
const config = require('./src/utils/config');
/*
const userResolvers = require('./src/resolvers/user')
const expenseResolvers = require('./src/resolvers/expense')
const costResolvers = require('./src/resolvers/cost')
*/
const app = (0, express_1.default)();
app.use(express_1.default.json());
/*
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const typeDefs = require('./src/schema')

const resolvers = [userResolvers, expenseResolvers, costResolvers]
*/
// DATABASE CONNECTION
const mongoose = require('mongoose');
const password = 'kezyeap5ydPRClu6';
const url = `mongodb+srv://vkrotkikh:${password}@cluster0.vlxoyrp.mongodb.net/FinanceApp?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);
mongoose.connect(url);
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use((0, cors_1.default)());
app.use(express_1.default.static('./build/front'));
app.use('/api/costs', costs_1.default);
app.use('/api/expenses', expenses_1.default);
app.use('/api/users', users_1.default);
app.use('/api/users/login', users_1.default);
/*
const server = new ApolloServer({
  typeDefs,
  resolvers,
})
startStandaloneServer(server, {
  listen: 4000,
}).then(() => {
  logger.info(`Server ready at http://localhost:4000`)
})
*/
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
});
