const { GraphQLError } = require('graphql')
const { v1: uuid } = require('uuid')
const Cost = require('./../models/Cost')


const costResolvers = {
    Mutation: {        
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
        }

    },
    Query: {
        getCostsByUserId: async (_root, args) => {
            const costs = await Cost.find({userId: args.userId})
            if(costs){
                return costs;
            } else {
                return []
            }
        }
    },
  }

  
module.exports = costResolvers