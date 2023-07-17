const typeDefs = `
type Query {
  getUserById(id: String!): User
  getUserByEmail(email: String!): User
  getCostsByUserId(userId: String!): [Cost]
  getExpensesByUserId(userId: String!): [Expense]
}

type User {
  id: String!
  email: String!
  password: String!
  name: String!
  mylimit: Int
  regDate: String
}

type Cost {
  id: String
  userId: String!
  expenseId: String!
  ammount: Int!
  date: String

}

type Expense {
  userId: String!
  id: String!
  name: String!
  limit: Int!
  spent: Int!
  type: String!
  date: String
}

type Mutation {
  createUser(
    id: String
    email: String!
    password: String!
    name: String
    mylimit: Int
    regDate: String
  ): User

  deleteUser(id:String!): User

  updateUserLimit(
    id: String!
    mylimit: Int!
  ): User

  createCost(
    id: String
    userId: String!
    expenseId: String!
    ammount: Int!
    date: String
  ): Cost

  deleteCost( id: String! ): Cost

  createExpense(
    id: String
    userId: String!
    name: String!
    limit: Int!
    type: String!
    spent: Int
    date: String
  ): Expense

  deleteExpense( id: String! ): Expense

  updateExpense(
    id: String!
    fieldName: String!
    fieldValue: ID!
  ): Expense
}
`

  
module.exports = typeDefs