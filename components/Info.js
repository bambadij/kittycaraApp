import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Dimensions,Image
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker'; // Assurez-vous d'avoir installé ce package

const Info = ({ navigation, onSwitch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [country, setCountry] = useState('');


  const onSubmitFormHandler = async () => {
    // Validation logic
    if (!checkedTerms || !checkedPrivacy) {
      setError("You must accept the terms and conditions to continue.");
      return;
    }
    if (!name || !age || !sex) {
      setError("Please fill in all the required fields.");
      return;
    }
    setError(''); // Reset the error if everything is fine
    // Additional sign-up logic...
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
          <Image 
        source={require('../assets/cat.png')} // Replace with the actual path of your logo image
        style={styles.logo}
      />
      {/* <Text style={styles.title}>Information</Text> */}

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={sex}
          style={styles.picker}
          onValueChange={(itemValue) => setSex(itemValue)}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="country"
        value={country}
        onChangeText={setCountry}
      />
      <View style={styles.form}>
        {/* {error ? <Text style={styles.error}>{error}</Text> : null} */}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#DADAE6' }]}
        //   onPress={onSubmitFormHandler}
          onPress={() => navigation.navigate('ChatPage')}
        //   disabled={isLoading || !checkedTerms || !checkedPrivacy}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Complete Now</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={onSwitch}>
          <Text style={styles.footerText}>

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
    backgroundColor: '#353b8f',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'#DADAE6'

  },
  logo: {
    width: 100, // Set the desired width of the logo
    height: 100, // Set the desired height of the logo
    marginBottom: 2, // Adds space between the logo and the title
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#DADAE6',
    paddingLeft: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  pickerContainer: {
    width: '80%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#DADAE6',
    borderRadius: 10,
  },
  picker: {
    width: '100%',
    height: 50,
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
    borderRadius: 10,
    fontSize: 16,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#353b8f',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#353b8f',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 16,
  },
  footerText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
});

export default Info;
