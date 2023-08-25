import { Request, Response, NextFunction, Router } from 'express';
const { v1: uuid } = require('uuid')
const Product = require('./../models/Product')
import { telegramData } from '../types';
const router = Router();

const asyncMiddleware = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
(req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next);


router.get('/', (req: Request, res: Response) => {
    Product.find({userId: req.query.userId}).then((products:telegramData[])=> {
      res.send(products)
    })
});

router.get('/:id', (req: Request, res: Response) => {
    Product.findOne({id: req.params.id}).then((product:telegramData)=> {
      if (product) {
        res.send(product);
      } else {
        res.sendStatus(404);
      }
  })
});


const createProduct = async (req: Request, res: Response) => {
  try {
      const productsArray = req.body.name.split(',').map((value:telegramData)=> ({id: uuid(), name:value, userId: req.body.userId}))
      
      await Product.insertMany(productsArray)
      const products = await Product.find({userId: req.body.userId})
      res.status(200).send(products);
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      res.status(400).send(errorMessage);
    }
}

router.post('/', asyncMiddleware(createProduct));

const deleteProduct = async (req: Request, res: Response) => {
  const product = await Product.findOneAndDelete({id: req.params.id})
  const products = await Product.find({userId: product.userId})
  res.send(products)
}

router.delete('/:id', asyncMiddleware(deleteProduct))

export default router;  