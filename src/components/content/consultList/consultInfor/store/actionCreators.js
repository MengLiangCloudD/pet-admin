import {recordList,OrderList,ordeId,OrderCode,Message,heardImg,selectList,yetSelect,optOn,websocketobj} from './actionType';
import { fromJS } from 'immutable';
export const getRecordList=(value)=>({
    type:recordList,
    value:fromJS(value)
})
export const getOrderList=(value)=>({
    type:OrderList,
    value:fromJS(value)
})
export const getselectList=(value)=>({
    type:selectList,
    value:fromJS(value)
})

export const getOrdeId=(value)=>({
    type:ordeId,
    value
})
export const getOrderCode=(value)=>({
    type:OrderCode,
    value
})
//通知提醒
export const getMessage=(value)=>({
    type:Message,
    value
})
export const getHeardImg=(value)=>({
    type:heardImg,
    value
})
export const getYetSelect=(value)=>({
    type:yetSelect,
    value:fromJS(value)
})
export const getoptOn=(value)=>({
    type:optOn,
    value:fromJS(value)
})
export const getwebsocketobj=(value)=>({
    type:websocketobj,
    value:fromJS(value)
})

