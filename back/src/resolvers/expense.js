const { GraphQLError } = require('graphql')
const { v1: uuid } = require('uuid')
const Expense = require('./../models/Expense')


const expenseResolvers = {
    Mutation: {
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

  
module.exports = expenseResolvers