import React,{PureComponent,Fragment} from 'react';
import {connect} from 'react-redux';
import {  WorpShoopList,Content } from './style';
import { Button,Table,Space,Pagination,Spin } from 'antd';

import 'antd/dist/antd.css';
import { withRouter } from 'react-router';
import * as actionCreators from './store/actionCreators';
import * as actionCreatorsShoopAdd from './../addShoop/store/actionCreators';
import http from '@/untils/http';
class ShoopList extends PureComponent{
    constructor(props){
      super(props);
      this.state={
         //当前页
        offset:1,
         //每页条数
        limit:7,
         //总条数
        total:0,
        code:0,
        drugName:'',
        //表头
        columns:[
          {
            title: '商品名称',
            dataIndex: 'drugName',
            key: 'drugName'
          },
          {
            title: '商品规格',
            dataIndex: 'spec',
            key: 'spec'
          },
          {
            title: '商品状态',
            dataIndex: 'shoopState',
            key: 'shoopState'
          },
          {
            title: '商品库存',
            dataIndex: 'quantity',
            key: 'quantity'
          },
          {
            title: '操作',
            key: 'action',
            render: (text, record) => (
              <div>
                {
                  record.shoopState==='未录入'
                  ?<Space  size="middle">
                    <Button  type="primary"  onClick={this.props.actionShoop.bind(this,record.productId)}>编辑</Button>
                  </Space >
                  :record.shoopState==='已上架'
                  ?<Space  size="middle">
                    <Button  type="primary" className="xiaClose"  onClick={this.props.updownshelf.bind(this,record)}>下架</Button>
                    <Button  type="primary"  onClick={this.props.actionShoop.bind(this,record.productId)}>编辑</Button>
                  </Space >
                  :<Space  size="middle">
                    <Button  type="primary" onClick={this.props.updownshelf.bind(this,record)}>上架</Button>
                    <Button  type="primary"  onClick={this.props.actionShoop.bind(this,record.productId)}>编辑</Button>
                  </Space >
                }
              </div>
              
            ),
          },
          
        ],
        Loading:false
      }
    }
    componentWillMount(){
      this.props.getShoopList(this);
    }
    //切换导航
    handleClick(type){
      this.setState({
        code:type
      })
    }
    //翻页
    updateSize(e){
      this.setState(()=>({
        offset:e
      }),()=>{
          this.props.getShoopList(this);
      })
    }
    //搜索输入框
    inputValue(e){

    }
    render(){
      var shoopList = this.props.shoopList.toJS()
        return (
            <Fragment>
              <Spin tip="Loading..." spinning={this.state.Loading}>

              
                <WorpShoopList>
                  {/* <div className="nav">
                    <Title>
                      <div className= {this.state.code===0?"title_item title_item_selec":'title_item'} onClick={this.handleClick.bind(this,0)}>
                          <div className="title_text">全部订单</div>
                          <div className="title_border"></div>
                      </div>
                      <div className= {this.state.code===1?"title_item title_item_selec":'title_item'} onClick={this.handleClick.bind(this,1)}>
                          <div className="title_text">已付款</div>
                          <div className="title_border"></div>
                      </div>
                      <div className= {this.state.code===2?"title_item title_item_selec":'title_item'} onClick={this.handleClick.bind(this,2)}>
                          <div className="title_text">待发货</div>
                          <div className="title_border"></div>
                      </div>
                      <div className= {this.state.order_code===3?"title_item title_item_selec":'title_item'} onClick={this.handleClick.bind(this,3)}>
                          <div className="title_text">已发货</div>
                          <div className="title_border"></div>
                      </div>
                    </Title>
                  </div>
                  <Nav>
                    <label htmlFor="">商品搜索：</label>
                    <Input placeholder="请输入商品名称" value={this.state.drugName} className="inputValues" onChange={this.inputValue.bind(this)}/>
                    <Button type="primary" className="button">搜索</Button>
                  </Nav> */}
                  <Content>
                    <Table columns={this.state.columns}  dataSource={shoopList} className="table" pagination={ false } />
                    <Pagination defaultCurrent={1}  total={this.state.total} showSizeChanger={false} current={this.state.offset} defaultPageSize={this.state.limit} onChange={this.updateSize.bind(this)}  className="Pagination"/>
                  </Content>
                    
                </WorpShoopList>
              </Spin>
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
      //数据集合
      shoopList:state.getIn(['shoopList','shoopList'])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
      // 请求商品列表
      async getShoopList(that){
        var url = 'product/list';
        var limit = that.state.limit;
        var offset = that.state.offset;
        that.setState({Loading:true})
        
        var data = {
          offset,
          limit,
          drugName:'',
          proUpDown:'',
          proShow:''
        }
        var res = await http.post(url,data);
        that.setState({Loading:false})
        if(res.errcode===0){
          that.setState({total:res.data.total})
          var list = res.data.list;
          for(var i = 0 ;i<list.length;i++){
            list[i].key=i;
            if(list[i].proShow===1){
              if(list[i].proUpDown===false){
                list[i].shoopState='未上架'
              }else{
                list[i].shoopState='已上架'
              }
            }else{
              list[i].shoopState='未录入'
            }
          }
          var action = actionCreators.setList(list);
          dispatch(action);
        }
      },
      //操作数据
      actionShoop(productId){
        var action = actionCreatorsShoopAdd.setProductId(productId);
        dispatch(action);
        this.props.history.push('/Admin/shoop/AddShoop')
      },
      async updownshelf(item){
        var url = 'product/updateUpDown'
        this.setState({Loading:true})
        var data = {
          productId:item.productId
        }
        var res = await http.post(url,data);
        this.setState({Loading:false})
        if(res.errcode===0){
          var list = this.props.shoopList.toJS();
            for(var i = 0 ;i<list.length;i++){
              if(list[i].productId===item.productId){
                if(res.data===false){
                  list[i].shoopState='未上架';
                  list[i].proUpDown=false;
                }else if(res.data===true){
                  list[i].proUpDown=true
                  list[i].shoopState='已上架'
                }
              }
            }
          
          var action = actionCreators.setList(list);
            dispatch(action);
        }
      }
    }
}
export default withRouter(connect(mapStateTopProps,mapDispatchToProps)(ShoopList))