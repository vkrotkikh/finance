import { Request, Response, NextFunction, Router } from 'express';
import { UserData } from '../types';
const { v1: uuid } = require('uuid')
const User = require('./../models/User')
const bcrypt = require('bcrypt');

const router = Router();

const asyncMiddleware = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => 
  Promise.resolve(fn(req, res, next)).catch(next);

const createUser = async (req: Request, res: Response) => {
  const checkEmail = await User.findOne({email: req.body.email.toLowerCase()})
  if(!checkEmail){
    const  password =  await bcrypt.hash(req.body.password, 10);
    const user = new User({...req.body, password, id: uuid()})
    await user.save()
    res.status(201).send({
      message: 'User created successfully',
      user
    });    
  } else {
    res.status(409).send({message: 'User with this Email already exists'})
  }
};

router.post('/', asyncMiddleware(createUser));

const loginUser = async (req: Request, res: Response) => {
  const user = await User.findOne({email: req.body.email.toLowerCase()})
  if(user){
    bcrypt.compare(req.body.password, user.password).then((response:UserData) => {
      if(response) {
        res.status(200).send({message: '', user})
      } else {
        res.status(401).send({message: 'Password is not correct', id: ''})
      }
    })
  } else {
    res.status(401).send({message: 'User does not exist', id:'' })    
  }
};

router.post('/login', asyncMiddleware(loginUser));


const changePassword = async (req: Request, res: Response) => {
  const user = await User.findOne({id: req.body.id})
  if(user){
    const checkPassword = await bcrypt.compare(req.body.oldPassword, user.password)
    const comparePasswords = await bcrypt.compare(req.body.newPassword, user.password)
      if(checkPassword && !comparePasswords) {
        const  password =  await bcrypt.hash(req.body.newPassword, 10);
        await User.findOneAndUpdate({id: user.id}, { $set: { password: password }}, {new: true})
        res.status(200).send({message: ''})
      } else if(checkPassword && comparePasswords){
        res.status(401).send({message: 'The new password must be different from the old password'})
      } else {
        res.status(401).send({message: 'Old Password is not correct'})
      }
  }
};

router.post('/change-password', asyncMiddleware(changePassword));
  
router.get('/', (_req: Request, res: Response) => {
  User.find({}).then((users:UserData[]) =>{
    res.json(users)
  })
});

router.get('/:id', (req: Request, res: Response) => {
    User.findOne({id: req.params.id}).then((user:UserData)=> {
      if (user) {
        res.send(user);
      } else {
        res.sendStatus(404);
      }
    })
  });

  const updateUser = async (req: Request, res: Response) => {
      User.findOneAndUpdate({id: req.params.id}, { $set: req.body}, {new: true})
        .then((user:UserData)=> {
          res.send(user)
      })
  }

  router.put('/:id', asyncMiddleware(updateUser));
  
export default router;  