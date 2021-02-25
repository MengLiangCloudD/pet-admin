// PureComponent必须有immutable否则Component PureComponent提高性能 减少虚拟dom比对
import React,{PureComponent,Fragment} from 'react';
// import * as actionCreators from './store/actionCreators';
import {connect} from 'react-redux';
import { HeaderWrapper,LoginContent } from './style';
// import { HashRouter as Router, Link, Route } from 'react-router-dom';
import Hearder from './../../common/hearder/hearder';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router';
import http from '@/untils/http';
import * as imager from './assager';
import { Spin } from 'antd';
class Login extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            info:false,
            Loading:false
        }
    }
     componentWillMount(){
        this.chongxin()
    }
    async chongxin(){
        var url="backstage/backStageLogin";
        var data = {
            sessionId:123
        }
        this.setState({Loading:true})
        var res  = await http.post(url,data);
        this.setState({Loading:false})
        if(res.errcode===0){
            this.props.history.push('/Admin/shoop/shoopList');
        }else{
            this.setState({info:true})
        }
    }
    render() {
        return (
            <Fragment>
                
                <HeaderWrapper>
                <Spin tip="正在登陆..." spinning={this.state.Loading}>
                    <Hearder></Hearder>
                    
                    <LoginContent className={this.state.info===false?'xianshi':''}>
                        <img src={imager.dengl} alt="" className="dengl"/><br/>
                        <div className="button" onClick={this.chongxin.bind(this)}>
                            重新加载
                        </div>
                            
                    </LoginContent>
                    </Spin>
                </HeaderWrapper>
                
            </Fragment>
        )
    }
}
// 固定写法接收一个state就是store里的数据 接收数据
const mapStateTopProps=(state)=>{
    return {

    }
  }
const mapDispatchToProps=(dispatch)=>{
    
    return {

        
    }
      
  }
  export default withRouter(connect(mapStateTopProps,mapDispatchToProps)(Login))