import React,{PureComponent,Fragment} from 'react';
import {connect} from 'react-redux';
import {  Avatar,Menu, Dropdown } from 'antd';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router';
import {
    // MenuFoldOutlined,
    UserOutlined 
  } from '@ant-design/icons';
  import * as imager from './assager';
// import http from '@/untils/http';
import { HeaderWrapper,Headline,HeaderImg } from './style';
import * as actionCreators from './store/actionCreators';
class Hearder extends PureComponent{
    render(){
        return (
            <Fragment>
                <HeaderWrapper>
                    <Headline>
                        <img src={imager.icno} alt="" height="40" className="icno"/>
                    </Headline> 
                    {/* <div onClick={this.props.toggleCollapsed.bind(this)} className="caidanlan">
                        {React.createElement(MenuFoldOutlined)}
                    </div> */}
                    <HeaderImg>
                        <Dropdown overlay={
                        <Menu>
                            <Menu.Item onClick={this.props.overAdmin.bind(this)}>
                                退出登录
                            </Menu.Item>
                        </Menu>}
                        >
                            <Avatar size={44} icon={<UserOutlined />} />
                        </Dropdown>
                    </HeaderImg>
                </HeaderWrapper>
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        collapsed:state.getIn(['leftMenu','collapsed'])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        overAdmin(){
            this.props.history.push('/login')
        },
        toggleCollapsed(){
            var action = actionCreators.collapsedTrue(!this.props.collapsed);
            dispatch(action)
        }
    }
}
export default withRouter( connect(mapStateTopProps,mapDispatchToProps)(Hearder))