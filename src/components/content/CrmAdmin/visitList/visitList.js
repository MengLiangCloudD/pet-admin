import React,{PureComponent,Fragment} from 'react';
import {connect} from 'react-redux';
import { Button,Table,Space,Pagination,Spin } from 'antd';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router';
import "./../visitList/visitList.scss"
import http from '../../../../untils/http';
import  * as actionCreators from './store/actionCreators';
import  * as addActionCreators from '../addVisit/store/actionCreators';
class VisitList extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            selectCode:0,
            Loading:false,
            //表头
            columns:[
                {
                    title: '订单号',
                    dataIndex: 'order_id',
                    key: 'order_id'
                },
                {
                    title: '主人姓名',
                    dataIndex: 'user_name',
                    key: 'user_name'
                },
                {
                    title: '主人联系方式',
                    dataIndex: 'phone',
                    key: 'phone'
                },
                {
                    title: '就诊时间',
                    dataIndex: 'created_at',
                    key: 'created_at'
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => (
                        <div>
                            {
                                <Space  size="middle">
                                    <Button  type="primary" onClick={this.props.goAddVost.bind(this,record)}>随访</Button>
                                </Space >
                            }
                        </div>
                        
                    ),
                }
            ],
            //表头
            columns1:[
                {
                    title: '订单号',
                    dataIndex: 'order_id',
                    key: 'order_id'
                },
                {
                    title: '主人姓名',
                    dataIndex: 'user_name',
                    key: 'user_name'
                },
                {
                    title: '主人联系方式',
                    dataIndex: 'phone',
                    key: 'phone'
                },
                {
                    title: '就诊时间',
                    dataIndex: 'created_at',
                    key: 'created_at'
                },
                {
                    title: '随访内容',
                    key: 'foll_text',
                    render: (text, record) => (
                        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' ,width:'300px'}}>
                          {record.foll_text}
                        </div>
                    ),
                },
                {
                    title: '综合星级',
                    key: 'action',
                    render: (text, record) => (
                        <div>
                            {
                                record.foll_star===1
                                ?<Space  size="middle">
                                   <img src='https://p-wosj.oss-ap-south-1.aliyuncs.com/xing1.png' className="xing" alt=""/>
                                </Space >
                                :record.foll_star===2
                                ?<Space  size="middle">
                                   <img src='https://p-wosj.oss-ap-south-1.aliyuncs.com/xing1.png' className="xing" alt=""/>
                                   <img src='https://p-wosj.oss-ap-south-1.aliyuncs.com/xing1.png' className="xing" alt=""/>
                                </Space >
                                :record.foll_star===3
                                ?<Space  size="middle">
                                   <img src='https://p-wosj.oss-ap-south-1.aliyuncs.com/xing1.png' className="xing" alt=""/>
                                   <img src='https://p-wosj.oss-ap-south-1.aliyuncs.com/xing1.png' className="xing" alt=""/>
                                   <img src='https://p-wosj.oss-ap-south-1.aliyuncs.com/xing1.png' className="xing" alt=""/>
                                </Space >
                                :record.foll_star===4
                                 ?<Space  size="middle">
                                   <img src='https://p-wosj.oss-ap-south-1.aliyuncs.com/xing1.png' className="xing" alt=""/>
                                   <img src='https://p-wosj.oss-ap-south-1.aliyuncs.com/xing1.png' className="xing" alt=""/>
                                   <img src='https://p-wosj.oss-ap-south-1.aliyuncs.com/xing1.png' className="xing" alt=""/>
                                   <img src='https://p-wosj.oss-ap-south-1.aliyuncs.com/xing1.png' className="xing" alt=""/>
                                </Space >
                                :<Space  size="middle">
                                   <img src='https://p-wosj.oss-ap-south-1.aliyuncs.com/xing1.png' className="xing" alt=""/>
                                   <img src='https://p-wosj.oss-ap-south-1.aliyuncs.com/xing1.png' className="xing" alt=""/>
                                   <img src='https://p-wosj.oss-ap-south-1.aliyuncs.com/xing1.png' className="xing" alt=""/>
                                   <img src='https://p-wosj.oss-ap-south-1.aliyuncs.com/xing1.png' className="xing" alt=""/>
                                   <img src='https://p-wosj.oss-ap-south-1.aliyuncs.com/xing1.png' className="xing" alt=""/>
                                </Space >
                                
                            }
                        </div>
                        
                    ),
                },
                {textWrap:'word-break'}
            ],
            limit:10,
            offset:1,
            total:0,
        }
    }
    //导航
    handleClick(type){
        this.setState(()=>({
            offset:1,
            selectCode:type
        }),()=>{
            this.props.getVisitList(this);
        })
    }
    componentDidMount(){
        this.props.getVisitList(this);
    }
    //翻页
    updateSize(e){
        this.setState(()=>({
          offset:e
        }),()=>{
            this.props.getVisitList(this);
        })
    }
    render(){
        var visitList = this.props.visitList.toJS();
        return (
            <Fragment>
                <Spin tip="Loading..." spinning={this.state.Loading}>
                    <div className="wrapper">
                        <div className="title">
                            <div className={this.state.selectCode===0?"title_item title_item_selec":"title_item"} onClick={this.handleClick.bind(this,0)}>
                                <div className="title_item_text">未随访</div>
                                <div className="title_item_border"></div>
                            </div>
                            <div className={this.state.selectCode===1?"title_item title_item_selec":"title_item"} onClick={this.handleClick.bind(this,1)}>
                                <div className="title_item_text">已随访</div>
                                <div className="title_item_border"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="content">
                        {
                            this.state.selectCode===0
                            ?<Table columns={this.state.columns}  dataSource={visitList} className="table" pagination={ false } />
                            :<Table columns={this.state.columns1}  dataSource={visitList} className="table" width={"100px"} pagination={ false } />
                        }
                        <Pagination defaultCurrent={1}  total={this.state.total} showSizeChanger={false} current={this.state.offset} defaultPageSize={this.state.limit} onChange={this.updateSize.bind(this)}  className="Pagination"/>
                    </div>
                </Spin>
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        visitList:state.getIn(["visitList","visitList"])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        async getVisitList(that){
            var url = "followUp/queryFollowUpOrders";
            var limit = that.state.limit;
            var offset = that.state.offset;
            var type = that.state.selectCode;
            var data = {
                limit,offset,type
            }
            that.setState({
                Loading:true
            })
            var res = await http.post(url,data);
            that.setState({
                Loading:false
            })
            if(res.errcode===0){
                that.setState({total:res.data.total})
                var list = res.data.content;
                for(var i = 0;i < list.length;i++){
                    list[i].key=i;
                }
                var action = actionCreators.setVisitList(list);
                dispatch(action);
            }
        },
        goAddVost(item){
            var action = addActionCreators.setVisitOrderid(item.order_id);
            dispatch(action);
            this.props.history.push('/Admin/crm/addVisit');
        }
    }
}
export default withRouter(connect(mapStateTopProps,mapDispatchToProps)(VisitList))