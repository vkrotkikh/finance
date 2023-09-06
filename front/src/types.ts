export enum ExpenseType {
  Household = 'household',
  Fixed = 'fixed'
}

export enum NotificationTypes {
  Info = 'info',
  Error = 'error',
  Success = 'success'
}

export enum PageLinks {
  home = '/', 
  signup = '/signup',
  limits = '/limits',
  statistic = '/statistic',
  profile = '/profile'
}

export interface Cost {
  id: string;
  userId: string;
  expenseId: string;
  ammount: number;
  date: string;
}

export type NewCost = Omit<Cost, 'id'>;


export interface Product {
  id: string;
  userId: string;
  name: string;
}

export type NewProduct = Omit<Product, 'id'>;


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
  telegramNames?: string[];
}

export type NewUser = Omit<UserData, 'id' >;

export type chartStatItem = {
  [key: string]: number | string;
}


export interface LoginFormErrorsData {
  email?: string;
  password?: string;
}