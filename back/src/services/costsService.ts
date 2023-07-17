import  { costsData }  from '../../data/costs';
import { Cost, NewCost } from '../types';
import { v1 as uuid } from 'uuid';


const getCosts = () => {
    return costsData;
}

const findCosts = (userId: string)  => {
    const costs = costsData.filter((c) => c.userId === userId);
    return costs;
};

const findById = (id: string): Cost | undefined => {
    const cost = costsData.find(c => c.id === id);
    return cost;
};

const addCost = (data:NewCost) => {
    const cost = { id: uuid(), ...data}
    costsData.push(cost)
    const updatedCosts = findCosts(cost.userId)
    return updatedCosts;
}


const removeCost = (id:string) => {
    const index = costsData.findIndex(c => c.id === id);
    costsData.splice(index, 1)
    
    return costsData
}

export default {
    getCosts, findCosts, findById, addCost, removeCost
  };

