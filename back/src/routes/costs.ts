import { Request, Response, NextFunction, Router } from 'express';
const { v1: uuid } = require('uuid')
const Cost = require('./../models/Cost')
import { CostData } from '../types';

const router = Router();

const asyncMiddleware = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
(req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next);


router.get('/', (req: Request, res: Response) => {
    Cost.find({userId: req.query.userId}).then((costs:CostData[])=> {
      res.send(costs)
    })
});

router.get('/:id', (req: Request, res: Response) => {
  Cost.findOne({id: req.params.id}).then((cost:CostData)=> {
      if (cost) {
        res.send(cost);
      } else {
        res.sendStatus(404);
      }
  })
});


const createCost = async (req: Request, res: Response) => {
  try {
      const cost = new Cost({...req.body, id: uuid()});
      await cost.save()
      const costs = await Cost.find({userId: cost.userId})
      res.status(200).send(costs);
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      res.status(400).send(errorMessage);
    }
}

router.post('/', asyncMiddleware(createCost));

const deleteCost = async (req: Request, res: Response) => {
  const cost = await Cost.findOneAndDelete({id: req.params.id})
  const costs = await Cost.find({userId: cost.userId})
  res.send(costs)
}

router.delete('/:id', asyncMiddleware(deleteCost))

export default router;  