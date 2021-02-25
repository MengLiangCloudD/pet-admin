import { xingNoList,visitOrderid } from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
const defaState=fromJS({
    xingNoList:["xing1","xing1","xing1","xing1","xing1"],
    visit_orderid:''
})
export default (state = defaState,action)=>{
    if(action.type===xingNoList){
        return state.set('xingNoList',action.value);
    }
    if(action.type===visitOrderid){
        return state.set('visit_orderid',action.value);
    }
    return state
}