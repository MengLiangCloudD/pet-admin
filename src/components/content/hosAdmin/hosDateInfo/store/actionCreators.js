import { hosInfoListMap,infoList } from './actionType';
import { fromJS } from 'immutable';
export const setHosInfoListMap=(value)=>({
    type:hosInfoListMap,
    value:fromJS(value)
})
export const setHosInfoList=(value)=>({
    type:infoList,
    value:fromJS(value)
})