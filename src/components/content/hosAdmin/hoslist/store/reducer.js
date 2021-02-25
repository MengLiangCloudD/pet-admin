import { Hoslist,AreaList,ByAreaIdList } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
const defaState=fromJS({
    Hoslist:[],
    AreaList:[],
    ByAreaIdList:[]
    
})
export default (state = defaState,action)=>{
    if(action.type===Hoslist){
        return state.set('Hoslist',action.value);
    }
    if(action.type===AreaList){
        return state.set('AreaList',action.value);
    }
    if(action.type===ByAreaIdList){
        return state.set('ByAreaIdList',action.value);
    }
    
    return state
}