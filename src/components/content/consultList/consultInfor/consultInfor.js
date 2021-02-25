import React,{PureComponent,Fragment} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import { ContentWorp,Content,Bottom,Message,ContentLeft,ContentRight,List,Worps } from './style';
import * as imager from './../assager';
import { Button,Upload,Modal, Input,Radio,message,Checkbox  } from 'antd';
import * as actionCreators from './store/actionCreators';
import {webSocket} from './../../../../websocket/websocket';
import http from '@/untils/http';
import './consultInfor.css'
const CheckboxGroup = Checkbox.Group;
class ConsultInfor extends PureComponent{
  constructor(props) {
    super(props)
    this.state = {
        websocketobj:'',
        textValue:'',
        //当前播放得音频
        audioSrc:'',
        rideoaValue:'',
        visible:false,
        visibles:false,
        inputValue:'',
        CheckboxGroup:[]
    }
  }
    textChange(e){
      var textValue = e.target.value;
      this.setState({
        textValue
      })
    }
    //键盘
    onkeydown(e){
      if (e.ctrlKey && e.keyCode === 13) {
        this.handleSend();
      }
    }
    // 点击发送文本
    handleSend(){ 

      var content=this.state.textValue;
     this.props.sendMessage(this,content,'1',0)
    }
    componentWillMount(){
      //连接webSocket
      webSocket(2,this);
      this.props.setOrderList(this);
      var that = this;
      setTimeout(() => {
        var websocketobj = that.props.websocketobj;
        that.setState({
          websocketobj:websocketobj
        });
      }, 500);

      
      
    }
    componentDidMount(){
     
    }
    // 、、弹出
    updatevisible(){
      this.setState({
        visible:true
      })
    }
    // 查看
    updatevisibles(){
      var arr =[];
      var list = this.props.yetSelect.toJS();
      for(var i = 0;i<list.length;i++){
        arr.push(i)
      }
      this.setState({
        visible:false,
        visibles:true,
        CheckboxGroup:arr
      })
    }
    //返回
    toback(){
      this.setState({
        visible:true,
        visibles:false
      })
    }
    //多选
    onChange(e){
      this.setState({
        CheckboxGroup:e
      })
    }
    //搜索信息
    inputValue(e){
      var inputValue = e.target.value;
      this.setState({
        inputValue
      })
    }
    quxiao(){
      this.setState({
        visible:false,
        visibles:false
      })
    }
    render() { 
        var yetSelect = this.props.yetSelect.toJS();
        var selectList =  this.props.selectList.toJS();
        var recordList = this.props.recordList.toJS();
        var OrderList = this.props.OrderList.toJS();
        var that = this;
        const style = {
          width:'90%',
          border:'2px solid #03c1fe',
          height:'30px',
          borderRadius:'15px',
          overflow:'hidden',
          background:'#03c1fe',
          borderLeft:'3px solid #03c1fe',
          // fontSize:'0'
        }
        const inputStyle={
          width: '80%',
          height:'100%',
          border:'none',//去除边框
          borderRadius:'0',
          boxShadow:'0px 0px 0px 0px',//去除阴影
          fontSize:'14px'
        }
        const buttonStyle = {
          cursor: 'pointer',
          width:'20%',
          height:'100%',
          display:'inline-block',
          textAlign:'center',
          border:'2px solid #03c1fe',
          background:'#03c1fe',
          fontSize:'14px',
          color:'#fff'
        }
        const props = {
          name: "uploadFile",
          showUploadList: false,//设置只上传一张图片，根据实际情况修改
          customRequest:async info => {//手动上传
              const formData = new FormData();
              formData.append('uploadFile', info.file);//名字和后端接口名字对应
              var url = 'consult/uploadFile';
              var data = formData
              var res = await http.postFile(url,data);
              if(res.errcode===0){
                that.props.sendMessage(that,res.data.path,'2',0);
              }
          }
          
        }
        if(this.props.MessageCode===2){
          this.props.setOrderList(this);
        }
        
        return (
            <Fragment>
              <ContentWorp>
                <List className="List">
                {
                  OrderList.length>0
                  ?OrderList.map((item,index)=>{
                    return (
                      <div className="lis" key={index} onClick={this.props.clickUpdateUser.bind(this,item)}>
                        <div className={item.value===0?"list":"list list1"}>
                          <div className="list_img">
                            <img className="imger" src={item.avatar} alt=""/>
                          </div>
                          <div className="list_content">
                            {item.name}
                          </div>
                          {
                          item.order_code=== 30
                          ?<div className="list_icno">

                          </div>
                          :item.order_code===20
                          ?<div className="list_icno list_icno1">

                          </div>
                          :<div className="list_icno2">

                          </div>
                          }                            
                        </div>
                        {
                          item.value===0
                          ?''
                          :<div className="odder_info">
                            <div>
                              订单编号：{item.order_id}
                            </div>
                            
                            <div>
                              订单时间：{item.created_at}
                            </div>
                            
                          </div> 
                        }
                        
                        
                      </div>
                    )
                  })
                  : 
                  <div className="zanwu">
                    <img src={imager.zanwu} alt="" className="zanwu"/>
                        暂无订单
                  </div>
                }
                  
                </List>
                {
                OrderList.length>0 && this.props.order_code!==20
                ?<Worps>
                  <Content className="scropt">
                        {
                          //数据信息
                          recordList.map((item,index)=>{
                            return (
                              <Message key={index}>
                                
                                {
                                  item.identity==='1'
                                  ?<ContentLeft>
                                    <div className="left_item">
                                    <div className="titTime">{item.created_at}</div> 
                                      <div className="left_imgheard">
                                        <img className="imger" src={this.props.heardImg} alt=""/>
                                      </div>
                                      {
                                        item.type==='1'
                                        ?<div className="left_txt">
                                          
                                          <img src={imager.zuojian} alt="" className="left_txt_img"/>
                                          <div className="left_txt_message">
                                            {item.content}
                                          </div>
                                        </div>
                                        :item.type==='2'
                                        ?<div className="left_txt">
                                          <img src={item.content} className="content_img" alt=""/>
                                        </div>
                                        :<div className="left_txt" onClick={this.props.payaudio.bind(this,item.content)}>
                                            <img src={imager.zuojian} alt="" className="left_txt_img"/>
                                            <div className="left_txt_message audo">
                                              <span className="time_text">{item.time}</span>
                                              {
                                                item.value===0
                                                ?<img src={imager.weibofang} alt="" className="time_img"/>
                                                :<img src={imager.bofang} alt="" className="time_img"/>
                                              }
                                            </div>
                                        </div>
                                      }
                                    </div>
                                  </ContentLeft>
                                  :<ContentRight>
                                    <div className="right_item">
                                      <div className="titTime">{item.created_at}</div> 
                                      {
                                        item.type==='1'
                                        ?<div className="right_txt">
                                          <div className="right_txt_message">
                                            {item.content}
                                          </div>
                                          <img src={imager.youjian} alt="" className="right_txt_img"/>
                                        </div>
                                        :item.type==='2'
                                        ?<div className="right_txt">
                                          <img src={item.content}  className="content_img" alt=""/>
                                        </div>
                                        :item.type==='9'
                                        ?<div className="right_txt">
                                          <div className="right_txt_message">
                                            您已为患者开具处方！
                                          </div>
                                          <img src={imager.youjian} alt="" className="right_txt_img"/>
                                        </div>
                                        :<div className="right_txt">

                                        </div>

                                      }
                                      
                                      <div className="right_imgheard">
                                        {
                                          item.type==='9'?<img src={imager.tong} alt="" className="img_header"/>:<img src={imager.doctor} alt="" className="img_header"/>
                                        }
                                        
                                      </div>
                                    </div>
                                  </ContentRight>
                                }
                              </Message>
                            )
                          })
                        }
                    </Content>
                    <Bottom> 
                    <div className="bottom_title">
                      <div className="tupian" >
                        <img src={imager.tupian} alt=""/>
                        <Upload className="file"  {...props} enctype="multipart/form-data">
                          <Button>Upload</Button>
                        </Upload>
                      </div>
                      <Modal
                        maskClosable={false}
                        cancelText="查看已选"
                        okText="发送"
                        onOk={this.props.sendList.bind(this,1)}
                        onCancel={this.updatevisibles.bind(this)}
                        className="title"
                        title={
                          <div  style={style}>
                            <Input placeholder="搜索药品食品，日用" style={inputStyle} onChange={this.inputValue.bind(this)}/>
                            <div style={buttonStyle} onClick={this.props.shoopSerch.bind(this)}>搜索</div>
                            <img src={imager.quxiao} alt="" className='quxiao'  onClick={this.quxiao.bind(this)}/>
                          </div>
                          
                        }
                        visible={this.state.visible}
                        width={800}
                        height={600}
                        closable={false}    
                      >
                        <div className="modul_content">
                          <div className="nav_model">
                            <div className="content_title_item">
                              商品名称
                            </div>
                            <div className="content_title_item">
                              商品规格
                            </div>
                          </div>
                          <Radio.Group className="group" onChange={this.props.groupRadio.bind(this)}>
                            {
                              selectList.map((item,index)=>{
                                return (
                                  <Radio value={index} key={index}>
                                      <div className="nav_model1">
                                        <div className="content_title_item1">
                                          <div className="model_img">
                                            <img src={item.proMianPhoto} className="model_img" alt=""/>
                                          </div>
                                          <span className="model_text">{item.drugName}</span> 
                                        </div>
                                        <div className="content_title_item2">
                                        {item.spec}
                                        </div>
                                      </div>
                                      {
                                        this.state.rideoaValue===index
                                        ?<div className="model_sku">
                                            <div className="sku_list">
                                              {
                                                item.sku.map((items,indexs)=>{
                                                  return ( 
                                                    <div className={items.value===0?"sku_item":'sku_item1'} key={indexs} onClick={this.props.updateSku.bind(this,index,indexs)}>
                                                      <div className="model_img1">
                                                        <img src={item.proMianPhoto} className="model_img1" alt=""/>
                                                      </div>
                                                      <span className="model_text1">{items.skuName}</span> 
                                                    </div>
                                                  )
                                                })
                                              }
                                            </div>
                                            <div className="operation">
                                              <div className="minus" onClick={this.props.minusORadd.bind(this,1,index)}>-</div>
                                              <div className="quantity">{item.num}</div>
                                              <div className="add" onClick={this.props.minusORadd.bind(this,0,index)}>+</div>
                                            </div>
                                            <div className="modul_button">
                                              <Button type="primary" onClick={this.props.addList.bind(this,index)}>加入</Button>
                                            </div>
                                          </div>
                                        :''
                                      }
                                          
                                    </Radio>
                                )
                              })
                            }
                          </Radio.Group>
                        </div>
                      </Modal>
                      <Modal
                        maskClosable={false}
                        cancelText="删除"
                        okText="发送"
                        onOk={this.props.sendList.bind(this,2)}
                        onCancel={this.props.delateList.bind(this)}
                        className="title"
                        title={
                          <div>
                            <img src={imager.quxiao} alt="" className='quxiao' onClick={this.quxiao.bind(this)}/>
                            <img src={imager.fanhui} alt="" onClick={this.toback.bind(this)}/>
                            <div className="cat_content">
                              <div className="cat_title_item">
                                名称
                              </div>
                              <div className="cat_title_item">
                                规格
                              </div>
                              <div className="cat_title_item">
                                信息
                              </div>
                              <div className="cat_title_item">
                                数量
                              </div>
                            </div>
                          </div>
                        }
                        visible={this.state.visibles}
                        width={800}
                        height={600}
                        closable={false}                      >
                        <div className="modul_content">
                        <CheckboxGroup className="group" onChange={this.onChange.bind(this)} value={this.state.CheckboxGroup}>
                              {
                                yetSelect.map((item,index)=>{
                                  return (
                                    <Checkbox  value={index} key={index}>
                                        <div className="nav_model1s">
                                          <div className="cat_title_item1">
                                            <div className="model_img">
                                              <img src={item.proMianPhoto} className="model_img" alt=""/>
                                            </div>
                                            <span className="model_text">{item.drugName}</span> 
                                          </div>
                                          <div className="cat_title_item2s">
                                            {item.spec}
                                          </div>
                                          <div className="cat_title_item2ss">
                                            {item.sku}
                                          </div>
                                          <div className="cat_title_item2sss">
                                            {item.num}
                                          </div>
                                        </div>
                                            
                                      </Checkbox >
                                  )
                                })
                              }
                          </CheckboxGroup>
                        </div>
                          
                      </Modal>
                      <div className="biaoqing" onClick={this.updatevisible.bind(this)}>
                        <img src={imager.chufang} alt=""/>
                      </div>
                    </div>
                  <textarea rows={6} className="bordet" placeholder="请输入内容" value={this.state.textValue} onChange={this.textChange.bind(this)} onKeyDown={this.onkeydown.bind(this)}></textarea>
                  {
                    this.props.order_code!==40
                    ?<Button type="default" className="default" onClick={this.props.clickOver.bind(this)}>关闭咨询</Button>
                    :''
                  }
                  
                  <Button type="primary" className="btn" onClick={this.handleSend.bind(this)}  >发送(ctrl+Enter)</Button>
                  </Bottom>
                </Worps>
                :OrderList.length>0&&this.props.order_code===20
                ?<Worps>
                  <div className="zanwu">
                    <img src={imager.weijie} alt="" className="zanwu"/>
                    <div>
                       <Button type="primary" className="primary" onClick={this.props.clickClinical.bind(this)}>开始咨询</Button>
                    </div>
                  </div>
                </Worps> 
                :<Worps>
                    <div className="zanwu">
                      <img src={imager.zanwu} alt="" className="zanwu"/>
                        <div>暂无信息</div> 
                    </div>
                </Worps> 
              }
              </ContentWorp>    
              <audio  id="myaudio"  src={this.state.audioSrc}></audio>
            </Fragment>
        ) 
    }
}

