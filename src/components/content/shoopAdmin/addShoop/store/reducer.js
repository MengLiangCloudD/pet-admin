import {typeList,shoopImg,shoopInfoImg,ProductId} from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
const defaState=fromJS({
    //类型列表
    typeList:{a:[],b:[],c:[]},
    //商品主图
    shoopImg:'',
    // 商品详情图
    shoopInfoImg:[],
    //ProductId
    ProductId:''
})
export default (state = defaState,action)=>{
    if(action.type===typeList){
        return state.set('typeList',action.value);
    }
    if(action.type===shoopImg){
        return state.set('shoopImg',action.value);
    }
    if(action.type===shoopInfoImg){
        return state.set('shoopInfoImg',action.value);
    }
    if(action.type===ProductId){
        return state.set('ProductId',action.value);
    }
    return state
}