import {shoopOrderList,shoopOrderInfo} from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
const defaState=fromJS({
    //订单列表
    shoopOrderList:[],
    //订单详情
    shoopOrderInfo:{
        subOrderList:[]
    }
})
export default (state = defaState,action)=>{
    if(action.type===shoopOrderList){
        return state.set('shoopOrderList',action.value);
    }
    if(action.type===shoopOrderInfo){
        return state.set('shoopOrderInfo',action.value);
    }
    return state
}