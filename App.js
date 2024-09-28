import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  Toast from 'react-native-toast-message';
import Register from './components/Register';
import Login from './components/Login';
import Info from './components/Info';
import ChatPage from './components/ChatPage';
import TermsScreen from './components/TermsScreen';
import * as Font from 'expo-font';
import GenderSelection from './components/GenderSelection';
import OldSelection from './components/OldSelection';
import WelcomeScreen from './components/WelcomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { publicRequest } from './RequestMethods';
import NameSelection from './components/NameSelection';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [initialRoute, setInitialRoute] = useState('Home'); // Set default initial route
  let token = AsyncStorage.getItem('Token');

  console.log('token',token);
  
  const loadFonts = async () => {
    await Font.loadAsync({
      'PlaypenSans': require('./assets/fonts/Playpen_Sans/PlaypenSans-VariableFont_wght.ttf'), // Assurez-vous que le chemin est correct
      'Poppins-Bold': require('./assets/fonts/SofadiOne-Regular.ttf'), // Assurez-vous que le chemin est correct
    });
    setFontsLoaded(true);
  };
  const checkUserStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        // No token found, navigate to Login
        setInitialRoute('Home');
        return;
      }

      // If token exists, fetch user data
      const response = await publicRequest.get('get_user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = response.data.data;
      if (!user.terme_condition) {
        setInitialRoute('TermsScreen', { userId: user.id });
      }else if(!user.agree){
        setInitialRoute('TermsScreen', { userId: user.id });
      } else if (!user.age) {
        setInitialRoute('OldSelection', { userId: user });
      } else if (!user.sex) {
        setInitialRoute('GenderSelection', { userId: user });
      } else if (!user.name) {
        setInitialRoute('NameSelection', { userId: user });
      }else{
        setInitialRoute('WelcomeScreen', { userId: user });

      } 
    } catch (error) {
      console.error('Error fetching user data', error);
      setInitialRoute('Login'); // On error, navigate to Login
    }
  };

  useEffect(() => {
    loadFonts();
    checkUserStatus();
  }, []);
  return (
    // <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{
            headerStyle: {
              backgroundColor: '#353b8f',
            },
            headerTintColor: '#FFF',
            headerBackTitle: 'Back',
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen 
           options={{ title: '', animation: 'slide_from_bottom' }}
          name="Home" component={Home} />
          <Stack.Screen 
           options={{ title: '', animation: 'slide_from_bottom' }}
          name="Login" component={Login}  />
           <Stack.Screen 
           options={{ title: '', animation: 'slide_from_bottom' }}
          name="Register" component={Register}  />
          <Stack.Screen 
           options={{ title: 'Information', animation: 'slide_from_bottom' }}
          name="Info" component={Info} />
            <Stack.Screen 
           options={{ title: '', animation: 'slide_from_bottom' }}
          name="ChatPage" component={ChatPage} />
          <Stack.Screen
            options={{ title: 'Terms ', animation: 'slide_from_bottom' }}
            name="TermsScreen"
            component={TermsScreen}
          />
          <Stack.Screen
            options={{ title: '', animation: 'slide_from_bottom' }}
            name="GenderSelection"
            component={GenderSelection}
          />
               <Stack.Screen
            options={{ title: '', animation: 'slide_from_bottom' }}
            name="OldSelection"
            component={OldSelection}
          />
           <Stack.Screen
            options={{ title: '', animation: 'slide_from_bottom' }}
            name="WelcomeScreen"
            component={WelcomeScreen}
          />
           <Stack.Screen
            options={{ title: '', animation: 'slide_from_bottom' }}
            name="NameSelection"
            component={NameSelection}
          />
        </Stack.Navigator>
        <Toast/>
      </NavigationContainer>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
