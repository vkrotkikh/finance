import axios from "axios";
import { Cost, NewCost } from "../types";
import { apiBaseUrl } from "../constants";


const getAll = async (userId:string) => {
  const response = await axios.get<Cost>(`${apiBaseUrl}/costs`, {params: {userId}})
  return response.data
};

const getSingle = async (id: string) => {
  const response = await axios.get<Cost>(`${apiBaseUrl}/costs/${id}`)
  return response.data
}

const create = async (object: NewCost) => {
  const response = await axios.post( `${apiBaseUrl}/costs`, object)
  return response.data
};

const remove = async (id: string) => {
  const response = await axios.delete(`${apiBaseUrl}/costs/${id}`)
  return response.data
};

export default {
  getAll, getSingle, create, remove
};

