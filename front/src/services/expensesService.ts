import axios from "axios";
import { Expenses, NewExpenses } from "../types";
import { apiBaseUrl } from "../constants";


const getAll = async (userId:string) => {
  const response = await axios.get<Expenses[]>(`${apiBaseUrl}/expenses`, {params: {userId}})
  return response.data
};

const getSingle = async (id: string) => {
  const response = await axios.get<Expenses>(`${apiBaseUrl}/expenses/${id}`)
  return response.data
}
const create = async (object: NewExpenses) => {
  const response = await axios.post( `${apiBaseUrl}/expenses`, object)
  return response.data
};

const update = async (object: Expenses) => {
  const response = await axios.put(`${apiBaseUrl}/expenses/${object.id}`, object)
  return response.data
};


const remove = async (id: string) => {
  const response = await axios.delete(`${apiBaseUrl}/expenses/${id}`)
  return response.data
};

export default {
  getAll, getSingle, update, create, remove
};

