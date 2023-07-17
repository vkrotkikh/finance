const { GraphQLError } = require('graphql')
const { v1: uuid } = require('uuid')
const User = require('./models/User')
const Expense = require('./models/Expense')
const Cost = require('./models/Cost')


const resolvers = {
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
        },
        updateUserLimit: (_root, args) => {
            const user = userData.find(u => u.id === args.id)
            if(!user){
            return null
            }
            const updatedUser = {...user, mylimit: args.mylimit}
            return updatedUser
        },
        
        createCost: (_root, args) => {
            const date = new Date()
            const cost = new Cost ({
            id: uuid(),
            userId: args.userId,
            expenseId: args.ExpenseId,
            ammount: args.ammount,
            date: date.toString()
            })
            return cost.save().catch((error) => {
            throw new GraphQLError('Something went wrong', {
                extensions: {
                code: 'BAD_COST_INPUT',
                error,
                },
            })
            })
        },

        deleteCost: (_root, args) => {
            Cost.findOneAndDelete({id: args.id}).then((deletedCost)=>{
                if(deletedCost){
                    console.log(`Cost was deleted`)
                } else {
                    console.log(`Cost was not deleted`)
                }
            }).catch((error)=> {
                throw new GraphQLError('Cost was not deleted', {
                    extensions: {
                    code: 'BAD_COST_INPUT',
                    error,
                    },
                })
            })
        },   

        createExpense: async (_root, args) => {
            const date = new Date()
            const expense = new Expense ({
                id: uuid(),
                userId: args.userId,
                name: args.name,
                limit: args.limit,
                type: args.type,
                spent: 0,
                date: date.toString()
            })
            return await expense.save().catch((error) => {
                throw new GraphQLError('Something went wrong', {
                extensions: {
                    code: 'BAD_EXPENSE_INPUT',
                    error,
                },
                })
            })
            },

            deleteExpense: (_root, args) => {
                Expense.findOneAndDelete({id: args.id}).then((deletedExpense)=>{
                    if(deletedExpense){
                        console.log(`Expense ${deletedExpense.name} was deleted`)
                    } else {
                        console.log(`Expense was not deleted`)
                    }
                }).catch((error)=> {
                    throw new GraphQLError('Cost was not deleted', {
                        extensions: {
                        code: 'BAD_EXPENSE_INPUT',
                        error,
                        },
                    })
                })
            }, 

            updateExpense: (_root, args) => {
                const updateParam = {}
                updateParam[args.fieldName] = args.fieldValue;
                Expense.findOneAndUpdate({ id: args.id }, updateParam, { new: true }).then((updatedExpense)=> {
                    if(updatedExpense){
                        console.log(updatedExpense)
                    } else {
                        console.log(`Expense was not updated`)
                    }
                }).catch((error)=> {
                    throw new GraphQLError('Cost was not deleted', {
                        extensions: {
                        code: 'BAD_EXPENSE_INPUT',
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

        getCostsByUserId: async (_root, args) => {
            const costs = await Cost.find({userId: args.userId})
            if(costs){
                return costs;
            } else {
                return []
            }
        },

        getExpensesByUserId: async (_root, args) => {
            const expenses = await Expense.find({userId: args.userId})
            console.log(expenses)
            if(expenses){
                return expenses;
            } else {
                return []
            }
        }
    },
  }

  
module.exports = resolvers