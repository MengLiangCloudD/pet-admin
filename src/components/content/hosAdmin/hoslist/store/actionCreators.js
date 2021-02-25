import { Hoslist,AreaList,ByAreaIdList } from './actionType';
import { fromJS } from 'immutable';
export const setHoslist=(value)=>({
    type:Hoslist,
    value:fromJS(value)
})
export const setAreaList=(value)=>({
    type:AreaList,
    value:fromJS(value)
})
export const setByAreaIdList=(value)=>({
    type:ByAreaIdList,
    value:fromJS(value)
})