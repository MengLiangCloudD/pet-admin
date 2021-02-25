import { visitList } from './actionType';
import { fromJS } from 'immutable';
export const setVisitList=(value)=>({
    type:visitList,
    value:fromJS(value)
})