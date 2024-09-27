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
import * as Font from 'expo-font';
import {publicRequest, url} from '../RequestMethods';

const Register = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState(''); // email or phone
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loadFonts = async () => {
    await Font.loadAsync({ 
      'PlaypenSans': require('../assets/fonts/Playpen_Sans/PlaypenSans-VariableFont_wght.ttf'),
      'Poppins-Bold': require('../assets/fonts/SofadiOne-Regular.ttf'),
    });
  };

  useEffect(() => {
    loadFonts();
  }, []);

  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const onSubmitFormHandler = async () => {
    setIsLoading(true);

    // Check for password match
    if (password !== passwordConfirm) {
      setError("Passcode do not match.");
      setIsLoading(false);
      return;
    }

    // Check if email/phone and password are valid
    if (!name || password.length < 6) {
      setError("Please enter a valid username and passcode of at least 6 characters.");
      setIsLoading(false);
      return;
    }

    setError(''); // Reset error

    try {
      // Call the register API
      const response = await publicRequest.post('register', {
        phone: name.includes('@') ? '' : name,
        email: name.includes('@') ? name : '',
        password: password
      });
      console.warn('response',response);
      
      if (response.data.success) {
        // Navigate to TermsScreen after successful registration
        const userId = response.data.data.user.id;
        navigation.navigate('TermsScreen', { userId });
      } else {
        // Check if there is an error related to the email
        if (response.data.error) {
          let errorMessage = '';
      
          // Vérifier les erreurs pour l'email
          if (response.data.error.email) {
              errorMessage += response.data.error.email[0] + ' '; // Récupère le premier message d'erreur pour l'email
          }
      
          // Vérifier les erreurs pour le téléphone
          if (response.data.error.phone) {
              errorMessage += response.data.error.phone[0] + ' '; // Récupère le premier message d'erreur pour le téléphone
          }
      
          // Si des messages d'erreur ont été accumulés, les définir
          if (errorMessage) {
              setError(errorMessage.trim()); // Met à jour l'état avec les messages d'erreur concaténés
          }
      }
       else {
          // console.warn('res error',response.data.error);
          setError(response.data.error);
          // setError('Registration failed.');
        }
      }
    } catch (err) {
      console.error('error', err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <Text style={styles.description}>
        Sign up with a username and passcode
      </Text>
      <View style={styles.form}>
        <Text style={styles.registerText}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Type email or phone"
          autoCompleteType="name"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
        />

        <Text style={styles.registerText}>Passcode (min. 6 characters)</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Set a passcode"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <MaterialIcons name={showPassword ? "visibility-off" : "visibility"} size={24} color="#6e6e6e" />
          </TouchableOpacity>
        </View>

        <Text style={styles.registerText}>Confirm Passcode</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm passcode"
            secureTextEntry={!showPasswordConfirm}
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
          />
          <TouchableOpacity onPress={togglePasswordConfirmVisibility} style={styles.eyeIcon}>
            <MaterialIcons name={showPasswordConfirm ? "visibility-off" : "visibility"} size={24} color="#6e6e6e" />
          </TouchableOpacity>
        </View>

        {/* Display error message if any */}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#DADAE6', borderColor: '#353b8f' }]}
          onPress={onSubmitFormHandler}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#353b8f" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerText}>
            <Text style={{ color: '#000', fontFamily: 'Poppins-Bold' }}>Already have an account? </Text>
            <Text style={{ color: 'red', fontFamily: 'Poppins-Bold' }}>log in</Text>
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
