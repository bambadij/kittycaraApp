import React, { useState ,useRef,useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

const GenderSelection = ({ navigation }) => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };
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
    // Navigation logic or action when the "Next" button is pressed
    if (selectedGender) {
      // Par exemple, naviguer vers une autre page
      console.log('Selected Gender:', selectedGender);
      navigation.navigate('OldSelection'); // Si vous utilisez react-navigation
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What is your sex?</Text>
      <TouchableOpacity
        style={[
          styles.genderButton,
          selectedGender === 'female' && styles.selectedButton,
        ]}
        onPress={() => handleGenderSelect('female')}
      >
        <Text style={styles.genderText}>female</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.genderButton,
          selectedGender === 'male' && styles.selectedButton,
        ]}
        onPress={() => handleGenderSelect('male')}
      >
        <Text style={styles.genderText}>male</Text>
      </TouchableOpacity>

      {/* Bouton "Next" */}
      <TouchableOpacity
        style={[styles.nextButton, selectedGender ? styles.activeButton : styles.inactiveButton]}
        onPress={handleNextPress}
        disabled={!selectedGender} // Désactive le bouton si aucun sexe n'est sélectionné
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
    fontSize: 30,
    fontFamily: 'Poppins-Bold', // Assurez-vous que cette police est bien chargée
    color: '#353b8f',
    marginBottom: 50,
  },
  genderButton: {
    width: '80%',
    height: 50,
    borderColor: '#353b8f',
    borderWidth: 2,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedButton: {
    backgroundColor: '#353b8f',
  },
  genderText: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#000',
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
    backgroundColor: '#353b8f', // Le bouton devient violet quand une sélection est faite
  },
  inactiveButton: {
    backgroundColor: '#E0E0E0', // Le bouton est grisé quand aucune sélection n'est faite
  },
  nextButtonText: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#DADAE6',
  },
});

export default GenderSelection;
