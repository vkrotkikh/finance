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

export interface Expenses {
  userId: string;
  id: string;
  name: string;
  limit: number;
  spent: number;
  type: string;
  date?: string;
}
export type NewExpenses = Omit<Expenses, 'id' | 'spent'>;

export interface UserData {
  id: string;
  email: string;
  password: string;
  name:string;
  mylimit:number;
  regDate: string;
  error?: string;
  isLoggedIn?: boolean;
}

export type LoggedInUser = Omit<UserData, 'password' >;

export type NewUser = Omit<UserData, 'id' >;



export interface LoginFormErrorsData {
  email?: string;
  password?: string;
}