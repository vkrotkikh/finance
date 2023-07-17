import  { userData }  from '../../data/users';
import { UserData, NewUser } from '../types';
import { v1 as uuid } from 'uuid';
const bcrypt = require('bcrypt')

const getUsers = () : UserData[] => {
    return userData;
};


const findById = (id: string): UserData | undefined => {
    const entry = userData.find(u => u.id === id);
    return entry;
};

const findByEmail = (email: string): UserData | undefined => {
  const entry = userData.find(u => u.email === email);
  return entry;
};

const loginUser = (email:string, password:string) => {
  const user = findByEmail(email);
  const response = {
    status: 401,
    message: '',
    id: ''
  }
  if(user){
    return bcrypt.compare(password, user.password).then((res:any) => {
      return res ? {...response, status: 200, id: user.id} : {...response, message: 'Password is not correct'}
    })
  } else {
    return {...response, message: 'User does not exist' };
  }
}

const addUser = (data:NewUser) => {
  return bcrypt.hash(data.password, 10).then((hash:any) => {
  const createdUser = { ...data, id: uuid(), password: hash }
  userData.push(createdUser)
  return createdUser.id;
});
}

export default {
    getUsers, findById, addUser, findByEmail, loginUser
  };

