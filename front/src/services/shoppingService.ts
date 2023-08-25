import axios from "axios";
import { Product, NewProduct } from "../types";
import { apiBaseUrl } from "../constants";


const getAll = async (userId:string) => {
  const response = await axios.get<Product>(`${apiBaseUrl}/products`, {params: {userId}})
  return response.data
};

const getSingle = async (id: string) => {
  const response = await axios.get<Product>(`${apiBaseUrl}/products/${id}`)
  return response.data
}

const create = async (object: NewProduct) => {
  const response = await axios.post( `${apiBaseUrl}/products`, object)
  return response.data
};

const remove = async (id: string) => {
  const response = await axios.delete(`${apiBaseUrl}/products/${id}`)
  return response.data
};

export default {
  getAll, getSingle, create, remove
};

