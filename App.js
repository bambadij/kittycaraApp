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
import NameSelection from './components/NameSelection';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const loadFonts = async () => {
    await Font.loadAsync({
      'PlaypenSans': require('./assets/fonts/Playpen_Sans/PlaypenSans-VariableFont_wght.ttf'), // Assurez-vous que le chemin est correct
      'Poppins-Bold': require('./assets/fonts/SofadiOne-Regular.ttf'), // Assurez-vous que le chemin est correct
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);
  return (
    // <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
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
