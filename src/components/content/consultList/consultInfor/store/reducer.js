import {recordList,OrderList,ordeId,OrderCode,Message,heardImg,selectList,yetSelect,optOn,websocketobj} from './actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
const defaState=fromJS({
    //聊天记录
    recordList:[
        
    ],
    //订单列表
    OrderList:[],
    //订单号
    ordeId:'',
    OrderCode:'',
    MessageCode:0,
    heardImg:'',
    //查询出的数据
    selectList:[],
      //已经选择的数据
      yetSelect:[],
      //选中的数据
      optOn:{},
      CheckboxGroup:[0,1,2,3],
      websocketobj:''
})
export default (state = defaState,action)=>{
    if(action.type===recordList){
        return state.set('recordList',action.value);
    }
    if(action.type===OrderList){
        return state.set('OrderList',action.value);
    }
    if(action.type===ordeId){
        return state.set('ordeId',action.value);
    }
    if(action.type===OrderCode){
        return state.set('OrderCode',action.value);
    }
    if(action.type===Message){
        return state.set('MessageCode',action.value);
    }
    if(action.type===heardImg){
        return state.set('heardImg',action.value);
    }
    if(action.type===selectList){
        return state.set('selectList',action.value);
    }
    if(action.type===yetSelect){
        return state.set('yetSelect',action.value);
    }
    if(action.type===optOn){
        return state.set('optOn',action.value);
    }
    if(action.type===websocketobj){
        return state.set('websocketobj',action.value);
    }
    return state
}