import express from 'express';
import cors from "cors";
import costRouter from './src/routes/costs';
import expensesRouter from './src/routes/expenses';
import usersRouter from './src/routes/users';
import productsRouter from './src/routes/products';
const app = express();
const logger = require('./src/utils/logger');
const config = require('./src/utils/config');
const mongoose = require('mongoose');
const login = config.MONGODB_LOGIN
const password = config.MONGODB_PWD
const url = `mongodb+srv://${login}:${password}@cluster0.vlxoyrp.mongodb.net/FinanceApp?retryWrites=true&w=majority`

require('dotenv').config()

//require('./src/telegram')

app.use(express.json());
mongoose.set('strictQuery',false)
mongoose.connect(url)

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.static('./build'));
app.use('/api/costs', costRouter);
app.use('/api/expenses', expensesRouter);
app.use('/api/users', usersRouter);
app.use('/api/users/login', usersRouter);
app.use('/api/users/change-password', usersRouter);
app.use('/api/products', productsRouter);


const PORT = 80 || 443 || 3001;
app.listen(PORT, () => {
  logger.info(`Server is running`);
});
