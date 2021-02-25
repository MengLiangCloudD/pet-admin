import {TypeListForm} from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
const defaState=fromJS({
      //数据
      typeListForm:[],
})
export default (state = defaState,action)=>{
    if(action.type===TypeListForm){
        //immutable数据用set改变
        return state.set('typeListForm',action.value)
    }
    return state
}