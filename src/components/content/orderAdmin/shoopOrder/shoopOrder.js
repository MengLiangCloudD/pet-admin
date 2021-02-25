import React,{PureComponent,Fragment} from 'react';
import {connect} from 'react-redux';
import { OrderWrapper,Title,Nav,Content,ContentOrderInfo } from './style';
import {  Input,DatePicker,Space,Button,Pagination,Modal,Spin   } from 'antd';
// import '../../CrmAdmin/visitList/node_modules/antd/dist/antd.css';
import { withRouter } from 'react-router';
import * as imager from './../assager';
import http from './../../../../untils/http';
import * as actionCreators from './store/actionCreators';
import 'moment/locale/zh-cn';
const { RangePicker } = DatePicker;
class ShoopOrder extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            //当前页
            offset:1,
            //每页条数
            limit:10,
            //总条数
            total:0,
            //开始时间
            created_at_start:'',
            //结束时间
            created_at_end:'',
            //用户昵称
            nickname:'',
            //订单状态
            order_code:0,
            //订单编号
            order_id:'',
            //商品名称
            drug_name:'',
            keyValue:'',
            //显示状态
            listCode:0,
            //弹框状态
            visible:false,
            visible1:false,
            visible2:false,
            //物流公司
            firmName:'',
            //物流编号
            firmNumber:'',
            //发货时间
            firmTime:'',
            //订单详情的订单编号
            orderId:'',
            //拒绝原因
            cause:'',
            // 管理密码
            password:'',
            //通过还是拒绝
            audit_type:'',
            Loading:false
        };
    }
    
    componentWillMount(){
        this.props.getShoopList(this)
    }
    //切换订单状态
    handleClick(type) {
        var created_at_start='';
        var created_at_end='';
        var nickname='';
        var drug_name='';
        var order_id='';
        var keyValue = new Date();
        this.setState(()=>({
            created_at_start: created_at_start,
            created_at_end:created_at_end ,
            nickname:nickname,
            drug_name:drug_name,
            order_id:order_id,
            keyValue:keyValue,
            order_code: type,
            listCode:0,
        }),()=>{
            this.props.getShoopList(this);
        })
        
    };
    //商品名称
    shoopValue(e){
        var drug_name = e.target.value;
        this.setState({ drug_name: drug_name });
    }
    //订单编号
    OrderValue(e){
        var order_id = e.target.value;
        this.setState({ order_id: order_id });
    }
    //卖家名称
    nicknameValue(e){
        var nickname = e.target.value;
        this.setState({ nickname: nickname });
    }
    //下单时间
    createdAtValue(e){
        var created_at_start = this.updateTime(e[0]._d);
        var created_at_end = this.updateTime(e[1]._d);
        this.setState({ created_at_start: created_at_start,created_at_end:created_at_end });
    }
    //转换标准时间
    updateTime(data){
        var d = new Date(data);
        var y = d.getFullYear();
        var m;
        var day
        if(d.getMonth()+1<10){
            m = '0' + (d.getMonth()+1);
        }else{
            m =  d.getMonth()+1
        }
        if(d.getDate()<10){
            day= "0" +d.getDate();
        }else{
            day =d.getDate();
        }
        return y + "-" + m + "-" + day;
    }
    //点击查询
    selectClick(){
        this.props.getShoopList(this)
    }
    //点击重置
    updateClick(){
        var created_at_start='';
        var created_at_end='';
        var nickname='';
        var drug_name='';
        var order_id='';
        var keyValue = new Date()
        this.setState({ 
            created_at_start: created_at_start,
            created_at_end:created_at_end ,
            nickname:nickname,
            drug_name:drug_name,
            order_id:order_id,
            keyValue:keyValue
        });
    }
    //物流公司e
    setfirmName(e){
        var firmName = e.target.value;
        this.setState({ firmName: firmName });
    }
    //物流编号
    setfirmNumber(e){
        var firmNumber = e.target.value;
        this.setState({ firmNumber: firmNumber });
    }
    //物流发货时间
    setfirmTime(e){
        var firmTime = e.target.value;
        this.setState({ firmTime: firmTime });
    }
    // 退款原因
    setcause(e){
        var cause = e.target.value;
        this.setState({ cause: cause });
    }
    //管理密码
    setpassword(e){
        var password = e.target.value;
        this.setState({ password: password });
    }
    // 点击弹出退款
    clickRefund(type){
        this.setState({visible1:true,audit_type:type})
    }
    
    //点击取消
    handleCancel(){
        this.setState({
            visible:false,
            //物流公司
            firmName:'',
            //物流编号
            firmNumber:'',
            //发货时间
            firmTime:'',
        })
    }
    //点击录入信息
    clickInfo(){
        this.setState({visible:true})
    }
    //点击审核订单
    clickOrder(type){
        this.setState({visible2:true,audit_type:type})
    }
    //取消
    orderAuditCancel(){
        this.setState({
            visible2:false,
            cause:'',
            // 管理密码
            password:'',
            //通过还是拒绝
            audit_type:''
        })
    }
    
    //分页
    updateSize(e){
        this.setState(()=>({
            offset:e
        }),()=>{
            this.props.getShoopList(this);
        })
    }
    //查看详情
    getInfo(item){
        this.setState(()=>({
            orderId:item.order_id,
            listCode:1
        }),()=>{
            this.props.getOrderInfo(this)
        })
    }
    
    //取消退款
    visible1Cancel(){
        this.setState({
            visible1:false,//拒绝原因
            cause:'',
            // 管理密码
            password:'',
            //通过还是拒绝
            audit_type:''
        })
    }
    //返回
    goback(){
        this.setState({listCode:0})
    }
    render(){
        var shoopOrderList = this.props.shoopOrderList.toJS();
        var shoopOrderInfo = this.props.shoopOrderInfo.toJS();
        return (
            <Fragment>
                <OrderWrapper>
                    <Spin tip="Loading..." spinning={this.state.Loading}> 
                        <Title>
                            <div className= {this.state.order_code===0?"title_item title_item_selec":'title_item'} onClick={this.handleClick.bind(this,0)}>
                                <div className="title_text">全部订单</div>
                                <div className="title_border"></div>
                            </div>
                            <div className= {this.state.order_code===20?"title_item title_item_selec":'title_item'} onClick={this.handleClick.bind(this,20)}>
                                <div className="title_text">已付款</div>
                                <div className="title_border"></div>
                            </div>
                            <div className= {this.state.order_code===30?"title_item title_item_selec":'title_item'} onClick={this.handleClick.bind(this,30)}>
                                <div className="title_text">待发货</div>
                                <div className="title_border"></div>
                            </div>
                            <div className= {this.state.order_code===40?"title_item title_item_selec":'title_item'} onClick={this.handleClick.bind(this,40)}>
                                <div className="title_text">已发货</div>
                                <div className="title_border"></div>
                            </div>
                            <div className= {this.state.order_code===8?"title_item title_item_selec":'title_item'} onClick={this.handleClick.bind(this,8)}>
                                <div className="title_text">退款中</div>
                                <div className="title_border"></div>
                            </div>
                            <div className= {this.state.order_code===50?"title_item title_item_selec":'title_item'} onClick={this.handleClick.bind(this,50)}>
                                <div className="title_text">交易成功</div>
                                <div className="title_border"></div>
                            </div>
                            <div className= {this.state.order_code===7?"title_item title_item_selec":'title_item'} onClick={this.handleClick.bind(this,7)}>
                                <div className="title_text">交易关闭</div>
                                <div className="title_border"></div>
                            </div>
                        </Title>
                        {
                            this.state.listCode===0
                            ?<div className="order_list" >
                                <Nav>
                                    <div className="inputValue">
                                        <label className="" htmlFor="">商品名称：</label>
                                        <Input placeholder="请输入商品名称" className="inputer" value={this.state.drug_name} onChange={this.shoopValue.bind(this)}/>
                                        <label className="label" htmlFor="">订单编号：</label>
                                        <Input placeholder="请输入订单编号" className="inputer" value={this.state.order_id} onChange={this.OrderValue.bind(this)}/>
                                        <br/>
                                        <label className="" htmlFor="">买家昵称：</label>
                                        <Input placeholder="请输入买家昵称" className="inputer" value={this.state.nickname} onChange={this.nicknameValue.bind(this)}/>
                                        <label className="label" htmlFor="">下单时间：</label>
                                        <Space direction="vertical" size={12}  className="inputer" >
                                            <RangePicker placeholder={['开始时间','结束时间']} className="inputer_time" onChange={this.createdAtValue.bind(this)} key = {this.state.keyValue} allowClear={false}/>
                                        </Space>
                                    </div>
                                    <div className="buttonValue">
                                        <Button type="primary" className="btn chong" onClick={this.updateClick.bind(this)}>重置</Button>
                                        <Button type="primary" className="btn" onClick={this.selectClick.bind(this)}>查询</Button>
                                    </div>
                                </Nav>
                                <Content>
                                    <div className="content_title">
                                        <div className="content_title_item">
                                            商品名称
                                        </div>
                                        <div className="content_title_item">
                                            商品数量
                                        </div>
                                        <div className="content_title_item">
                                            买家信息
                                        </div>
                                        <div className="content_title_item">
                                            订单状态
                                        </div>

                                        <div className="content_title_item">
                                            订单金额
                                        </div>
                                    </div>
                                    <div className="item_table">
                                        {
                                            shoopOrderList.map((item,index)=>{
                                                return (
                                                    <div className="content_item" key={index}>
                                                        <div className="content_item_title">
                                                            <div className="content_item_title_item">
                                                                订单编号：{item.order_id}
                                                            </div>
                                                            <div className="content_item_title_item">
                                                                
                                                            </div>
                                                            <div className="content_item_title_item">
                                                                下单时间：{item.created_at}
                                                            </div>
                                                            <div className="content_item_title_item">
                                                                
                                                            </div>
                                                            <div className="content_item_title_item" onClick={this.getInfo.bind(this,item)}>
                                                                <span className="img_text">查看详情</span> 
                                                                <img src={imager.qianwang} alt="" width="10" className="imagers"/>
                                                            </div>
                                                        </div>
                                                        <div className="item_content">
                                                            <div className="item_content_element">
                                                                {
                                                                    item.subOrderList.map((item1,index1)=>{
                                                                        return (
                                                                            <div className="item_content_element_item" key={index1}>
                                                                                <img className="shoopimg" src={item1.pro_main_photo} alt="" width="20"/>
                                                                                <span className="shoopimg">{item1.drug_name}</span> 
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                                
                                                            </div>
                                                            <div className="item_content_element">
                                                                {
                                                                    item.subOrderList.map((item1,index1)=>{
                                                                        return (
                                                                            <div className="item_content_element_item" key={index1}>
                                                                                {item1.goods_counts}
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                                
                                                            </div>
                                                            <div className="item_content_element">
                                                                <p>{item.recipient}</p>
                                                                <p>{item.mobile}</p>
                                                                <p>{item.full_name}</p>
                                                            </div>
                                                            {
                                                                item.order_code===20
                                                                ?<div className="item_content_element">
                                                                    <p className="zhaungtai">买家已付款</p>
                                                                    <p>待审核</p>
                                                                </div>
                                                                :item.order_code===40
                                                                ?<div className="item_content_element">
                                                                    <p className="zhaungtai">买家已付款</p>
                                                                    <p>已发货</p>
                                                                </div>
                                                                :item.order_code===30
                                                                ?<div className="item_content_element">
                                                                    <p className="zhaungtai">买家已付款</p>
                                                                    <p>待发货</p>
                                                                </div>
                                                                :item.order_code===50
                                                                ?<div className="item_content_element">
                                                                    <p>已完成</p>
                                                                </div>
                                                                :item.order_code===8
                                                                ?<div className="item_content_element">
                                                                    <p className="zhaungtais">申请退款中</p>
                                                                </div>
                                                                :<div className="item_content_element">
                                                                    <p>已取消</p>
                                                                </div>
                                                            }
                                                            <div className="item_content_element">
                                                                <p>（含配送费 ￥{item.pro_freight_sum}）</p>
                                                                <p>￥{item.payment}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                                    
                                    </div>
                                    <div className="item_bottom">
                                        <Pagination defaultCurrent={1} total={this.state.total} showSizeChanger={false} current={this.state.offset} defaultPageSize={this.state.limit} onChange={this.updateSize.bind(this)}/>
                                    </div>     
                                </Content>
                            </div>
                            :<div className="order_info" >
                                <ContentOrderInfo>
                                    <div className="fanhui" onClick={this.goback.bind(this)}>返回</div>
                                    <div className="info_item">
                                        <div className="info_title">
                                            <div className="gang"></div>
                                            <div className="info_title_text">订单状态</div>
                                        </div>
                                        <div className="content_info">
                                            <p><span className="biaoti">下单时间：</span><span>{shoopOrderInfo.created_at}</span></p>
                                            <p><span className="biaoti">付款时间：</span><span>{shoopOrderInfo.pay_time}</span></p>
                                            {
                                                shoopOrderInfo.order_code===20
                                                ?<p><span className="biaoti">订单状态：</span><span>买家已付款，等审核发货</span> </p>
                                                :shoopOrderInfo.order_code===7
                                                ?<p><span className="biaoti">订单状态：</span><span>买家已取消订单</span> </p>
                                                :shoopOrderInfo.order_code===8
                                                ?<p><span className="biaoti">订单状态：</span><span>用户申请退款</span> </p>
                                                :shoopOrderInfo.order_code===30
                                                ?<p><span className="biaoti">订单状态：</span><span>审核通过等待发货</span> </p>
                                                :shoopOrderInfo.order_code===40
                                                ?<p><span className="biaoti">订单状态：</span><span>已发货</span> </p>
                                                :<p><span className="biaoti">订单状态：</span><span>订单已完成</span> </p>
                                            }
                                            
                                        </div>
                                        {
                                            shoopOrderInfo.order_code===8
                                            ?<div className="bottom_info">
                                                <Button type="primary" className="btn chong" onClick={this.clickRefund.bind(this,2)}>拒绝退款</Button>
                                                <Button type="primary" className="btn" onClick={this.clickRefund.bind(this,1)}>同意退款</Button>
                                            </div>
                                            :shoopOrderInfo.order_code===20
                                            ?<div className="bottom_info">
                                                <Button type="primary" className="btn chong" onClick={this.clickOrder.bind(this,2)}>不予通过</Button>
                                                <Button type="primary" className="btn" onClick={this.clickOrder.bind(this,1)}>通过审核</Button>
                                            </div>
                                            :''
                                        }
                                        <Modal
                                            title="退款审核"
                                            visible={this.state.visible1}
                                            onOk={this.props.refundAudit.bind(this)}
                                            onCancel={this.visible1Cancel.bind(this)}
                                            cancelText="取消"
                                            okText="确定"
                                            >
                                                {
                                                    this.state.audit_type===1
                                                    ?<div>
                                                        <label className="label" htmlFor="">管理密码：</label>
                                                        <Input placeholder="请输入管理密码" className="wuliuValue" value={this.state.password} onChange={this.setpassword.bind(this)}/>
                                                    </div>
                                                    :<div>
                                                        <label className="" htmlFor="">拒绝原因：</label>
                                                        <Input placeholder="请输入拒绝原因" className="wuliuValue" value={this.state.cause} onChange={this.setcause.bind(this)} />
                                                        <label className="label" htmlFor="">管理密码：</label>
                                                        <Input placeholder="请输入管理密码" className="wuliuValue" value={this.state.password} onChange={this.setpassword.bind(this)}/>
                                                    </div>
                                                
                                                }
                                        </Modal>
                                        <Modal
                                            title="订单审核"
                                            visible={this.state.visible2}
                                            onOk={this.props.orderAudit.bind(this)}
                                            onCancel={this.orderAuditCancel.bind(this)}
                                            cancelText="取消"
                                            okText="确定"
                                            >
                                                {
                                                    this.state.audit_type===1
                                                    ?<p>点击确认通过审核</p>
                                                    :<div>
                                                        <label className="" htmlFor="">拒绝原因：</label>
                                                        <Input placeholder="请输入拒绝原因" className="wuliuValue" value={this.state.cause} onChange={this.setcause.bind(this)} />
                                                    </div>
                                                
                                                }
                                                
                                        </Modal>
                                    </div>
                                    <div className="info_item">
                                        <div className="info_title">
                                            <div className="gang"></div>
                                            <div className="info_title_text">买家信息</div>
                                        </div>
                                        <div className="content_info">
                                            <p><span className="biaoti">用户昵称：</span><span>{shoopOrderInfo.recipient}</span></p>
                                            {
                                                shoopOrderInfo.payment===1
                                                ?<p><span className="biaoti">支付方式：</span><span>一卡通支付</span></p>
                                                :<p><span className="biaoti">支付方式：</span><span>微信支付</span></p>
                                            }
                                            
                                            <p><span className="biaoti">联系方式：</span><span>{ shoopOrderInfo.mobile}</span> </p>
                                            <p><span className="biaoti">收货地址：</span><span>{ shoopOrderInfo.address}</span> </p>
                                        </div>
                                    </div>
                                    <div className="info_item info_item1">
                                        <div className="info_title">
                                            <div className="gang"></div>
                                            <div className="info_title_text">订单信息</div>
                                        </div>
                                        <div className="content_info">
                                            <p className="order_info_biao"><span className="biaoti">订单编号：</span><span>{shoopOrderInfo.order_id}</span></p>
                                            <p className="order_info_biao2"><span className="biaoti">下单时间：</span><span>{shoopOrderInfo.created_at}</span></p>
                                            <div className="shoop_info_order_title1 shoop_info_order_title">
                                                <div className="shoop_info_order_title_item">
                                                    商品名称
                                                </div>
                                                <div className="shoop_info_order_title_item">
                                                    数量
                                                </div>
                                                <div className="shoop_info_order_title_item">
                                                    商品类型
                                                </div>
                                                <div className="shoop_info_order_title_item">
                                                    单价
                                                </div>
                                            </div>
                                            {
                                            shoopOrderInfo.subOrderList.map((item,index)=>{
                                                    return (
                                                        <div className="shoop_info_order_title" key={index}>
                                                            <div className="shoop_info_order_title_item">
                                                                <img className="shoopimg" src={item.pro_main_photo} alt="" width="20"/>
                                                                <span className="shoopimg">{item.drug_name}</span> 
                                                            </div>
                                                            <div className="shoop_info_order_title_item">
                                                                X{item.goods_counts}
                                                            </div>
                                                            <div className="shoop_info_order_title_item">
                                                                {item.sku_name}
                                                            </div>
                                                            <div className="shoop_info_order_title_item">
                                                                ￥{item.pro_platform}
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                                
                                            }
                                                
                                                        
                                            <div className="bottom_info_order">
                                                <p><span>订单商品金额：</span><span>￥{shoopOrderInfo.pro_platform_sum}</span></p>
                                                <p><span>订单总配送费：</span><span>￥{shoopOrderInfo.pro_freight_sum}</span></p>
                                                <p><span>订单优惠金额：</span><span>￥{shoopOrderInfo.integral}</span></p>
                                                <p><span>实际付款金额：</span><span>￥{shoopOrderInfo.totle_sum}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="info_item">
                                        <div className="info_title">
                                            <div className="gang"></div>
                                            <div className="info_title_text">物流信息</div>
                                        </div>
                                        <div className="content_info">
                                            <div className="wulliu_order_info_title">
                                                <div className="wulliu_order_info_title_item">
                                                    物流公司名称
                                                </div>
                                                <div className="wulliu_order_info_title_item">
                                                    运单号码
                                                </div>
                                                <div className="wulliu_order_info_title_item">
                                                    发货时间
                                                </div>
                                                <div className="wulliu_order_info_title_item">
                                                    操作
                                                </div>
                                            </div>
                                            <div className="wulliu_order_info_title wulliu_order_info_title1">
                                                <div className="wulliu_order_info_title_item">
                                                    {shoopOrderInfo.logistics_company}
                                                </div>
                                                <div className="wulliu_order_info_title_item">
                                                    {shoopOrderInfo.logistics_no}
                                                </div>
                                                <div className="wulliu_order_info_title_item">
                                                    {shoopOrderInfo.logistics_time}
                                                </div>
                                            
                                                <div className="wulliu_order_info_title_item">
                                                    {
                                                        shoopOrderInfo.order_code===30
                                                        ?<Button type="primary" onClick={this.clickInfo.bind(this)}>录入信息</Button>
                                                        :''
                                                    }
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <Modal
                                            title="录入信息"
                                            visible={this.state.visible}
                                            onOk={this.props.handleOk.bind(this)}
                                            onCancel={this.handleCancel.bind(this)}
                                            cancelText="取消"
                                            okText="确定"
                                            >
                                                <label className="" htmlFor="">物流公司：</label>
                                                <Input placeholder="请输入物流公司名称" className="wuliuValue" value={this.state.firmName} onChange={this.setfirmName.bind(this)} />
                                                <br/>
                                                <label className="label" htmlFor="">物流编号：</label>
                                                <Input placeholder="请输入物流编号" className="wuliuValue" value={this.state.firmNumber} onChange={this.setfirmNumber.bind(this)}/>
                                                
                                                <label className="" htmlFor="">发货时间：</label>
                                                <Input placeholder="请输入发货时间" className="wuliuValue" value={this.state.firmTime} onChange={this.setfirmTime.bind(this)}/>
                                        </Modal>
                                    </div>
                                </ContentOrderInfo>
                            </div>
                        }
                                
                    </Spin>
                </OrderWrapper>
                
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        //订单列表
        shoopOrderList:state.getIn(['shoopOrder','shoopOrderList']),
        //商品订单详情
        shoopOrderInfo:state.getIn(['shoopOrder','shoopOrderInfo']),
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        //查询订单列表
        async getShoopList(that){
            //请求
            var url  = 'mallAdmin/orderList'
            var limit = that.state.limit;
            var offset = that.state.offset;
            var created_at_start = that.state.created_at_start;
            var created_at_end = that.state.created_at_end;
            var nickname = that.state.nickname;
            var order_code = that.state.order_code;
            var order_id = that.state.order_id;
            var drug_name = that.state.drug_name;
            var data = {
                limit,
                offset,
                created_at_start,
                created_at_end,
                nickname,
                order_code,
                order_id,
                drug_name
            }
            that.setState({Loading:true});
            var res = await http.post(url,data);
            that.setState({Loading:false});
            if(res.errcode===0){
                that.setState({total:res.data.total})
                var action = actionCreators.setShoopOrderList(res.data.content);
                dispatch(action)
            }
        },
        //查询订单详情
        async getOrderInfo(that){
            
            var url  = 'mallAdmin/orderDetail'
            var order_id = that.state.orderId;
            var data = {
                order_id
            }
            that.setState({Loading:true});
            var res = await http.post(url,data);
            that.setState({Loading:false});
            if(res.errcode===0){
                that.setState({
                    //物流公司
                    firmName:res.data.logistics_company,
                    //物流编号
                    firmNumber:res.data.logistics_no,
                    //发货时间
                    firmTime:res.data.logistics_time,
                })
                var action = actionCreators.setShoopOrderInfo(res.data);
                dispatch(action)
            }
        },
        //确定退款
        async refundAudit(){
            var shoopOrderInfo = this.props.shoopOrderInfo.toJS();
            this.setState({
                visible1:false,
                cause:'',
                // 管理密码
                password:'',
                //通过还是拒绝
                audit_type:''
            })
            var url  = 'mallAdmin/refundAudit'
            var order_id = this.state.orderId;
            var remark =  this.state.cause;
            var passwd = this.state.password;
            var audit_type = this.state.audit_type;
            var data = {
                order_id,
                audit_type,
                remark,
                passwd
            }
            this.setState({Loading:true});
            var res = await http.post(url,data);
            this.setState({Loading:false});
            if(res.errcode===0){
                
                shoopOrderInfo.order_code=7;
                var action = actionCreators.setShoopOrderInfo(shoopOrderInfo);
                dispatch(action)
            }
        },

        //信息录入
        async handleOk(){
            this.setState({
                visible:false,
            })
            
            var shoopOrderInfo = this.props.shoopOrderInfo.toJS();
            var url  = 'mallAdmin/sendGoods'
            var order_id = this.state.orderId;
            var logistics_no =  this.state.firmNumber;
            var logistics_company = this.state.firmName;
            var logistics_time = this.state.firmTime;
            var data = {
                order_id,
                logistics_no,
                logistics_company,
                logistics_time
            }
            this.setState({Loading:true});
            var res = await http.post(url,data);
            this.setState({Loading:false});
            if(res.errcode===0){
                shoopOrderInfo.logistics_no=this.state.firmNumber;
                shoopOrderInfo.logistics_company=this.state.firmName;
                shoopOrderInfo.logistics_time=this.state.firmTime;
                shoopOrderInfo.order_code=40;
                var action = actionCreators.setShoopOrderInfo(shoopOrderInfo);
                dispatch(action)
            }
        },
        
        //审核订单
        async orderAudit(){
            var shoopOrderInfo = this.props.shoopOrderInfo.toJS()
            this.setState({
                visible2:false,
                cause:'',
                // 管理密码
                password:'',
                //通过还是拒绝
                audit_type:''
            })
            var url  = 'mallAdmin/orderAudit'
            var order_id = this.state.orderId;
            var remark =  this.state.cause;
            var audit_type = this.state.audit_type;
            var data = {
                order_id,
                audit_type,
                remark,
            }
            this.setState({Loading:true});
            var res = await http.post(url,data);
            this.setState({Loading:false});
            if(res.errcode===0){
                shoopOrderInfo.order_code=30;
                var action = actionCreators.setShoopOrderInfo(shoopOrderInfo);
                dispatch(action)
            }
        }
    }
}
export default withRouter(connect(mapStateTopProps,mapDispatchToProps)(ShoopOrder))