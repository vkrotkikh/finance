const { v1: uuid } = require('uuid')
const Product = require('./../models/Product')
import { telegramData } from "../types"

export const createProductFromTelegram = async (req:telegramData) => {
    try {
        const productsArray = req.name.split(',').map((value:string)=> ({id: uuid(), name:value, userId: req.userId}))
        await Product.insertMany(productsArray)
        return 'Products Added Successfully';
      } catch (error: unknown) {
        return 'Products were not added';
      }
  }