import React, { useState,useRef,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { publicRequest } from '../RequestMethods';

const OldSelection = ({ navigation,route }) => {
  const { userId1 } = route.params;
  console.warn('ok',userId1);
  
  const [isLoading, setIsLoading] = useState(false);
  const [age, setAge] = useState('');
  const [isAgeValid, setIsAgeValid] = useState(false);

  const handleAgeChange = (value) => {
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue) && numericValue > 0) {
      setAge(value);
      setIsAgeValid(true);
    } else {
      setAge(value);
      setIsAgeValid(false);
    }
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
  const onSubmitAge = async () => {
    if (isAgeValid) {
      setIsLoading(true);
    }

    try {
      // Appel à l'API pour mettre à jour le profil
      const response = await publicRequest.post(`update_profile/${userId1.id}`, {
        age:age,
        sex:userId1.selectedGender,
        name: userId1.name,
        terme_condition: userId1.terme_condition,
        agree: userId1.agree
      });
      // console.warn('update',response);
      
      if (response.data.success) {
        // Navigation vers l'écran suivant après la mise à jour
        const userId = response.data.data;
        console.warn('User regi', response.data);
        navigation.navigate('WelcomeScreen',{userId});
      } else {
        console.error('Erreur de mise à jour du profil');
      }
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleNextPress = () => {
    if (isAgeValid) {
      console.log('Age entered:', age);
      navigation.navigate('Login'); // Remplacez avec votre écran suivant
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How old are you?</Text>
      <TextInput
        style={styles.input}
        placeholder="years old"
        keyboardType="numeric"
        value={age}
        onChangeText={handleAgeChange}
      />

      {/* Bouton "Next" */}
      <TouchableOpacity
        style={[styles.nextButton, isAgeValid ? styles.activeButton : styles.inactiveButton]}
        onPress={onSubmitAge}
        disabled={!isAgeValid}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DADAE6',
  },
  title: {
    fontSize: 28,
    fontFamily: 'PlaypenSans', // Assurez-vous que cette police est bien chargée
    color: '#353b8f',
    marginBottom: 50,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#353b8f',
    borderWidth: 2,
    borderRadius: 25,
    paddingLeft: 15,
    fontSize: 18,
    fontFamily: 'PlaypenSans', // Assurez-vous que cette police est bien chargée
    marginBottom: 20,
  },
  nextButton: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 50,
  },
  activeButton: {
    backgroundColor: '#353b8f', // Le bouton devient violet quand l'âge est valide
  },
  inactiveButton: {
    backgroundColor: '#E0E0E0', // Le bouton est grisé quand l'âge est invalide
  },
  nextButtonText: {
    fontSize: 18,
    fontFamily: 'PlaypenSans', // Assurez-vous que cette police est bien chargée
    color: '#fff',
  },
});

export default OldSelection;
