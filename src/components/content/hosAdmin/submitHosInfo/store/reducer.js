import { hosInfoImg,hosInfoMap } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
const defaState=fromJS({
    hosInfoImg:[],
    hosInfoMap:{}
    
})
export default (state = defaState,action)=>{
    if(action.type===hosInfoImg){
        return state.set('hosInfoImg',action.value);
    }
    if(action.type===hosInfoMap){
        return state.set('hosInfoMap',action.value);
    }
    return state
}