import React,{PureComponent,Fragment} from 'react';
import {connect} from 'react-redux';
import { Button,Table,Space,Spin,Select,message } from 'antd';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router';
import "./hoslist.scss"
import http from '../../../../untils/http';
import  * as actionCreators from './store/actionCreators';
import * as submitActionCreators from './../submitHosInfo/store/actionCreators';
import * as DateInfoActionCreators from './../hosDateInfo/store/actionCreators';
const { Option } = Select;
class Hoslist extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            Loading:false,
            //表头
            columns:[
                {
                    title: '一卡通卡号',
                    dataIndex: 'card_no',
                    key: 'card_no'
                },
                {
                    title: '宠物姓名',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '宠物品种',
                    dataIndex: 'charge_type',
                    key: 'charge_type'
                },
                {
                    title: '主人联系方式',
                    dataIndex: 'phone',
                    key: 'phone'
                },
                {
                    title: '住院时间',
                    dataIndex: 'admission_date',
                    key: 'admission_date'
                },
                {
                    title: '住院状态',
                    key: 'created_at',
                    render: (text, record) => (
                        <div>
                            {
                                <Space  size="middle">
                                    {
                                        record.in_flag==='0'?<div>住院中</div>:<div>已出院</div>
                                    }
                                </Space >
                            }
                        </div>
                        
                    ),
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => (
                        <div>
                            {
                                <Space  size="middle">
                                    <Button  type="primary"  onClick={this.props.goHosDateInfo.bind(this,record)}>查看</Button>
                                </Space >
                            }
                        </div>
                        
                    ),
                }
            ],
            ward_code:'',
            room_no:''
        }
    }
    
    componentDidMount(){
        this.props.selectAreaList(this);
    }
    render(){
        const HosList = this.props.HosList.toJS();
        const AreaList = this.props.AreaList.toJS();
        const ByAreaIdList = this.props.ByAreaIdList.toJS()
        return (
            <Fragment>
                <Spin tip="Loading..." spinning={this.state.Loading}>
                    <div className="hosList">
                        <div className="hosList_title">
                            <label htmlFor="">选择病区：</label>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="请选择您所在的病区"
                                onChange={this.props.RoomByAreaId.bind(this)}
                                className="inputclass"
                                value={this.state.ward_code}
                                // optionFilterProp="children"
                            >
                                {
                                    AreaList.map((item,index)=>{
                                        return (
                                            <Option value={item.id} key={index} >{item.dept_name}</Option>
                                        )
                                    })
                                }
                                
                            </Select>
                            <label htmlFor="">选择房间：</label>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="请选择您所在房间号"
                                className="inputclass"
                                onChange={this.props.setRoomNo.bind(this)}
                                value={this.state.room_no}
                                // optionFilterProp="children"
                            >
                                {
                                    ByAreaIdList.map((item,index)=>{
                                        return (
                                            <Option value={item.room_no} key={index}>{item.room_no}</Option>
                                        )
                                    })
                                }
                                
                            </Select>
                            <Button type="primary" onClick={this.props.selectHosList.bind(this)}>搜索</Button>
                        </div>
                        <div className="content">
                            <Table columns={this.state.columns}  className="table" dataSource={HosList} pagination={ false } />
                        </div>
                    </div>
                </Spin>
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        HosList:state.getIn(["hosAdmin","Hoslist"]),
        AreaList:state.getIn(["hosAdmin","AreaList"]),
        ByAreaIdList:state.getIn(["hosAdmin","ByAreaIdList"]),
        
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        setRoomNo(id){
            this.setState({
                room_no:id
            })
        },
        //查询住院宠物列表
        async selectHosList(){
            var url = "hospitalization/queryPetListForBackStage";
            if(this.state.room_no===''||this.state.ward_code===''){
                message.warning('请先选择病区号和房间号');
                return
            }
            var data = {
                ward_code:this.state.ward_code,
                room_no:this.state.room_no
            }
            this.setState({
                Loading:true
            })
            var res = await http.post(url,data);
            this.setState({
                Loading:false
            })
            if(res.errcode===0&&res.data!=null){
                var list = res.data;
                for(var i = 0;i<list.length;i++){
                    list[i].key=i;
                }
                var action = actionCreators.setHoslist(list);
                dispatch(action);
            }
        },
        //查询病区列表
        async selectAreaList(that){
            var url = "hospitalization/queryAreaList";
            var data = {
               
            }
            that.setState({
                Loading:true
            })
            var res = await http.post(url,data);
            that.setState({
                Loading:false
            })
            if(res.errcode===0&&res.data!=null){
                var list = res.data;
                var action = actionCreators.setAreaList(list);
                dispatch(action);
            }
        },
        //查询房间号
        async RoomByAreaId(id){
            var url = "hospitalization/queryRoomByAreaId";
            this.setState({
                ward_code:id,
                room_no:''
            })
            var data = {
                dept_id:id
            }
            this.setState({
                Loading:true
            })
            var res = await http.post(url,data);
            this.setState({
                Loading:false
            })
            if(res.errcode===0&&res.data!=null){
                var list = res.data;
                // for(var i = 0;i<list.length;i++){
                //     list[i].key=i;
                // }
                var action = actionCreators.setByAreaIdList(list);
                dispatch(action);
            }
        },
        //查看
        goHosDateInfo(item){
            this.props.history.push('/Admin/hosAdmin/hosDateInfo');
            var action = submitActionCreators.setHosInfoMap(item);
            dispatch(action);
            var acction = DateInfoActionCreators.setHosInfoListMap(item);
            dispatch(acction);
        }
    }
}
export default withRouter(connect(mapStateTopProps,mapDispatchToProps)(Hoslist));