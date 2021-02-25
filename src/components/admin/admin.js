import React,{PureComponent,Fragment} from 'react';
import {connect} from 'react-redux';
// import { Layout } from 'antd';
import 'antd/dist/antd.css';
// import http from '@/untils/http';
import Hearder from './../../common/hearder/hearder';
import LeftMenu from './../../common/leftMenu/leftMenu';
import Contents from './../content/content';
import {HashRouter} from 'react-router-dom';
import { withRouter } from 'react-router';
import {ContentWorp} from './style';
import { Button, notification } from 'antd';
import * as actionCreators from './../content/consultList/consultInfor/store/actionCreators';

class Admin extends PureComponent{
    okClick(){
        this.props.closeMessage(this,0);
    }
    openNotification(){
        const btn = (
          <Button type="primary" size="small" onClick={this.okClick.bind(this)}>
            Confirm
          </Button>
        );
        notification.open({
          message: '通知提醒',
          description:
            '您有一条新的咨询订单，请及时处理',
          btn,
          duration:2.5,
        });
        this.props.closeMessage(this,1);
      }
    render(){
          if(this.props.MessageCode===1){
            this.openNotification();
          }else{
              
          }
        return (
            <Fragment>
                <ContentWorp>
                    <Hearder></Hearder>
                        <LeftMenu></LeftMenu>
                    <HashRouter>
                        <Contents></Contents>
                    </HashRouter>
                </ContentWorp>
                        
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        MessageCode:state.getIn(['consultInfor','MessageCode'])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        closeMessage(that,type){
            if(type===0){
                if(that.props.location.pathname==='/Admin/consult/onlineConsultant'){
                    var actions = actionCreators.getMessage(2);
                    dispatch(actions)
                }else{
                    that.props.history.push('/Admin/consult/onlineConsultant')
                    var action = actionCreators.getMessage(0);
                    dispatch(action)
                }
            }else{
                 var actiont= actionCreators.getMessage(0);
                 dispatch(actiont)
            }
            
            
        }
    }
}
export default withRouter(connect(mapStateTopProps,mapDispatchToProps)(Admin))