import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import mainReducer from './reducers/mainReducer';
import { NativeRouter, Route, Link, Switch, BackButton} from 'react-router-native'
import Login from './screens/Login';
import Register from './screens/Register';
import MainNavigator from './navigation/MainNavigator';
import 'intl';
import 'intl/locale-data/jsonp/fr';

//création du store redux
const store = createStore(
  mainReducer,
  applyMiddleware(
      thunkMiddleware,    //permet d'avoir de propager de dispatcher des fonctions
      //logger,             //permet d'avoir un reporting de ce qu'il se passe 
  )
);

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <MainNavigator />
            </Provider>
        );
    }
}


export default App;