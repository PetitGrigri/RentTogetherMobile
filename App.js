import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import mainReducer from './reducers/mainReducer';
import MainNavigator from './navigation/MainNavigator';
import 'intl';
import 'intl/locale-data/jsonp/fr';
import { Font } from 'expo';

//création du store redux
const store = createStore(
  mainReducer,
  applyMiddleware(
      thunkMiddleware,    //permet d'avoir de propager de dispatcher des fonctions
      //logger,             //permet d'avoir un reporting de ce qu'il se passe 
  )
);


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fontLoaded:false, 
        }
    }

    /**
     * Au chargement de l'application on va charger les polices open-sans light et regular.
     * Ces dernières seront utilisées dans l'application
     */
    componentDidMount() {
        Font.loadAsync({
            'open-sans-light': require('./assets/fonts/Open_Sans/OpenSans-Light.ttf'),
            'open-sans-regular': require('./assets/fonts/Open_Sans/OpenSans-Regular.ttf'),
        }).then(() => {
            this.setState({fontLoaded: true});
        });
    }

    render() {
        return (
            this.state.fontLoaded
              ? <Provider store={store}>
                    <MainNavigator />
                </Provider>
              : null
        );
    }
}


export default App;