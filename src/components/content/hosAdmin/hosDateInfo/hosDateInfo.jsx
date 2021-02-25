import React,{PureComponent,Fragment} from 'react';
import {connect} from 'react-redux';
import { Button,Spin } from 'antd';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router';
import "./hosDateInfo.scss"
import http from '../../../../untils/http';
// import * as imager from './../assager';
import  * as actionCreators from './store/actionCreators';
class HosDateInfo extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            Loading:false
        }
    }
    componentDidMount(){
        this.props.selectInforList(this)
    }
    render(){
        const hosInfoListMap = this.props.hosInfoListMap.toJS();
        
        const infoList = this.props.infoList.toJS();
        debugger
        return (
            <Fragment>
                <Spin tip="Loading..." spinning={this.state.Loading}>
                    <div className="hosDateInfo">
                        <div className="hosDateInfo_title">
                            <div className="title_tit">
                                <div className="tit_biao"></div>
                                <div className="tit_txt">宠物信息</div>
                            </div>
                            <div className="titinfotitin">
                                <div className="hosDateInfo_titleInfo">
                                    <div className="titleInfo_item">
                                        <span>一卡通卡号：</span>
                                        <span>{hosInfoListMap.card_no}</span>
                                    </div>
                                    <div className="titleInfo_item">
                                        <span>主人联系方式：</span>
                                        <span>123456789</span>
                                    </div>
                                    <div className="titleInfo_item">
                                        <span>宠&nbsp;物&nbsp;姓&nbsp;名：</span>
                                        <span>{hosInfoListMap.name}</span>
                                    </div>
                                    <div className="titleInfo_item">
                                        <span>住&nbsp;&nbsp;院&nbsp;&nbsp;时&nbsp;&nbsp;间：</span>
                                        <span>{hosInfoListMap.admission_date}</span>
                                    </div>
                                    <div className="titleInfo_item">
                                        <span>主&nbsp;人&nbsp;姓&nbsp;名：</span>
                                        <span>123456789</span>
                                    </div>
                                    <div className="titleInfo_item">
                                        <span>住&nbsp;&nbsp;院&nbsp;&nbsp;状&nbsp;&nbsp;态：</span>
                                        {
                                            hosInfoListMap.in_flag==="0"?<span>住院中</span>:<span>已出院</span>
                                        }
                                        
                                    </div>
                                </div>
                                <div className="title_right">
                                    <Button type="primary" onClick={this.props.goAddInfor.bind(this)}>添加住院信息</Button>
                                </div>
                            </div>
                        </div>
                        <div className="contentInfo">
                            <div className="title_tit">
                                <div className="tit_biao"></div>
                                <div className="tit_txt">住院信息</div>
                            </div>
                            <div className="content_list">
                                {
                                    infoList.map((item,index)=>{
                                        return (
                                            <div className="content_list_item" key={index}>
                                                <div className="list_item_title">{item.descripte_date}</div>
                                                <div className="content_list_txt">
                                                    {item.description}
                                                </div>
                                                <div className="img_list">
                                                    {
                                                       JSON.parse(item.picture).map((item1,index1)=>{
                                                            return (
                                                                <div className="img_item" key={index1}>
                                                                    <img src={item1} alt="" />
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                                
                                                </div>
                                            </div>
                                        )
                                    })
                                }    
                            </div>
                        </div>
                    </div>
                </Spin>
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        hosInfoListMap:state.getIn(["hosDateInfo","hosInfoListMap"]),
        infoList:state.getIn(["hosDateInfo","infoList"])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        //查询详情
        async selectInforList(that){
            var object  = that.props.hosInfoListMap.toJS();
            var url = "hospitalization/queryPetInfoForBackStage";
            var data = {
                ward_code:object.ward_code,
                visit_id:object.id            }
            that.setState({Loading:true})
            var res = await http.post(url,data);
            that.setState({Loading:false});
            if(res.errcode===0){
                var action = actionCreators.setHosInfoList(res.data);
                dispatch(action);
            }
        },
        //添加
        goAddInfor(){
            this.props.history.push('/Admin/hosAdmin/submitHosInfo');
        }
    }
}
export default withRouter(connect(mapStateTopProps,mapDispatchToProps)(HosDateInfo));