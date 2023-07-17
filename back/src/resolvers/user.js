const { GraphQLError } = require('graphql')
const { v1: uuid } = require('uuid')
const User = require('./../models/User')


const userResolvers = {
    Mutation: {
        createUser: (_root, args) => {
        const name = args.email.split('@')[0];
        const date = new Date()
            const user = new User ({
            id: uuid(),
            email: args.email,
            password: args.password,
            name,
            mylimit: 0,
            regDate: date.toString()
            })
            return user.save().catch((error) => {
            throw new GraphQLError('Creating the user failed', {
                extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error,
                },
            })
            })
        },
        updateUserLimit: (_root, args) => {
            const user = userData.find(u => u.id === args.id)
            if(!user){
            return null
            }
            const updatedUser = {...user, mylimit: args.mylimit}
            return updatedUser
        },
        deleteUser: (_root, args) => {
            User.findOneAndDelete({id: args.id}).then((deletedUser)=>{
                if(deletedUser){
                    console.log(`user ${deletedUser.name} was deleted`)
                } else {
                    console.log(`user was not deleted`)
                }
            }).catch((error)=> {
                throw new GraphQLError('User was not deleted', {
                    extensions: {
                    code: 'BAD_COST_INPUT',
                    error,
                    },
                })
            })
        }
    },
    Query: {
        getUserById: async (_root, args) => {
            return await User.findOne({id: args.id}).catch((error)=> {
                throw new GraphQLError('User was not found', {
                    extensions: {
                    code: 'BAD_USER_INPUT',
                    error,
                    },
                })
            })
        },
        getUserByEmail: async (_root, args) => {
            return await User.findOne({email: args.email}).catch((error)=> {
                throw new GraphQLError('User was not found', {
                    extensions: {
                    code: 'BAD_USER_INPUT',
                    error,
                    },
                })
            })
        },
    },
  }

  
module.exports = userResolvers