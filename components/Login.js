import React, { useState, useRef,useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image, // <-- Import the Image component
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';

const Login = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'PlaypenSans': require('../assets/fonts/Playpen_Sans/PlaypenSans-VariableFont_wght.ttf'), // Assurez-vous que le chemin est correct
      'Poppins-Bold': require('../assets/fonts/SofadiOne-Regular.ttf'), // Assurez-vous que le chemin est correct
    });
    setFontsLoaded(true);
  };
 
  useEffect(() => {
    loadFonts();
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.container}>
        {/* <Image 
        source={require('../assets/caty2.jpeg')} // Replace with the actual path of your logo image
        style={styles.logo}
      /> */}
      <Text style={styles.title}>Log in</Text>
      <Text style={styles.description}>
          Please Log in with the details you originally signed up with
      </Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="email ou phone"
          selectionColor="#a9a9a9"
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          color="black"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Passcode"
            selectionColor="#a9a9a9"
            underlineColorAndroid="transparent"
            color="black"
            secureTextEntry={true}
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.eyeIcon}>
            <MaterialIcons name="visibility-off" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('WelcomeScreen')} style={[styles.button, { backgroundColor: '#DADAE6',borderColor:'#353b8f' }]}>
          <Text style={styles.buttonText}>log in</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Reset')}>
          <Text style={styles.forgotText}>forgot passcode</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>
            <Text style={{ color: '#000' }}>Don't have an account? </Text>
            <Text style={{ color: 'red' }}>Sign up </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DADAE6',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    // fontWeight: 'bold',
    marginBottom: 20,
    color:'#353b8f',
     fontFamily: 'PlaypenSans'
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    // backgroundColor: '#DADAE6',
    paddingLeft: 15,
    borderRadius: 20,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1, // Ajoutez ceci
    borderColor:'#353b8f',
     fontFamily: 'PlaypenSans'

  },
  passwordContainer: {
    width: '80%',
    position: 'relative',
    marginBottom: 20,
  },
  passwordInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#DADAE6',
    paddingLeft: 15,
    borderRadius: 20,
    fontSize: 16,
    borderWidth: 1, // Ajoutez ceci
    borderColor:'#353b8f',
     fontFamily: 'PlaypenSans'
  },
  logo: {
    width: 100, // Set the desired width of the logo
    height: 100, // Set the desired height of the logo
    marginBottom: 2, // Adds space between the logo and the title
  },
  
  eyeIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1, // Ajoutez ceci
    marginTop: 20,
    paddingBottom:3
  },
  description: {
    fontSize: 12,
    marginBottom: 15,
    textAlign: 'center',
    color:'#000',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
     fontFamily: 'PlaypenSans'

  },
  buttonText: {
    color: '#353b8f',
    fontSize: 18,
    // fontWeight: 'bold',
     fontFamily: 'PlaypenSans'
  },
  forgotText: {
    color: '#353b8f',
    fontSize: 16,
    alignSelf: 'flex-end',
    marginTop: 10,
     fontFamily: 'PlaypenSans'
  },
  registerText: {
    marginTop: 20,
    fontSize: 16,
    // fontWeight: 'bold',
     fontFamily: 'PlaypenSans'
  },
});

export default Login;
