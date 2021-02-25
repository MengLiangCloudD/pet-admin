import { xingNoList,visitOrderid } from './actionType';
import { fromJS } from 'immutable';
export const setXingNoList=(value)=>({
    type:xingNoList,
    value:fromJS(value)
})
export const setVisitOrderid=(value)=>({
    type:visitOrderid,
    value:value
})