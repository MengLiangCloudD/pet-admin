import React,{PureComponent,Fragment} from 'react';
import {connect} from 'react-redux';
import { Button,Input,Upload,message,DatePicker,Spin } from 'antd';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router';
import "./submitHosInfo.scss"
import http from '../../../../untils/http';
import * as imager from './../assager';
import  * as actionCreators from './store/actionCreators';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/date-picker/locale/zh_CN';
const dateFormat = 'YYYY-MM-DD';
const { TextArea } = Input;
class SubmitHosInfo extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            textValue:'',
            dateTxt:'',
            datetime:'',
            Loading:false
        }
    }
    textChangeValue(e){
        this.setState({
            textValue:e.target.value
        })
    }
    
    //取消保存
    NosaveShoop(){
        this.props.history.push('/Admin/hosAdmin/hoslist');
    }
    chageDate(e){
        var d = new Date(e);
        var yy = d.getFullYear();
        var mm
        var dd
        if(d.getMonth() + 1<10){
            mm ="0" + (d.getMonth() + 1);
        }else{
            mm = d.getMonth() + 1;
        }
        if(d.getDate() + 1 < 10){
            dd ="0" + d.getDate();
        }else{
            dd = d.getDate();
        }
        var datetime = yy + "-" + mm + "-" + dd;
        this.setState({
            dateTxt:e,
            datetime:datetime
        })
    }
    render(){
        var that = this;
        const filesw = {
            name: "uploadFile",
            showUploadList: false,//设置只上传一张图片，根据实际情况修改
            customRequest:async info => {//手动上传
                const formData = new FormData();
                formData.append('uploadFile', info.file);//名字和后端接口名字对应
                var url = 'consult/uploadFile';
                var data = formData
                that.setState({Loading:true})
                var res = await http.postFile(url,data);
                that.setState({Loading:false})
                if(res.errcode===0){
                  that.props.uploadingImg(that,res.data.path);
                }
            }
          }
          const hosInfoImg = this.props.hosInfoImg.toJS();
        return (
            <Fragment>
                <Spin tip="Loading..." spinning={this.state.Loading}>
                    <div className="SubmitHosInfo">
                        <div className="item_input">
                            <label htmlFor="" className="lable_inp">选择日期：</label>
                            <DatePicker locale={locale} value={this.state.dateTxt} format={dateFormat} onChange={this.chageDate.bind(this)}/>
                        </div>
                        <div className="item_input">
                            <label htmlFor="" className="lable_inp">住院描述：</label>
                            <TextArea autoSize={{ minRows: 6, maxRows: 7}} className="inputValues" value={this.state.textValue} onChange={this.textChangeValue.bind(this)}/>
                        </div>
                        
                        <div className="item_input">
                            <label htmlFor="" className="lable_inp">上传图片：</label>
                            <div className="addImg">
                                <div className="info">
                                    <img src={imager.add} alt=""/>
                                    <p>上传图片</p>
                                </div>
                                <Upload className="file"  {...filesw} enctype="multipart/form-data">
                                    <Button className="btn">Upload</Button>
                                </Upload>
                            </div>
                            {
                                hosInfoImg.length>0?
                                hosInfoImg.map((item,index)=>{
                                    return (
                                        <div className="addImg" key={index}>
                                            <img src={item} alt="" className="item_img item_imgs"/>
                                            <img src={imager.cha} alt="" className="cha" onClick={this.props.delateImg.bind(this,index)}/>
                                        </div>
                                    )
                                }):<div className="addImg">
                                    <img src={imager.tupian} alt="" className="meitu"/>
                                </div>
                            }
                                    
                        </div>      
                        <div className="item_input item_input1">
                            <label htmlFor="" className="lable_inp1">住院描述：</label>
                            <span>为了避免图片压缩，建议您上传图片采用1 : 1比例上传</span>
                        </div>
                        <div className="bottom">
                            <Button type="primary" className="button close" onClick={this.NosaveShoop.bind(this)}>取消</Button>
                            <Button type="primary" className="button" onClick={this.props.addHosInfo.bind(this)}>保存</Button>
                        </div> 
                    </div>
                </Spin>    
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        // shoopInfoImg:state.getIn(["submitHosInfo","shoopInfoImg"])
        hosInfoImg:state.getIn(["submitHosInfo","hosInfoImg"]),
        hosInfoMap:state.getIn(["submitHosInfo","hosInfoMap"]),
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        //上传图片
        uploadingImg(that,path){
                var list = that.props.hosInfoImg.toJS();
                list.push(path);
                var hosInfoImgAction = actionCreators.setHosInfoImg(list);
                dispatch(hosInfoImgAction);
        },
        //删除图片
        delateImg(index){
            var list = this.props.hosInfoImg.toJS();
            list.splice(index,1);
            var hosInfoImgAction = actionCreators.setHosInfoImg(list);
            dispatch(hosInfoImgAction);
        },
        async addHosInfo(){
            const hosInfoImg = this.props.hosInfoImg.toJS();
            const hosInfoMap = this.props.hosInfoMap.toJS();
            var url = "hospitalization/commitPetInfoEveryDay";
            var visit_id =hosInfoMap.id;
            var card_id =hosInfoMap.card_id;
            var name = hosInfoMap.name;
            var admission_date = hosInfoMap.admission_date;
            var description = this.state.textValue;
            var picture = JSON.stringify(hosInfoImg);
            var date = this.state.datetime;
            if(date===''||description===''){
                message.warning('请将信息填写完整')
                return
            }
            var data ={
                visit_id,
                card_id,
                name,
                admission_date,
                description,
                picture,
                date
            }
            this.setState({Loading:true})
            var res = await http.post(url,data);
            this.setState({Loading:false});
            if(res.errcode===0){
                message.info('操作成功');
                var hosInfoImgAction = actionCreators.setHosInfoImg([]);
                dispatch(hosInfoImgAction);
                this.props.history.push('/Admin/hosAdmin/hosDateInfo');
            }
        }
    }
}
export default withRouter(connect(mapStateTopProps,mapDispatchToProps)(SubmitHosInfo));