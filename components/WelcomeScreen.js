import React, { useState, useRef,useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';

const WelcomeScreen = ({ navigation }) => {
  // Charger les polices personnalisées si nécessaire
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
    <View style={styles.background}>
      <View style={styles.container}>
        {/* Conteneur pour aligner le logo et le titre horizontalement */}
        <View style={styles.headerContainer}>
          {/* Image du logo Kittycara */}
          <Image 
            source={require('../assets/cat.png')} // Remplacez par votre image du chat
            style={styles.logo}
          />
          {/* Titre */}
          <Text style={styles.title}>Hi, {"\n"} I'm kittycara</Text>
        </View>

        <Text style={styles.description}>
          I can help you learn more about your menstrual health in 3 easy steps:
        </Text>
        <View style={styles.stepsContainer}>
            <View style={styles.stepRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.step}>describe your symptoms</Text>
            </View>
            <View style={styles.stepRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.step}>answer targeted questions</Text>
            </View>
            <View style={styles.stepRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.step}>receive instant health insights</Text>
            </View>
            </View>
        {/* Bouton Start Interview */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('ChatPage')}
        >
          <Text style={styles.buttonText}>start interview</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#353b8f',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Conteneur pour aligner le logo et le titre horizontalement
  headerContainer: {
    flexDirection: 'row', // Aligner les éléments horizontalement
    alignItems: 'center', // Aligner les éléments verticalement au centre
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 125,
    marginRight: 10, // Ajouter un espace entre le logo et le titre
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'left', // Aligner le texte à gauche
  },
  description: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },
  stepsContainer: {
    marginBottom: 50,
    alignItems: 'flex-start', // Pour aligner le texte à gauche
  },
  stepRow: {
    flexDirection: 'row', // Aligner la puce et le texte sur une ligne
    alignItems: 'center', // Aligner verticalement la puce et le texte
    marginBottom: 10,
  },
  bullet: {
    fontSize: 18, // Taille de la puce
    color: 'white',
    marginRight: 10, // Espace entre la puce et le texte
  },
  step: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: 'white',
    textAlign: 'left', // Alignement du texte à gauche
  },
  button: {
    backgroundColor: '#D0C7F6',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#5E5CE6',
  },
});

export default WelcomeScreen;
