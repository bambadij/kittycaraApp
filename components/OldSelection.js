import React, { useState,useRef,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

const OldSelection = ({ navigation }) => {
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
        onPress={handleNextPress}
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
