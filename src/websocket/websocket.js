let socket;
var lockReconnect = false;
var tt;
var a=0;
var _this;
export const webSocket=(identity,that)=>{
    if(that!==undefined){
        _this=that;
    }
    if(socket!==undefined){
        return
    }
    let timestamp = (new Date()).valueOf();
    socket= new WebSocket(`ws://8.131.244.230:8002?identity=${identity}&&random=${timestamp}`);
    // socket= new WebSocket(`ws://192.168.0.108:8002?identity=${identity}&&random=${timestamp}`);
    socket.onclose = function () {
        console.log('链接关闭');
        //关闭后重新连接
        if(a<10){
            reconnect();
        }
    };
    socket.onerror = function() {
        console.log('发生异常了');
        //出错后重新连接
        if(a<10){
            reconnect();
        }
    };
    socket.onopen = function () {
        //心跳检测重置
        console.log('成功');
        a=0
        heartCheck.start();
    };
    socket.onmessage = function (event) {
        // 将json字符串转换为对象
        console.log(event);
        if(event.data!=='成功'){
            var websocketMessage = event.data;
            _this.props.setList(_this, websocketMessage);
        }else{
            
        }
        heartCheck.start();
    };
    // window.onbeforeunload = function() {  
    //     //closeWebSocket();  
    //     websocket.close(); 
    // } 
    _this.props.setWebSocket(socket,_this)
    
    
}
//重新连接
function reconnect() {
    if(lockReconnect) {
      return;
    };
    lockReconnect = true;
    //没连接上会一直重连，设置延迟避免请求过多
    tt && clearTimeout(tt);
    tt = setTimeout(function () {
        webSocket(2);
      lockReconnect = false;
    }, 4000);
}
  //心跳检测
var heartCheck = {
    timeout: 210000,
    timeoutObj: null,
    serverTimeoutObj: null,
    start: function(){
        console.log(getNowTime() +" Socket 心跳检测");  
        var self = this;
        this.timeoutObj && clearTimeout(this.timeoutObj);
        this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
        this.timeoutObj = setTimeout(function(){
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            //onmessage拿到返回的心跳就说明连接正常
            console.log(getNowTime() +' Socket 连接重试');
            var json = {identity:'3',order_id:'0',content:'3',time:0,type:'0',value:0}
            socket.send(JSON.stringify(json));
            self.serverTimeoutObj = setTimeout(function() {
                console.log(socket);
                socket.close();
            }, self.timeout);
        }, this.timeout)
    }
} 
function getNowTime() {
    var myDate = new Date();
    //获取当前年
    var year = myDate.getFullYear();
    //获取当前月
    var month = myDate.getMonth() + 1;
    //获取当前日
    var date = myDate.getDate();
    var h = myDate.getHours();       //获取当前小时数(0-23)
    var m = myDate.getMinutes();     //获取当前分钟数(0-59)
    var s = myDate.getSeconds();
    return year + '-' + p(month) + "-" + p(date) + " " + p(h) + ':' + p(m) + ":" + p(s);
}
function p(obj){
    if(obj<10){
        return '0'+obj;
    }else{
        return obj
    }

}