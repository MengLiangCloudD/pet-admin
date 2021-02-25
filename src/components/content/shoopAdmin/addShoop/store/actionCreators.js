import {typeList,shoopImg,shoopInfoImg,ProductId} from './actionType';
import { fromJS } from 'immutable';
export const setTypeList=(value)=>({
    type:typeList,
    value:fromJS(value)
})
export const setShoopImg=(value)=>({
    type:shoopImg,
    value
})
export const setShoopInfoImg=(value)=>({
    type:shoopInfoImg,
    value:fromJS(value)
})
export const setProductId=(value)=>({
    type:ProductId,
    value:fromJS(value)
})