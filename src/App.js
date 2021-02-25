import React,{Component,Fragment} from 'react';
import './App.css';
import store from './store/index';
import { Provider } from 'react-redux';
import { HashRouter ,Route } from 'react-router-dom';
import Login from './common/login/login';
import Admin from './components/admin/admin';

class App extends Component{
  render() {
    return (
      <Fragment>
        <Provider store={store}>
            <HashRouter >
              {/* <div>  */}
                <Route path='/login' exact component={Login}></Route>
                <Route path='/Admin'   component={Admin}></Route>
                <Route path="/" exact component={Admin}/>
                
              {/* </div> */}
            </HashRouter >
        </Provider>
      </Fragment>
      
    )
  }
}

export default App;
