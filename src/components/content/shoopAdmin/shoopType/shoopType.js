import React,{PureComponent,Fragment} from 'react';
import {connect} from 'react-redux';
import {  Worp } from './style';
import { Input,Button,Table,Space,Spin,Modal } from 'antd';
import http from './../../../../untils/http';
import  * as actionCreators from './store/actionCreators';
import { withRouter } from 'react-router';
import './shoopType.scss'
class ShoopType extends PureComponent{
    constructor(props){
        super(props);
        this.state={ 
             //当前页
            offset:1,
            //每页条数
            limit:10,
            //总条数
            total:0,
            //表头
            columns:[
                {
                  title: '品牌名称',
                  dataIndex: 'type_name',
                  key: 'type_name'
                },
                {
                  title: '操作',
                  key: 'action',
                  render: (text, record) => (
                    <Space  size="middle">
                      {
                        record.deleted===0?<Button  type="primary" className="xiaClose" onClick={this.props.UpDownType.bind(this,record)}>下架</Button>:<Button  type="primary"  onClick={this.props.UpDownType.bind(this,record)}>上架</Button>
                      }
                      <Button  type="primary" onClick={this.modelTrue.bind(this,record)}>编辑</Button>
                    </Space >
                  ),
                },
                
            ],
            inputValue:'',
            Loading:false,
            //弹出框得true false
            isModalVisible:false,
            //拿出修改数据
            typeMap:{},
            //修改内容
            updateValue:''
        }
    }
    //输入框内容
    setInputValue(e){
      this.setState({
        inputValue:e.target.value
      })
    }
    // 弹出输入框内容
    updateInputValue(e){
      this.setState({
        updateValue:e.target.value
      })
    }
    // 弹出
    modelTrue(item){
      this.setState({
        isModalVisible:true,
        typeMap:item,
        updateValue:item.type_name
      })
    }
    //取消
    handleCancel(){
      this.setState({
        isModalVisible:false
      })
    }
    componentDidMount(){
      this.props.selectTypeList(this)
    }
    render(){
        const typeListForm = this.props.typeListForm.toJS();
        return (
            <Fragment>
              <Spin tip="Loading..." spinning={this.state.Loading}>
                <Worp>
                    <div className="nav">
                        <label htmlFor="">添加品牌：</label>
                        <Input placeholder="请输入品牌名称" value={this.state.inputValue} className="inputValues" onChange={this.setInputValue.bind(this)}/>
                        <Button type="primary" className="button" onClick={this.props.addShoopType.bind(this)}>添加</Button>
                    </div>
                    <div className="content">
                      <Table columns={this.state.columns} dataSource={typeListForm}  className="table" pagination={ false } />
                    </div>  
                    <Modal
                      title="修改"
                      visible={this.state.isModalVisible}
                      onOk={this.props.handleOk.bind(this)}
                      onCancel={this.handleCancel.bind(this)}
                      cancelText="取消"
                      okText="确定"

                    >
                      <div className="insps">
                        <label htmlFor="">修改名称：</label>
                        <Input placeholder="修改名称品牌名称" className="inp" value={this.state.updateValue} onChange={this.updateInputValue.bind(this)}/>
                      </div>
                    </Modal>
                </Worp>
              </Spin>
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
      typeListForm:state.getIn(["shoopType","typeListForm"])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
      //添加品牌
      async addShoopType(){
        var typeListForm = this.props.typeListForm.toJS();
        var url = 'goodstype/addProductBrand';
        var type_name = this.state.inputValue;
        var data = {
          type_name
        }
        this.setState({Loading:true});
        var res = await http.post(url,data);
        this.setState({Loading:false});
        if(res.errcode===0){
          typeListForm.unshift(res.data)
          for(var i = 0;i<typeListForm.length;i++){
            typeListForm[i].key=i;
          }
          this.setState({
            inputValue:'',
          })
          var action = actionCreators.setTypeListForm(typeListForm);
          dispatch(action)
        }
      },
      // 查询品牌列表
      async selectTypeList(that){
        var url = 'goodstype/queryProductBrandList';
        var data = {

        }
        that.setState({Loading:true});
        var res = await http.post(url,data);
        that.setState({Loading:false});
        if(res.errcode===0){
          var list  = res.data;
          for(var i = 0;i<list.length;i++){
            list[i].key=i;
          }
          var action = actionCreators.setTypeListForm(list);
          dispatch(action)
        }
      },
      //上下架
      async UpDownType(item){
        var url = 'goodstype/updateUpOrDown';
        var typeListForm = this.props.typeListForm.toJS();
        var deleted;
        if(item.deleted===0){
          deleted=1
        }else if(item.deleted===1){
          deleted=0
        }
        var type_id = item.type_id
        var data = {
          deleted,
          type_id
        }
        this.setState({Loading:true});
        var res = await http.post(url,data);
        this.setState({Loading:false});
        if(res.errcode===0){
          for(var i = 0;i<typeListForm.length;i++){
            if(item.type_id === typeListForm[i].type_id){
              typeListForm[i].deleted=deleted;
            }
          }
          var action = actionCreators.setTypeListForm(typeListForm);
          dispatch(action)
        }
      },
      //修改名称
      async handleOk(){
        var url = 'goodstype/updateProductBrand';
        var item = this.state.typeMap;
        var type_name = this.state.updateValue;
        var type_id = item.type_id;
        var typeListForm = this.props.typeListForm.toJS();
        var data = {
          type_name,
          type_id
        }
        this.setState({Loading:true});
        var res = await http.post(url,data);
        this.setState({Loading:false});
        if(res.errcode===0){
          for(var i = 0;i<typeListForm.length;i++){
            if(item.type_id === typeListForm[i].type_id){
              typeListForm[i].type_name=type_name;
            }
            this.setState({
              updateValue:'',
              isModalVisible:false
            })
          }
          var action = actionCreators.setTypeListForm(typeListForm);
          dispatch(action)
        }
      }
    }
}
export default withRouter(connect(mapStateTopProps,mapDispatchToProps)(ShoopType))