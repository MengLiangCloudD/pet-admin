import React,{PureComponent,Fragment} from 'react';
import {connect} from 'react-redux';
import { Input,Select,Button } from 'antd';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router';
import { Wrapper } from './style';
import http from './../../../../untils/http';

const { Option } = Select;
const { TextArea } = Input;
class NewsList extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            newType:'',
            title:'',
            shoopCode:'',
            newInfo:''

        }
    }
    inputValue(type,e){
        if(type==='newInfo'){
            this.setState({
                newInfo:e.target.value
            })
        }else if(type==='newType'){
            this.setState({
                newType:e
            })
        }else if(type==='title'){
            this.setState({
                title:e.target.value
            })
        }else if(type==='shoopCode'){
            this.setState({
                shoopCode:e.target.value
            })
        }
    }
    //保存
    async addNews(){
        var url = 'message/addMessage'
        var type = this.state.newType;
        var title = this.state.title;
        var content = this.state.newInfo;
        var code = this.state.shoopCode;
        var data = {
            type,	
            title,
            content,	
            code,
        }
        var res = await http.post(url,data);
        if(res.errcode===0){
            debugger
        }    
    }
    render(){
        return (
            <Fragment>
                <Wrapper>
                    <div className="item_input">
                        <label htmlFor="">消息种类：</label>
                        <Select className="inputValues"  placeholder="请选择消息类型" onChange={this.inputValue.bind(this,'newType')} value={this.state.newType}>
                            <Option value={1} >系统消息</Option>
                            <Option value={2} >其他消息</Option>
                        </Select>
                    </div>
                    <div className="item_input">
                        <label htmlFor="">标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题：</label>
                        <Input placeholder="请输入标题"  className="inputValues" onChange={this.inputValue.bind(this,'title')} value={this.state.title}/>
                    </div>
                    <div className="item_input">
                        <label htmlFor="">商品编号：</label>
                        <Input placeholder="请输入商品编号（非必填，有新商品才用）"  className="inputValues" onChange={this.inputValue.bind(this,'shoopCode')} value={this.state.shoopCode}/>
                    </div>
                    <div className="item_input">
                        <label htmlFor="">发送内容：</label>
                        <TextArea rows={4}  placeholder="请输入推送内容（用于推送驱动相关的商品营销）" className="inputValues inputValues1" onChange={this.inputValue.bind(this,'newInfo')} value={this.state.newInfo}/>
                    </div>
                    <div className="bottom">
                        <Button type="primary" className="button close" >取消</Button>
                        <Button type="primary" className="button" onClick={this.addNews.bind(this)}>保存</Button>
                    </div>
                </Wrapper>
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        
    }
}
export default withRouter(connect(mapStateTopProps,mapDispatchToProps)(NewsList))