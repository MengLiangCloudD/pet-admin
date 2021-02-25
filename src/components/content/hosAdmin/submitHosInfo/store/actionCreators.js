import { hosInfoImg,hosInfoMap } from './actionType';
import { fromJS } from 'immutable';
export const setHosInfoImg=(value)=>({
    type:hosInfoImg,
    value:fromJS(value)
})
export const setHosInfoMap=(value)=>({
    type:hosInfoMap,
    value:fromJS(value)
})