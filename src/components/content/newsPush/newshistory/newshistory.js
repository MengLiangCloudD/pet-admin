import React,{PureComponent,Fragment} from 'react';
import {connect} from 'react-redux';
import { Pagination } from 'antd';
// import '../../CrmAdmin/visitList/node_modules/antd/dist/antd.css';
import { withRouter } from 'react-router';
import { Wrapper } from './style';
import http from './../../../../untils/http';
import * as imager from './../assager';
import * as actionCreators from './store/actionCreators';
class Newshistory extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            //当前页
            offset:1,
            //每页条数
            limit:7,
            //总条数
            total:0
        }
    }
    componentWillMount(){
        this.props.setNewList(this);
      }
    updateSize(e){
        this.setState(()=>({
            offset:e
          }),()=>{
              this.props.setNewList(this);
          })
    }
    render(){
        const  newList = this.props.newList.toJS();
        return (
            <Fragment>
                <Wrapper>
                    {
                        newList.map((item,index)=>{
                            return (
                                <div className="content" key={index}>
                                    {
                                        item.type===1
                                        ?<div className="title">
                                            <img src={imager.xitong} alt="" className="type_img"/>
                                            <span className="type">系统消息</span>
                                        </div>
                                        :<div className="title">
                                            <img src={imager.xitong} alt="" className="type_img"/>
                                            <span className="type">其他消息</span>
                                        </div>
                                    }
                                    
                                    <div className="newInfo">
                                        <p>
                                            {item.title}
                                        </p>
                                        <p>
                                            {item.content}
                                        </p>
                                    </div>
                                    <div className="timer">
                                        {item.created_at}
                                    </div>
                                </div>
                            )
                        })
                    }
                        
                     <Pagination defaultCurrent={1}  total={this.state.total} showSizeChanger={false} current={this.state.offset} defaultPageSize={this.state.limit} onChange={this.updateSize.bind(this)}  className="Pagination"/>
                </Wrapper>
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        newList:state.getIn(['newshistory','newList'])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        async setNewList(that){
            var url = 'message/queryMessage';
            var limit = that.state.limit;
            var offset = that.state.offset;
            var data = {
                limit,
                offset
            }
            var res = await http.post(url,data);
            if(res.errcode===0){
                that.setState({total:res.data.total})
                var list = res.data.content;
                var action = actionCreators.getNewList(list);
                dispatch(action);
            }  
        }
    }
}
export default withRouter(connect(mapStateTopProps,mapDispatchToProps)(Newshistory))