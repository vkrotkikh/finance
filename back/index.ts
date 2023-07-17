import express from 'express';
import cors from "cors";
import costRouter from './src/routes/costs';
import expensesRouter from './src/routes/expenses';
import usersRouter from './src/routes/users';

const logger = require('./src/utils/logger');
const config = require('./src/utils/config')
/*
const userResolvers = require('./src/resolvers/user')
const expenseResolvers = require('./src/resolvers/expense')
const costResolvers = require('./src/resolvers/cost')
*/
const app = express();
app.use(express.json());
/*
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const typeDefs = require('./src/schema')

const resolvers = [userResolvers, expenseResolvers, costResolvers]
*/
// DATABASE CONNECTION

const mongoose = require('mongoose')
const password = 'kezyeap5ydPRClu6'
const url = `mongodb+srv://vkrotkikh:${password}@cluster0.vlxoyrp.mongodb.net/FinanceApp?retryWrites=true&w=majority`
mongoose.set('strictQuery',false)
mongoose.connect(url)

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.static('./build/front'));

app.use('/api/costs', costRouter);
app.use('/api/expenses', expensesRouter);
app.use('/api/users', usersRouter);
app.use('/api/users/login', usersRouter);


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
