import React,{PureComponent,Fragment} from 'react';
import {connect} from 'react-redux';
import { Spin,Input,Button,message } from 'antd';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router';
import './addVisit.scss'
import http from './../../../../untils/http';
import  * as actionCreators from './store/actionCreators';
const { TextArea } = Input;
class AddVisit extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            Loading:false,
            starNumber:5,
            textValue:''
        }
    }
    textChangeValue(e){
        this.setState({
            textValue:e.target.value
        })
    }
    async submit(){
        var url = 'followUp/commitFollowUp';
        var foll_star = this.state.starNumber;
        
        var foll_text = this.state.textValue;
        if(foll_text===''){
            message.info('请填写文本');
            return
        }
        var order_id = this.props.order_id;
        var data = {
            foll_star,
            foll_text,
            order_id
        }
        this.setState({
            Loading:true
        })
        var res = await http.post(url,data);
        this.setState({
            Loading:false
        })
        if(res.errcode===0){
            message.info('提交成功');
            this.props.history.push('/Admin/crm/visitList');
        }else{
            message.warning(res.errmsg);
        }
    }
    render(){
        const xingNoList = this.props.xingNoList.toJS()
        return (
            <Fragment>
                <Spin tip="Loading..." spinning={this.state.Loading}>
                    <div className="addVisit_wrapper">
                        <div className="content">
                            <div className="content_title">
                                <div className="content_title_biao"></div>
                                <div className="content_title_txt">随访结果</div>
                            </div>
                            <div className="content_nav">
                                <div className="star_txt">随访人员主观综合星级：</div>
                                <div className="star_img">
                                    {
                                        xingNoList.map((item,index)=>{
                                            return (
                                                <img src={'https://p-owner.oss-cn-beijing.aliyuncs.com/'+ item+'.png'} key={index} onClick={this.props.updateStar.bind(this,index,item)} alt=""/>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="content_text">
                                <div className="visit_biao">随访内容：</div>
                                <div className="txtexe">
                                    <TextArea autoSize={{ minRows: 6, maxRows: 7}} value={this.state.textValue} onChange={this.textChangeValue.bind(this)}/>
                                </div>
                            </div>
                        </div>
                        <div className="bottom">
                            <Button type="primary" size="large" onClick={this.submit.bind(this)}>提交</Button>
                        </div>
                    </div>
                </Spin>
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        xingNoList:state.getIn(["addVisit","xingNoList"]),
        order_id:state.getIn(["addVisit","visit_orderid"]),
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        updateStar(index,item){
            var list = this.props.xingNoList.toJS();
            for(var i = 0;i<list.length;i++){
                if(item==="xing0"){
                    if(index >= i ){
                        list.splice(i,1,"xing1")
                    }
                }else{
                    if(index < i ){
                        list.splice(i,1,"xing0")
                    }
                }
            }
            var action = actionCreators.setXingNoList(list);
            dispatch(action);
            this.setState({
                starNumber:index+1
            })
        }
    }
}
export default withRouter(connect(mapStateTopProps,mapDispatchToProps)(AddVisit));