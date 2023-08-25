declare module 'express-session' {
  interface Session {
     store: {};
   }
 }

export enum ExpenseType {
  Fixed = 'fixed',
  Household = 'household'
}

export interface CostData {
  id: string;
  userId: string;
  expenseId: string;
  ammount: number;
  date: string;
}

export type NewCost = Omit<CostData, 'id'>;

export interface ExpenseData {
  userId: string;
  id: string;
  name: string;
  limit: number;
  spent: number;
  type: string;
  date?: string;
}

export type NewExpense = Omit<ExpenseData, 'id' | 'spent'>;


export interface UserData {
  id: string;
  email: string;
  password:string;
  name:string;
  mylimit:number;
  regDate: string;
  telegramNames?: string[];
}

export interface telegramData {
  name: string,
  userId: string
}

export type NewUser = Omit<UserData, 'id'>;