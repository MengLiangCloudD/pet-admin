import { collapsed } from './../../hearder/store/actionType';
// immutable不可改变的数据fromJS
import { fromJS } from 'immutable';
import {
  PieChartOutlined,
  DesktopOutlined,
} from '@ant-design/icons';
//hearder数据
const defaState=fromJS({
    menuList:[
          {
            title: "CRM管理",
            key: 2,
            url: "crm",
            icino:DesktopOutlined,
            menuitem: [
              {
                title: "随访列表",
                key: 5,
                url: "/crm/visitList",
                menuitem: []
              },
            ]
          },
          {
            title: "住院信息管理",
            key: 2,
            url: "hosAdmin",
            icino:DesktopOutlined,
            menuitem: [
              {
                title: "住院信息查看",
                key: 5,
                url: "/hosAdmin/hosList",
                menuitem: []
              },
            ]
          },
          {
            title: "商品管理",
            key: 2,
            url: "shoop",
            icino:DesktopOutlined,
            menuitem: [
              {
                title: "商品列表",
                key: 5,
                url: "/shoop/ShoopList",
                menuitem: []
              },
              {
                title: "商品品牌",
                key: 7,
                url: "/shoop/category",
                menuitem: []
              }
            ]
          },
          {
            title: "订单管理",
            key: 3,
            url: "order",
            icino:PieChartOutlined,
            menuitem: [
              {
                title: "订单列表",
                key: 8,
                url: "/order/user",
                menuitem: []
              },
              {
                title: "订单详情",
                key: 9,
                url: "/order/doctorLogin",
                menuitem: []
              }
            ]
         },
         {
          title: "消息管理",
          key: 3,
          url: "newsPush",
          icino:PieChartOutlined,
          menuitem: [
            {
              title: "消息推送",
              key: 8,
              url: "/newsPush/newsList",
              menuitem: []
            },
            {
              title: "推送历史",
              key: 9,
              url: "/newsPush/newshistory",
              menuitem: []
            }
          ]
       },
       {
        title: "线上咨询",
        key: 3,
        url: "consult",
        icino:PieChartOutlined,
        menuitem: [
          {
            title: "在线咨询",
            key: 8,
            url: "/consult/onlineConsultant",
            menuitem: []
          }
        ]
     }
    ],
    //菜单栏是否展开
    collapsed:false
})
export default (state = defaState,action)=>{
    if(action.type===collapsed){
      return state.set('collapsed',action.value);
    }
    return state
}