import React from 'react';
import {View, Text} from 'react-native';
import {Provider} from 'react-redux';
import {myStore} from './react-redux/Store';
import AppMain from './AppMain';

const App = () => {

  return (
    <Provider store={myStore}>
      <AppMain />
    </Provider>
  );
};

export default App;
