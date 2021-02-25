import React,{PureComponent,Fragment} from 'react';
import {connect} from 'react-redux';
import { Wrapper } from './style';
import { Input,Select,Button,Upload,message,Spin } from 'antd';
// import '../../CrmAdmin/visitList/node_modules/antd/dist/antd.css';
import { withRouter } from 'react-router';
import * as imager  from '../assager';
import http from './../../../../untils/http';
import * as actionCreators from './store/actionCreators';
const { Option } = Select;
const { TextArea } = Input;
class AddShoop extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            optionData:[{
                label:'是',
                value:0
            },{
                label:'否',
                value:1
            }],
            spec:'',
            productId:'',
            drugName:'',
            proDescription: "",
            proOfficial: '', //商品分类
            proCommodity:'', //商品品牌
            proPreferential: '', //优惠促销
            proPetStuff:'', //宠物分类
            proPlatform: '', //平台价
            proPrice: '', //零售价
            proFreight: '', //运费
            proUpDown: 0, //上下架
            proStage:"",//适用阶段
            proQuality:'',//保质期,
            skuInfo:'',
            skuName:[],
            Loading:false,//加载
            quantity:''
        }
    }
    componentWillMount(){
       
    }
    componentDidMount(){
        this.props.initializeImg(this)
        this.props.getTypelist(this);
        this.getShoopIfo(this)
    }
    //查询商品详情
   async getShoopIfo(that){
        var url = 'product/item';
        var productId = this.props.ProductId;
        var data = {
            productId
        }
        that.setState({Loading:true})
        var res = await http.post(url,data);
        that.setState({Loading:false})
         if(res.errcode===0){
             var shoopInfo = res.data;
             var arr = shoopInfo.sku;
             var skuInfo='';
             for(var i=0;i<arr.length;i++){
                 if(i>0){
                    skuInfo = skuInfo +'/' + arr[i].skuName;
                 }else{
                    skuInfo+=arr[i].skuName;
                 }
                
             }
             
            this.setState({
                spec:shoopInfo.spec,
                productId:shoopInfo.productId,
                drugName:shoopInfo.drugName,
                proDescription: shoopInfo.proDescription,
                proOfficial: shoopInfo.proOfficial, //商品分类
                proCommodity:shoopInfo.proCommodity, //商品品牌
                proPreferential: shoopInfo.proPreferential, //优惠促销
                proPetStuff:shoopInfo.proPetStuff, //宠物分类
                proPlatform: shoopInfo.proPlatform, //平台价
                proPrice: shoopInfo.proPrice, //零售价
                proFreight: shoopInfo.proFreight, //运费
                proUpDown:shoopInfo.proUpDown, //上下架
                proStage:shoopInfo.proStage,//适用阶段
                proQuality:shoopInfo.proQuality,//保质期
                skuInfo:skuInfo,
                skuName:shoopInfo.sku,
                quantity:shoopInfo.quantity
            })
        if(shoopInfo.proNoticeTypes===undefined){
            this.props.infoImg(shoopInfo.proMianPhoto,[]);
        }else{
            this.props.infoImg(shoopInfo.proMianPhoto,shoopInfo.proNoticeTypes);
        }
        }    
    }
    //输入框
    inputValue(type,e){
        //商品名称
        if(type==='drugName'){
            this.setState({
                drugName:e.target.value
            })
        }
        //商品分类
        if(type==='proOfficial'){
            this.setState({
                proOfficial:e
            })
        }
        //商品品牌
        if(type==='proCommodity'){
            this.setState({
                proCommodity:e
            })
        }
        //优惠促销
        if(type==='proPreferential'){
            this.setState({
                proPreferential:e
            })
        }
        //宠物分类
        if(type==='proPetStuff'){
            this.setState({
                proPetStuff:e
            })
        }
        //平台价
        if(type==='proPlatform'){
            this.setState({
                proPlatform:e.target.value
            })
        }
        //零售价
        if(type==='proPrice'){
            this.setState({
                proPrice:e.target.value
            })
        }
        //运费
        if(type==='proFreight'){
            this.setState({
                proFreight:e.target.value
            })
        }
        //适用阶段
        if(type==='proStage'){
            this.setState({
                proStage:e.target.value
            })
        }
        //保质期
        if(type==='proQuality'){
            this.setState({
                proQuality:e.target.value
            })
        }
        //商品描述
        if(type==='proDescription'){
            this.setState({
                proDescription:e.target.value
            })
        }
        //sku
        if(type==='skuInfo'){
            var skuInfo = e.target.value;
            var skuName =skuInfo.split('/');
            var arr =[];
            for(var i = 0;i<skuName.length;i++){
                var obj ={}
                obj.skuName=skuName[i];
                arr.push(obj);
            }
            this.setState({
                skuInfo:e.target.value,
                skuName:arr
            })
        }
        
    }
    //取消保存
    NosaveShoop(){
        this.props.history.push('/Admin/shoop/ShoopList')
    }
    //保存商品
    async saveShoop(){
       var url = 'product/update';
       var drugName = this.state.drugName;
       var proMianPhoto = this.props.shoopImg;
       var proNoticeTypes =JSON.stringify(this.props.shoopInfoImg.toJS()); 
       var proDescription = this.state.proDescription;
       var proOfficial = this.state.proOfficial;
       var proCommodity = this.state.proCommodity;
       var proPreferential = this.state.proPreferential;
       var proPetStuff = this.state.proPetStuff;
       var proPlatform = this.state.proPlatform;
       var proPrice = this.state.proPrice;
       var proFreight = this.state.proFreight;
       var productId = this.state.productId;
       var proUpDown =  this.state.proUpDown;
       var proStage = this.state.proStage;
       var proQuality =  this.state.proQuality;
       var spec = this.state.spec;
       var skuName =JSON.stringify(this.state.skuName); 
       if(drugName===''||proMianPhoto===''||JSON.parse(proNoticeTypes).length<=0||proDescription===''||proOfficial===''||proCommodity===''||proPreferential===''||proPetStuff===''||proPlatform===''||proPrice===''||proFreight===''||productId===''||proUpDown===''||proStage===''||proQuality===''||JSON.parse(skuName).length<=0||drugName===undefined||proMianPhoto===undefined||JSON.parse(proNoticeTypes).length===undefined||proDescription===undefined||proOfficial===undefined||proCommodity===undefined||proPreferential===undefined||proPetStuff===undefined||proPlatform===undefined||proPrice===undefined||proFreight===undefined||productId===undefined||proUpDown===undefined||proStage===undefined||proQuality===undefined||JSON.parse(skuName).length===undefined){
        message.error('请将信息填写完整');
       }else{
           var data = {
            drugName,
            proMianPhoto,
            proNoticeTypes,
            proDescription,
            proOfficial,
            proCommodity,
            proPreferential,
            proPetStuff,
            proPlatform,
            proPrice,
            proFreight,
            productId,
            proUpDown,
            proStage,
            proQuality,
            spec,
            skuName
        } 
        this.setState({Loading:true})
        var res = await http.post(url,data);
        this.setState({Loading:false})
        if(res.errcode===0){
            message.info('操作成功');
            this.props.history.push('/Admin/shoop/ShoopList')
        }   
       }
         
    }
    render(){
        const typeList = this.props.typeList.toJS();
        const shoopInfoImg = this.props.shoopInfoImg.toJS();
        var that = this;
        const props = {
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
                  that.props.uploadingImg(that,res.data.path,0);
                }
            }
            
          }
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
                  that.props.uploadingImg(that,res.data.path,1);
                }
            }
          }
        return (
            <Fragment>
                <Spin tip="Loading..." spinning={this.state.Loading}>
                    <Wrapper>
                        <div className="item_input">
                            <label htmlFor="">商品名称：</label>
                            <Input placeholder="请输入商品名称" value={this.state.drugName} className="inputValues" onChange={this.inputValue.bind(this,'drugName')}/>
                        </div>
                        <div className="item_input">
                            <label htmlFor="">商品规格：</label>
                            <Input placeholder="请输入商品规格" disabled value={this.state.spec} className="inputValues" />
                        </div>
                        <div className="item_input">
                            <label htmlFor="">商品库存：</label>
                            <Input placeholder="请输入商品库存" disabled value={this.state.quantity} className="inputValues" />
                        </div>
                        <div className="item_input">
                            <label htmlFor="">宠物类型：</label>
                            <Select className="inputValues" defaultValue={this.state.proPetStuff}  value={this.state.proPetStuff}   placeholder="请选择" onChange={this.inputValue.bind(this,'proPetStuff')}>
                                {
                                typeList.b.map((item,index)=>{
                                        return (
                                            <Option value={item.type} key={index}>{item.typeName}</Option>
                                        )
                                })
                                }
                            </Select>
                        </div>
                        <div className="item_input">
                            <label htmlFor="">商品分类：</label>
                            <Select className="inputValues" defaultValue={this.state.proOfficial} value={this.state.proOfficial}  placeholder="请选择" onChange={this.inputValue.bind(this,'proOfficial')}>
                                {
                                    typeList.a.map((item,index)=>{
                                        return (
                                            <Option value={item.type} key={index}>{item.typeName}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </div>
                        <div className="item_input">
                            <label htmlFor="">商品品牌：</label>
                            <Select className="inputValues" defaultValue={this.state.proCommodity} value={this.state.proCommodity}  placeholder="请选择" onChange={this.inputValue.bind(this,'proCommodity')}>
                                {
                                typeList.c.map((item,index)=>{
                                        return (
                                            <Option value={item.type} key={index}>{item.typeName}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </div>   
                        <div className="item_input">
                            <label htmlFor="">商品价格：</label>
                            <Input placeholder="请输入商品价格" className="inputValues" value={this.state.proPlatform} onChange={this.inputValue.bind(this,'proPlatform')} />
                        </div>
                        <div className="item_input">
                            <label htmlFor="">零售价格：</label>
                            <Input placeholder="请输入零售价格" value={this.state.proPrice} className="inputValues" onChange={this.inputValue.bind(this,'proPrice')} />
                        </div>
                        <div className="item_input">
                            <label htmlFor="">商品运费：</label>
                            <Input placeholder="请输入运费价格" value={this.state.proFreight} className="inputValues" onChange={this.inputValue.bind(this,'proFreight')}/>
                        </div>
                        <div className="item_input">
                            <label htmlFor="">适用阶段：</label>
                            <Input placeholder="请输入宠物适用阶段" className="inputValues" onChange={this.inputValue.bind(this,'proStage')} value={this.state.proStage}/>
                        </div>
                        <div className="item_input">
                            <label htmlFor="">保质期限：</label>
                            <Input placeholder="请输入商品保质期"  value={this.state.proQuality} className="inputValues" onChange={this.inputValue.bind(this,'proQuality')}/>
                        </div>
                        <div className="item_input">
                            <label htmlFor="">优惠促销：</label>
                            <Select className="inputValues" defaultValue={this.state.proPreferential} value={this.state.proPreferential} placeholder="请选择" onChange={this.inputValue.bind(this,'proPreferential')}>
                                {
                                    this.state.optionData.map((item,index)=>{
                                        return (
                                            <Option value={item.value} key={index}>{item.label}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </div>  
                        <div className="item_input">
                            <label htmlFor=""  className="lable_inp">商品描述：</label>
                            <TextArea rows={4} value={this.state.proDescription} placeholder="请输入商品描述" className="inputValues inputValues1" onChange={this.inputValue.bind(this,'proDescription')}/>
                        </div>
                        <div className="item_input">
                            <label htmlFor="">商品种类：</label>
                            <Input placeholder="如果有多个种类请用 “ / ” 符号隔开"  value={this.state.skuInfo} className="inputValues" onChange={this.inputValue.bind(this,'skuInfo')}/>
                        </div>
                        <div className="item_input">
                            <label htmlFor="" className="lable_inp">商品主图<span className="mao">：</span><br/> <span className="lable_inp">上传：</span></label>
                            <div className="addImg">
                                <div className="info">
                                    <img src={imager.add} alt=""/>
                                    <p>上传图片</p>
                                </div>
                                <Upload className="file"  {...props} enctype="multipart/form-data">
                                    <Button className="btn">Upload</Button>
                                </Upload>
                            </div>
                            <div className="addImg">
                                {
                                    this.props.shoopImg===''?<img src={imager.tupian} alt="" className="meitu"/>:<img src={this.props.shoopImg} alt="" className="item_img"/>
                                }
                                {/* <img src={imager.cha} alt="" className="cha"/> */}
                            </div>
                        </div>
                        <div className="item_input">
                            <label htmlFor="" className="mao">商品描述：</label>
                            <div className="tishi">商品主图请上传宽高为1 : 1的图片</div>
                        </div>
                        <div className="item_input">
                            <label htmlFor="" className="lable_inp">商品详情<span className="mao">：</span><br/> <span className="lable_inp">图上传：</span></label>
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
                                shoopInfoImg.length>0?
                                shoopInfoImg.map((item,index)=>{
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
                        <div className="bottom">
                            <Button type="primary" className="button close" onClick={this.NosaveShoop.bind(this)}>取消</Button>
                            <Button type="primary" className="button" onClick={this.saveShoop.bind(this)}>保存</Button>
                        </div>
                    </Wrapper>
                </Spin>
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        //类型列表
        typeList:state.getIn(['addShoop','typeList']),
        //商品主图
        shoopImg:state.getIn(['addShoop','shoopImg']),
        //商品详情图
        shoopInfoImg:state.getIn(['addShoop','shoopInfoImg']),
        //商品信息
        ProductId:state.getIn(['addShoop','ProductId'])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        initializeImg(){
            var shoopImgAction = actionCreators.setShoopImg('');
                dispatch(shoopImgAction);
            var shoopInfoImgAction = actionCreators.setShoopInfoImg([]);
                dispatch(shoopInfoImgAction);
        },
        //查询商品类型
        async getTypelist(that){
            var url = 'goodstype/list';
            var data = {
                        
            }
            that.setState({Loading:true})
            var res = await http.post(url,data);
            that.setState({Loading:false})
            if(res.errcode === 0){
                var typeAction = actionCreators.setTypeList(res.data);
                dispatch(typeAction);
            }
        },
        //上传图片
        uploadingImg(that,path,type){
            if(type===0){
                var shoopImgAction = actionCreators.setShoopImg(path);
                dispatch(shoopImgAction);
            }else{
                var list = that.props.shoopInfoImg.toJS();
                list.push(path);
                var shoopInfoImgAction = actionCreators.setShoopInfoImg(list);
                dispatch(shoopInfoImgAction);
            }
        },
        //初始化图片
        infoImg(ShoopImg,ShoopInfoImg){
            var shoopImgAction = actionCreators.setShoopImg(ShoopImg);
                dispatch(shoopImgAction);
            var shoopInfoImgAction = actionCreators.setShoopInfoImg(ShoopInfoImg);
                dispatch(shoopInfoImgAction);
        },
        //删除图片
        delateImg(index){
            var list = this.props.shoopInfoImg.toJS();
            list.splice(index,1);
            var shoopInfoImgAction = actionCreators.setShoopInfoImg(list);
            dispatch(shoopInfoImgAction);
        },
        
    }
}
export default withRouter(connect(mapStateTopProps,mapDispatchToProps)(AddShoop))