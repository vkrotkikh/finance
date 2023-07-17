import { Request, Response, NextFunction, Router } from 'express';
const { v1: uuid } = require('uuid')
const User = require('./../models/User')
const bcrypt = require('bcrypt');

const router = Router();

const asyncMiddleware = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => 
  Promise.resolve(fn(req, res, next)).catch(next);

const createUser = async (req: Request, res: Response) => {
  const checkEmail = await User.findOne({email: req.body.email})
  if(!checkEmail){
    const  password =  await bcrypt.hash(req.body.password, 10);
    const user = new User({...req.body, password, id: uuid()})
    await user.save()
    res.status(201).send({
      message: 'User created successfully',
      user
    });    
  } else {
    res.status(409).send({
      message: 'User with this Email already exists'
    })
  }
};

router.post('/', asyncMiddleware(createUser));

const loginUser = async (req: Request, res: Response) => {
  const user = await User.findOne({email: req.body.email})
  if(user){
    bcrypt.compare(req.body.password, user.password).then((response:any) => {
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
  
router.get('/', (_req: Request, res: Response) => {
  User.find({}).then((users:any) =>{
    res.json(users)
  })
});

router.get('/:id', (req: Request, res: Response) => {
    User.findOne({id: req.params.id}).then((user:any)=> {
      if (user) {
        res.send(user);
      } else {
        res.sendStatus(404);
      }
    })
  });

  const updateUser = async (req: Request, res: Response) => {
    User.findOneAndUpdate({ id: req.params.id}, {[req.body.paramName]: req.body.paramValue}, {new: true })
      .then((user:any)=> {
      res.send(user)
    })
  }

  router.put('/:id', asyncMiddleware(updateUser));
  
export default router;  