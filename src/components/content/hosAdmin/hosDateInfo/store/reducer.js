import { hosInfoListMap,infoList } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
const defaState=fromJS({
    hosInfoListMap:{},
    infoList:[]
})
export default (state = defaState,action)=>{
    if(action.type===hosInfoListMap){
        return state.set('hosInfoListMap',action.value);
    }
    if(action.type===infoList){
        return state.set('infoList',action.value);
    }
    return state
}