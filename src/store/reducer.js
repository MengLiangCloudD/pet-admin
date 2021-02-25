//整合
import { combineReducers } from 'redux-immutable';
import {reducer as login} from './../common/login/store/index';
import {reducer as hearder} from './../common/hearder/store/index';
import {reducer as leftMenu} from './../common/leftMenu/store/index';
import {reducer as shoopList} from './../components/content/shoopAdmin/shoopList/store/index';
import {reducer as consultInfor} from './../components/content/consultList/consultInfor/store/index';
import {reducer as shoopOrder} from './../components/content/orderAdmin/shoopOrder/store/index';
import {reducer as addShoop} from './../components/content/shoopAdmin/addShoop/store/index';
import {reducer as newshistory} from './../components/content/newsPush/newshistory/store/index';
import {reducer as visitList} from './../components/content/CrmAdmin/visitList/store/index';
import {reducer as addVisit} from './../components/content/CrmAdmin/addVisit/store/index';
import {reducer as hosAdmin} from '../components/content/hosAdmin/hoslist/store/index';
import {reducer as submitHosInfo} from '../components/content/hosAdmin/submitHosInfo/store/index';
import {reducer as hosDateInfo} from '../components/content/hosAdmin/hosDateInfo/store/index';
import {reducer as shoopType} from '../components/content/shoopAdmin/shoopType/store/index';

//redux-immutable
const reducer= combineReducers({
    login:login,
    hearder:hearder,
    leftMenu:leftMenu,
    shoopList:shoopList,
    consultInfor:consultInfor,
    shoopOrder:shoopOrder,
    addShoop:addShoop,
    newshistory:newshistory,
    visitList:visitList,
    addVisit:addVisit,
    hosAdmin:hosAdmin,
    submitHosInfo:submitHosInfo,
    hosDateInfo:hosDateInfo,
    shoopType:shoopType
})
export default reducer