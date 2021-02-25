import React,{PureComponent,Fragment} from 'react';
import {connect} from 'react-redux';
import {  Menu } from 'antd';
import {Link,HashRouter} from 'react-router-dom';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router';
import { LeftMenuWorp } from './style';
  const { SubMenu } = Menu;
class LeftMenu extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            openKeys:'',
            selectedKeys:''
        }
    }
    componentDidMount() {
         // 如果不使用withRouter，这里打印信息是空的{}
        if(this.props.location.pathname) {
            var url 
            if(this.props.location.pathname==='/'){
                url = '/Admin/shoop/shoopList'
            }else{
                url = this.props.location.pathname
            }
            var openKeys=[]
            // var str =this.props.location.pathname
            openKeys.push(url.split('/')[2]);
            this.setState({
                openKeys:openKeys,
                selectedKeys:url.substring(6)
            })
        }
    }
    selectedKeys(e){
            var url = e.key
            var openKeys=[]
            openKeys.push(url.split('/')[1])
        this.setState({
            openKeys:openKeys,
            selectedKeys:e.key
        })
    }
    openKeys(e){
        var a = e[e.length-1];
        var openKeys=[]
        openKeys.push(a)
        this.setState({
            openKeys: openKeys
        })
    }
    render(){
        const { menuList,collapsed } = this.props;
        const Liist = menuList.toJS();
        return (
           <Fragment>
               <LeftMenuWorp>
               <Menu
                mode="inline"
                theme="light"
                inlineCollapsed={collapsed}
                className={ collapsed?'LeftHightToo':'LeftHight'}
                openKeys={this.state.openKeys}
                selectedKeys={[this.state.selectedKeys]}
                onClick={this.selectedKeys.bind(this)}
                onOpenChange={this.openKeys.bind(this)}
                >
                    {
                        Liist.map((item)=>{
                        return (
                                item.menuitem.length>0?
                                <SubMenu 
                                key={item.url}  
                                title={item.title} 
                                icon={React.createElement(item.icino)}
                                >
                                    {
                                         item.menuitem.map((items)=>{
                                             return (
                                                <Menu.Item key={items.url}>
                                                    <HashRouter basename="/Admin">
                                                        <Link to={items.url}>
                                                            {items.title}
                                                        </Link>
                                                    </HashRouter>
                                                </Menu.Item>
                                            )
                                         })
                                    }
                                </SubMenu>:<Menu.Item key={item.url}>
                                    <Link to={item.url}>
                                        {item.title}
                                    </Link>
                                </Menu.Item>
                        )
                        })
                    }
                    {/* <Menu
                    theme="dark" mode="inline" onClick={this.menuClick}  selectedKeys={this.state.selectedKeys}  openKeys={this.state.openKeys}
                >
                    {
                        this.props.menus.map((item) => {
                            return item.subs ? this.getParentMenu(item) : this.getChildrenMenu(item)
                        })
                    }
                </Menu> */}
                </Menu>
               </LeftMenuWorp>
           </Fragment> 
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        menuList:state.getIn(['leftMenu','menuList']),
        collapsed:state.getIn(['leftMenu','collapsed'])
        
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        a(e){
        }
    }
}
export default withRouter( connect(mapStateTopProps,mapDispatchToProps)(LeftMenu))