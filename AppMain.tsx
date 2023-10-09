import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import SplashScreen from './components/SplashScreen';
import BookScreen from './components/BookScreen';
import axios from 'axios';
import {booksStore} from './react-redux/BookReducer';
import {useDispatch} from 'react-redux';

const Stack = createNativeStackNavigator();

const AppMain = () => {
  const [Time, setTime] = useState(true);
  const dispatch = useDispatch();

  const DataFetch = async () => {
    let response = await axios.get('https://books-list-api.vercel.app/books', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': '#b0@6hX8YasCq6^unOaPw1tqR',
      },
    });

    let newdata = response.data.data;
    newdata.map( (item:any) => {
      dispatch(booksStore(item));
    })

  };

  
  useEffect(() => {
    // DataFetch();
    setTimeout(() => {
      setTime(false);
    }, 3500);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {Time == true ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Book" component={BookScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppMain;
