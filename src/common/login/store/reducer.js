import {userNameType,passwordType} from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
const defaState=fromJS({
    userName:'',
    password:''
})
export default (state = defaState,action)=>{
    if(action.type===userNameType){
        return state.set('userName',action.value);
    }
    if(action.type===passwordType){
        return state.set('password',action.value);
    }
    return state
}