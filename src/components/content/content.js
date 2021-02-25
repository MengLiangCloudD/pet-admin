import React,{PureComponent,Fragment} from 'react';
import {connect} from 'react-redux';
// import './CrmAdmin/visitList/node_modules/antd/dist/antd.css';
import ShoopList from './shoopAdmin/shoopList/shoopList';
import AddShoop from './shoopAdmin/addShoop/addShoop';
import ConsultInfor from './consultList/consultInfor/consultInfor';
import ShoopOrder from './orderAdmin/shoopOrder/shoopOrder';
import ShoopType from './shoopAdmin/shoopType/shoopType';
import NewsList from './newsPush/newsList/newsList';
import Newshistory from './newsPush/newshistory/newshistory';
import VisitList from './CrmAdmin/visitList/visitList';
import AddVisit from './CrmAdmin/addVisit/addVisit';
import Hoslist from './hosAdmin/hoslist/hoslist.jsx';
import HosDateInfo from './hosAdmin/hosDateInfo/hosDateInfo.jsx';

import SubmitHosInfo from './hosAdmin/submitHosInfo/submitHosInfo.jsx';
import { withRouter } from 'react-router';
import { ContentWorp } from './style';
import { Route,Switch } from 'react-router-dom';
class Admin extends PureComponent{
    render(){
        return (
            <Fragment>
                <ContentWorp className={ this.props.collapsed?'LeftHightToo':'LeftHight'}>
                    <Switch>
                        <Route exact path='/Admin/shoop/ShoopList'  component={ShoopList}></Route>
                        <Route exact path='/Admin/shoop/AddShoop'  component={AddShoop}></Route>
                        <Route exact path='/Admin/order/user'  component={ShoopOrder}></Route>
                        <Route exact path='/Admin/shoop/category'  component={ShoopType}></Route>
                        <Route exact path='/Admin/consult/onlineConsultant'  component={ConsultInfor}></Route>
                        <Route exact path='/Admin/newsPush/newsList'  component={NewsList}></Route>
                        <Route exact path='/Admin/newsPush/newshistory'  component={Newshistory}></Route>
                        <Route exact path='/Admin/crm/visitList'  component={VisitList}></Route>
                        <Route exact path='/Admin/crm/addVisit'  component={AddVisit}></Route>
                        <Route exact path='/Admin/hosAdmin/hosList'  component={Hoslist}></Route>
                        <Route exact path='/Admin/hosAdmin/SubmitHosInfo'  component={SubmitHosInfo}></Route>
                        <Route exact path='/Admin/hosAdmin/HosDateInfo'  component={HosDateInfo}></Route>
                        
                    </Switch>
                </ContentWorp>
            </Fragment>
        )
    }
}
const mapStateTopProps = (state)=>{
    return {
        collapsed:state.getIn(['leftMenu','collapsed'])
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {

    }
}
export default withRouter(connect(mapStateTopProps,mapDispatchToProps)(Admin));