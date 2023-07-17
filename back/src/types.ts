declare module 'express-session' {
  interface Session {
     store: {};
   }
 }

export enum ExpenseType {
  Fixed = 'fixed',
  Household = 'household'
}

export interface Cost {
  id: string;
  userId: string;
  expenseId: string;
  ammount: number;
  date: string;
}

export type NewCost = Omit<Cost, 'id'>;

export interface Expense {
  userId: string;
  id: string;
  name: string;
  limit: number;
  spent: number;
  type: string;
  date?: string;
}

export type NewExpense = Omit<Expense, 'id' | 'spent'>;


export interface UserData {
  id: string;
  email: string;
  password:string;
  name:string;
  mylimit:number;
  regDate: string;
}

export type NewUser = Omit<UserData, 'id'>;