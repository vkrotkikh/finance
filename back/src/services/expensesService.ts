import  { expenses }  from '../../data/expenses';
import { Expense, NewExpense } from '../types';
import { v1 as uuid } from 'uuid';

const getExpenses = () : Expense[] => {
    return expenses;
};

const findById = (id: string): Expense | undefined => {
    const expense = expenses.find(e => e.id === id);
    return expense;
};

const findExpensesByUserId = (userId: string): Expense[] | undefined => {
    const entry = expenses.filter(e => e.userId === userId);
    return entry;
};
const addExpenseCategory = (data:NewExpense) => {
    const updatedExpense = { id: uuid(), ...data , spent: 0}
    expenses.push(updatedExpense)
    return findExpensesByUserId(updatedExpense.userId);
}


const removeExpenseCategory = (id:string) => {
    const expense = findById(id)
    if(expense){
        const userId = expense.userId;
        const index = expenses.findIndex(e => e.id === expense.id);
        expenses.splice(index, 1)
        return findExpensesByUserId(userId)
    } else {
        return []
    }
}

export default {
    getExpenses, findById, addExpenseCategory, removeExpenseCategory, findExpensesByUserId
  };

