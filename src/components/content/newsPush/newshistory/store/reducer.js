import { newList } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
const defaState=fromJS({
    newList:[]
})
export default (state = defaState,action)=>{
    if(action.type===newList){
        return state.set('newList',action.value);
    }
    return state
}