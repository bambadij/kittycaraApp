import React, { useState ,useRef,useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';
import * as Font from 'expo-font';

const Register = ({ navigation, onSwitch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [error, setError] = useState('');
  const [checkedTerms, setCheckedTerms] = useState(false);
  const [checkedPrivacy, setCheckedPrivacy] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
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
  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const onSubmitFormHandler = async () => {
    // Votre logique d'inscription existante ici
    if (!checkedTerms || !checkedPrivacy) {
      setError("Vous devez accepter les termes et conditions pour continuer.");
      return;
    }
    setError(''); // Réinitialise l'erreur si tout est en règle
    // Autre logique d'inscription...

  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <Text style={styles.description}>
        Sign up with a username and passcode
      </Text>
      <View style={styles.form}>
      <Text style={styles.registerText}>
        username
      </Text>
        <TextInput
          style={styles.input}
          placeholder="type username"
          autoCompleteType="name"
          value={name}
          onChangeText={setName}
          secureTextEntry={true}

        />
        <Text style={styles.registerText}>
          username must be at leaast 6 characters
        </Text>
        <View style={styles.passwordContainer}>
        
          <TextInput
            style={styles.passwordInput}
            placeholder="set a passcode"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <MaterialIcons name={showPassword ? "visibility-off" : "visibility"} size={24} color="#6e6e6e" />
          </TouchableOpacity>
        </View>
        <Text style={styles.registerText}>
          username must be at leaast 6 characters
        </Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="confirm passcode"
            secureTextEntry={!showPasswordConfirm}
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
          />
          <TouchableOpacity onPress={togglePasswordConfirmVisibility} style={styles.eyeIcon}>
            <MaterialIcons name={showPasswordConfirm ? "visibility-off" : "visibility"} size={24} color="#6e6e6e" />
          </TouchableOpacity>
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#DADAE6' ,borderColor:'#353b8f', fontFamily: 'Poppins-Bold'}]}
          onPress={() => navigation.navigate('TermsScreen')}
          // disabled={isLoading || !checkedTerms || !checkedPrivacy}
        >
          {isLoading ? (
            <ActivityIndicator color="#353b8f" />
          ) : (
            <Text style={styles.buttonText}>sign up</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerText}>
            <Text style={{ color: '#000',    fontFamily: 'Poppins-Bold' }}>Already have an account? </Text>
            <Text style={{ color: 'red', fontFamily: 'Poppins-Bold' }}>Sign In</Text>
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
    fontSize: 20,
    // fontWeight: 'bold',
    marginBottom: 5,
    color:'#353b8f',
    fontFamily: 'Poppins-Bold', // Utiliser la même police personnalisée

  },
  description: {
    fontSize: 12,
    marginBottom: 15,
    textAlign: 'center',
    color:'#000',
    fontFamily: 'Poppins-Bold', // Utiliser la même police personnalisée


  },
  bullet: {
    fontSize: 12,
    marginBottom: 4,
    textAlign: 'center',
    color:'#353b8f'

  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
    color:'#0000'

  },
  label: {
    fontSize: 12,
    marginLeft: 8,
    color:'#353b8f'

  },
  form: {
    width: '100%',
    alignItems: 'center',
    color:'#353b8f'

  },
   registerText: {
    marginTop: 2,
    fontSize: 12,
    paddingBottom:6,
    fontFamily: 'Poppins-Bold', // Utiliser la même police personnalisée

    // fontWeight: 'normal',
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
    fontFamily: 'Poppins-Bold', // Utiliser la même police personnalisée


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
    fontFamily: 'Poppins-Bold', // Utiliser la même police personnalisée

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
    paddingBottom:3,
    fontFamily: 'Poppins-Bold', // Utiliser la même police personnalisée

  },
  buttonText: {
    color: '#353b8f',
    fontSize: 18,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Bold', // Utiliser la même police personnalisée

  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 16,
  },
});

export default Register;
