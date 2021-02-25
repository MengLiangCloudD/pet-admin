import {shoopOrderList,shoopOrderInfo} from './actionType';
import { fromJS } from 'immutable';
export const setShoopOrderList=(value)=>({
    type:shoopOrderList,
    value:fromJS(value)
})
export const setShoopOrderInfo=(value)=>({
    type:shoopOrderInfo,
    value:fromJS(value)
})