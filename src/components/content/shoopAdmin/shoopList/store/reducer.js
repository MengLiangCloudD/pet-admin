import {geetlist} from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
const defaState=fromJS({
      //数据
      shoopList:[],
})
export default (state = defaState,action)=>{
    if(action.type===geetlist){
        //immutable数据用set改变
        return state.set('shoopList',action.value)
    }
    return state
}