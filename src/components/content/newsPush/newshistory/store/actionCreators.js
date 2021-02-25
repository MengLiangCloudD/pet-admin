import { newList } from './actionType';
import { fromJS } from 'immutable';
export const getNewList=(value)=>({
    type:newList,
    value:fromJS(value)
})