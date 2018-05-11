import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import mainReducer from './reducers/mainReducer';
import styles from './styles/styles';

//création du store redux
const store = createStore(
  mainReducer,
  applyMiddleware(
      thunkMiddleware,    //permet d'avoir de propager de dispatcher des fonctions
      logger,             //permet d'avoir un reporting de ce qu'il se passe 
      
  )
);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Text>Hello Rent Together</Text>
        </View>
      </Provider>
    );
  }
}


export default App;