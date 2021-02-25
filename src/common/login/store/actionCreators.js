import {userNameType,passwordType } from './actionType';
// import axios from  'axios';
export const getuserNameVlue=(value)=>({
    type:userNameType,
    value
})
export const getpasswordVlue=(value)=>({
    type:passwordType,
    value
})