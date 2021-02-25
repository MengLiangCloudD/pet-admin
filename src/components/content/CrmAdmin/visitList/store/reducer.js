import { visitList } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
const defaState=fromJS({
    visitList:[]
})
export default (state = defaState,action)=>{
    if(action.type===visitList){
        return state.set('visitList',action.value);
    }
    return state
}