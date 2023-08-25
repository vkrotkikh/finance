import { Request, Response, NextFunction, Router } from 'express';
import { ExpenseData } from '../types';

const { v1: uuid } = require('uuid')
const Expense = require('./../models/Expense')

const router = Router();

const asyncMiddleware = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => 
  Promise.resolve(fn(req, res, next)).catch(next);

router.get('/', (req: Request, res: Response) => {
    Expense.find({userId: req.query.userId}).then((expenses:ExpenseData)=>{
        res.send(expenses)
    })
});

router.get('/:id', (req: Request, res: Response) => {
    Expense.findOne({id: req.params.id}).then((expense:ExpenseData)=> {
        if (expense) {
          res.send(expense);
        } else {
          res.sendStatus(404);
        }
    })

  });

  const updateExpense = async (req: Request, res: Response) => {
    try {
        await Expense.replaceOne({id: req.body.id}, req.body)
        const expenses = await Expense.find({userId: req.body.userId})
        res.send(expenses)
      } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
      }
  } 

  router.put('/:id', asyncMiddleware(updateExpense));

  const createExpense = async (req: Request, res: Response) => {
    try {
        const expense = new Expense({...req.body , id: uuid()});
        await expense.save()
        const expenses = await Expense.find({userId: expense.userId})
        res.status(200).send(expenses);
      } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
      }
  }
  
  router.post('/', asyncMiddleware(createExpense));
  

  const deleteExpense = async (req: Request, res: Response) => {
    const expense = await Expense.findOneAndDelete({id: req.params.id})
    const expenses = await Expense.find({userId: expense.userId})
    res.send(expenses)
  }

  router.delete('/:id', asyncMiddleware(deleteExpense))

export default router;  