// 固定写法接收一个state就是store里的数据 接收数据
const mapStateTopProps=(state)=>{
    return {
      //聊天记录信息
      recordList:state.getIn(['consultInfor','recordList']),
      order_id:state.getIn(['consultInfor','ordeId']),
      OrderList:state.getIn(['consultInfor','OrderList']),
      order_code:state.getIn(['consultInfor','OrderCode']),
      MessageCode:state.getIn(['consultInfor','MessageCode']),
      heardImg:state.getIn(['consultInfor','heardImg']),
      selectList:state.getIn(['consultInfor','selectList']),
      yetSelect:state.getIn(['consultInfor','yetSelect']),
      optOn:state.getIn(['consultInfor','optOn']),
      websocketobj:state.getIn(['consultInfor','websocketobj']),
    }
  }
const mapDispatchToProps=(dispatch)=>{
    return {
      uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
      
        var uuid = s.join("");
        return uuid;
      },
      //发送
      sendList(type){
        var list =[];
        if(type===1){
          var optOn = this.props.optOn.toJS();
          
          list.push(optOn);
        }else{
          list = this.props.yetSelect.toJS();
        }
        if(list.length<=0){
          message.info('请先选择商品');
          return
        }
        var object={}
        var data = []
        for(var i = 0;i<list.length;i++){
          var obj = {}
          obj.product_id = list[i].productId;
          obj.goods_counts = list[i].num;
          obj.sku_name = list[i].sku;
          obj.proPlatform =list[i].proPlatform;
          obj.drugName =list[i].drugName;
          obj.proMianPhoto= list[i].proMianPhoto;
          obj.proFreight=list[i].proFreight;
          data.push(obj);
        }
        object.pid= this.props.uuid();
        object.data = data
        this.props.sendMessage(this,JSON.stringify(object),'9',0);
        var yetSelectAction = actionCreators.getYetSelect([]);
        dispatch(yetSelectAction);
        var optOnAction = actionCreators.getoptOn({});
        dispatch(optOnAction);
        var actions = actionCreators.getselectList([]);
          dispatch(actions);
          this.setState({
            visible:false,
            visibles:false
          })
      },
      //删除已选中得
      delateList(){
        var list = this.props.yetSelect.toJS();
        var lists = JSON.parse(JSON.stringify(this.props.yetSelect.toJS()));
        var arr = this.state.CheckboxGroup;
        for(var i = 0;i<arr.length;i++){
          for(var j = 0;j<lists.length;j++){
            if(list[arr[i]].productId===lists[j].productId){
              lists.splice(j,1);
            }
          }
        }
        var yetSelectAction = actionCreators.getYetSelect(lists);
        dispatch(yetSelectAction);
        this.setState({
          CheckboxGroup:[]
        })
      },
      //切换sku
      updateSku(index,indexs){
        var list = this.props.selectList.toJS();
        for(var i = 0;i<list[index].sku.length;i++){
          (list[index].sku)[i].value=1;
        }
        (list[index].sku)[indexs].value=0;
        var actions = actionCreators.getselectList(list);
        dispatch(actions);
      },
      //选中哪一个
      groupRadio(e){
        this.setState({rideoaValue:e.target.value})
        var list = this.props.selectList.toJS();
        var obj = list[e.target.value];
        for(var i = 0;i<obj.sku.length;i++){
          if(obj.sku[i].value===0){
            obj.sku=obj.sku[i].skuName
          }
        }
        var optOnAction = actionCreators.getoptOn(obj);
        dispatch(optOnAction);
      },
      //加入
    addList(index){
      var list = this.props.selectList.toJS();
      var yetSelect = this.props.yetSelect.toJS();
      for(var i=0;i<yetSelect.length;i++){
        if(yetSelect[i].productId===list[index].productId){
          message.info('该商品已经加入，可在已选择列表查看');
          return
        }
      }
      var obj = list[index];
      for(var j = 0;j<obj.sku.length;j++){
        if(obj.sku[j].value===0){
          obj.sku=obj.sku[j].skuName;
        }
      }
      yetSelect.push(obj);
      var yetSelectAction = actionCreators.getYetSelect(yetSelect);
      dispatch(yetSelectAction);
      message.info('加入成功');
    },
      //加减
    minusORadd(type,index){
      var list = this.props.selectList.toJS();
      if(type===0){
        list[index].num+=1;
        var action = actionCreators.getselectList(list);
        dispatch(action);
      }else if(type===1){
        if(list[index].num>1){
          list[index].num-=1
          var actions = actionCreators.getselectList(list);
          dispatch(actions);
        }else{
          return
        }
      }
    },
    //模糊搜索商品
    async shoopSerch(){
      var url = 'product/list';
      var data = {
        offset:1,
        limit:999999999,
        drugName:this.state.inputValue,
        proUpDown:1,
        proShow:1
      }
      var res = await http.post(url,data);
      if(res.errcode===0){
        var list = res.data.list;
        for(var i=0;i<list.length;i++){
          list[i].num=1;
          var skuName =JSON.parse(list[i].skuName);
          for(var j =0;j<skuName.length;j++){
            skuName[j].value=1;
          }
          skuName[0].value=0;
          list[i].sku=skuName;
        }
        var actions = actionCreators.getselectList(list);
          dispatch(actions);
      }
    },
    //查询聊天记录
      //查询聊天记录
    async setchatList(that,order_id){
      //请求
      var url  = 'consult/getMessageRecord'
      var data = {
        order_id:order_id
      }
      var res = await http.post(url,data);
      if(res.errcode===0){
        var list = res.data.record;
        for(var i=0;i<list.length;i++){
          list[i].value=0
        }
        var action =actionCreators.getRecordList(list);
        dispatch(action);
        var ele = document.getElementsByClassName('scropt')[0];
        //判断元素是否出现了滚动条
        if(ele!==undefined){
          setTimeout(function(){
            //设置滚动条到最底部
              ele.scrollTop = ele.scrollHeight;
          },100);
        }
          
      }
    },
    //查询咨询列表
    async setOrderList(that){
      // 改变弹窗状态
      var actionMessage = actionCreators.getMessage(0);
        dispatch(actionMessage)
      var order_id = that.props.order_id;
      //请求
      var url  = 'backstage/queryOders'
      var data = {
        type:'',
        date:'',
        limit:999999999,
        offset:1
      }
      var res = await http.post(url,data);
      if(res.errcode===0){
        if(res.data.content.length>0){
          var orderId='';
          var orderCode='';
          var heardImg='';
          var list = res.data.content;
          for(var i=0;i<list.length;i++){
            list[i].value=0;
            if(order_id===list[i].order_id){
              list[i].value=1
              orderId=list[i].order_id;
              orderCode = list[i].order_code;
              heardImg=list[i].avatar;
            }
            
          }
          if(order_id===''||order_id===undefined||order_id===null){
              list[0].value=1;
              orderId=list[0].order_id;
              orderCode = list[0].order_code;
              heardImg=list[0].avatar;
          }
          var actionOrderImg =actionCreators.getHeardImg(heardImg);
            dispatch(actionOrderImg);
          var action =actionCreators.getOrderList(list);
            dispatch(action);
          var actionOrder =actionCreators.getOrdeId(orderId);
            dispatch(actionOrder);
          var actionOrderCode =actionCreators.getOrderCode(orderCode);
            dispatch(actionOrderCode);
          
          that.props.setchatList(that,orderId);
        }
        
      }
    },
      //发送消息
      sendMessage(that,content,type,time){
        var nwoTime = new Date();
        var year = nwoTime.getFullYear(); //获取当前年份
        var month;
        var date;
        var hous;
        var min;
        var s;
        if(nwoTime.getMonth() + 1 <10){
          month ="0" +( nwoTime.getMonth() + 1);
        }else{
          month =nwoTime.getMonth() + 1;
        }
        if(nwoTime.getDate() + 1 <10){
          date ="0" +( nwoTime.getDate());
        }else{
          date =nwoTime.getDate();
        }
        if(nwoTime.getHours() + 1 <10){
          hous ="0" + (nwoTime.getHours());
        }else{
          hous =nwoTime.getHours();
        }
        if(nwoTime.getMinutes() + 1 <10){
          min ="0" + (nwoTime.getMinutes());
        }else{
          min =nwoTime.getMinutes();
        }
        if(nwoTime.getSeconds() + 1 <10){
          s ="0" + (nwoTime.getSeconds());
        }else{
          s =nwoTime.getSeconds();
        }
        
        var created_at =  year + "-" + month + "-" + date + " " +hous + ":" + min + ":" + s;
        var recordList = that.props.recordList.toJS();
        var data = {}
        data.order_id = that.props.order_id;
        data.identity = '2';
        data.content = content;
        data.type = type;
        data.time = time;
        data.value = 0;
        data.created_at=created_at;
        recordList.push(data)
        var action = actionCreators.getRecordList(recordList);
        dispatch(action);
        that.setState({
          textValue:''
        });
        
        that.state.websocketobj.send(JSON.stringify(data));
        console.log(data);
        var ele = document.getElementsByClassName('scropt')[0];
        //判断元素是否出现了滚动条
                if(ele!==undefined) {
                    setTimeout(function(){
                        //设置滚动条到最底部
                        ele.scrollTop = ele.scrollHeight;
                    },10);
                }
      },
      //接收到消息修改数据类型
      setList(that,websocketMessage){
        var websocketMessages = JSON.parse(websocketMessage);
        if(websocketMessages.type==='6'){
          var actionMessage = actionCreators.getMessage(1);
          dispatch(actionMessage);
        }else{
          if(websocketMessages.order_id===that.props.order_id){
            var list = that.props.recordList.toJS();
            list.push(websocketMessages);
            var action = actionCreators.getRecordList(list);
            dispatch(action);
            var ele = document.getElementsByClassName('scropt')[0];
            if(ele!==undefined) {
              setTimeout(function(){
                //设置滚动条到最底部
                  ele.scrollTop = ele.scrollHeight;
              },100);
            } 
              
          }
        } 
          
      },
      //点击播放
      payaudio(src){ 
        var  myaudio= document.getElementById('myaudio');
        var list = this.props.recordList.toJS()
        this.setState(()=>({
          audioSrc:src
        }),()=>{
          myaudio.play();
          for(var i = 0;i<list.length;i++){
            list[i].value=0
            if(list[i].content===src){
              list[i].value=1
            }
          }
          var action =actionCreators.getRecordList(list);
          dispatch(action);
        })
        myaudio.loop = false;
        myaudio.addEventListener('ended', function () {  
          for(var i=0;i<list.length;i++){
            list[i].value=0
          }
          var action =actionCreators.getRecordList(list);
          dispatch(action);
        }, false);
      },
      // 点击切换用户
      clickUpdateUser(item){
        var that = this;
        var  OrderList = that.props.OrderList.toJS();
        for(var i =0;i<OrderList.length;i++){
            OrderList[i].value=0;
          if(OrderList[i].order_id===item.order_id) {
            OrderList[i].value=1;
            var actionOrder = actionCreators.getOrdeId(OrderList[i].order_id);
            var actionOrderCode =actionCreators.getOrderCode(OrderList[i].order_code);
            var actionOrderImg =actionCreators.getHeardImg(OrderList[i].avatar);
            dispatch(actionOrderImg);
            dispatch(actionOrderCode);
            dispatch(actionOrder);
            that.props.setchatList(that,OrderList[i].order_id)
          }
        }
        var action =actionCreators.getOrderList(OrderList);
            dispatch(action);
          
          
      },
      //点击接诊
      async clickClinical(){
        var  list = this.props.OrderList.toJS();
        var order_id = this.props.order_id;
        var url = 'backstage/takeOrder'
        var data = {
          order_id
        }
        var res = await http.post(url,data);
        if(res.errcode===0){
          for(var i = 0;i<list.length;i++){
            if(list[i].order_id===order_id){
              list[i].order_code=30
            }
          }
          //修改订单列表以及订单状态
          var actionOrderCode =actionCreators.getOrderCode(30);
          dispatch(actionOrderCode);
          var action =actionCreators.getOrderList(list);
            dispatch(action);
        }
      },
      //点击结束订单
      async clickOver(){
        var  list = this.props.OrderList.toJS();
        var url = "backstage/overOrder";
        var order_id = this.props.order_id;
        var data={
          order_id
        }
        var res = await http.post(url,data);
        if(res.errcode===0){
          for(var i = 0;i<list.length;i++){
            if(list[0].order_id===order_id){
              list[0].order_code=40
            }
          }
          //修改订单列表以及订单状态
          var actionOrderCode = actionCreators.getOrderCode(40);
            dispatch(actionOrderCode);
          var action =actionCreators.getOrderList(list);
            dispatch(action);
            
        }
      },
      setWebSocket(value,that){
        that.setState({
          websocketobj:value
        });
        var actions = actionCreators.getwebsocketobj(value);
        dispatch(actions)
      }
    }
      
  }
export default withRouter(connect(mapStateTopProps,mapDispatchToProps)(ConsultInfor));  