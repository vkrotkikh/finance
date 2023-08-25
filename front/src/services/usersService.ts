import axios from "axios";
import { UserData, NewUser } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const response = await axios.get<UserData[]>(`${apiBaseUrl}/users`);
  return response.data;
};

const getSingle = async (id: string) => {
  const response = await axios.get<UserData>(`${apiBaseUrl}/users/${id}`);
  return response.data;
}

const create = async (object: NewUser) => {
  const response = await axios.post( `${apiBaseUrl}/users`, object);
  return response;
};

const update = async (object: UserData) => {
  const response = await axios.put(`${apiBaseUrl}/users/${object.id}`, object)
  return response.data
};

const login = async (email: string, password: string) => {
  const response  = await axios.post(`${apiBaseUrl}/users/login`, {email, password});
  return response;
}

const changePassword = async (id: string, oldPassword: string, newPassword: string) => {
  const response  = await axios.post(`${apiBaseUrl}/users/change-password`, {id, oldPassword, newPassword});
  return response;
}

export default {
  getAll, getSingle, update, create, login, changePassword
};

