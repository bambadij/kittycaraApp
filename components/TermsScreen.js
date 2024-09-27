import React, { useState,useRef,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Checkbox } from 'react-native-paper';
// import * as Linking from 'expo-linking';
import * as Font from 'expo-font';
import { publicRequest } from '../RequestMethods';

const TermsScreen = ({ navigation, route })  => {
  const { userId } = route.params;
  
  const [checkedTerms, setCheckedTerms] = useState(false);
  const [checkedPrivacy, setCheckedPrivacy] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  const onSubmitTerms = async () => {
    setIsLoading(true);

    try {
      // Appel à l'API pour mettre à jour le profil
      const response = await publicRequest.post(`update_profile/${userId}`, {
        terme_condition: checkedTerms,
        agree: checkedPrivacy
      });
      console.warn('update',response);
      
      if (response.data.success) {
        // Navigation vers l'écran suivant après la mise à jour
        const userId1 = response.data.data;
        // console.warn('User registered successfully', response.data);
        navigation.navigate('NameSelection',{userId1});
      } else {
        console.error('Erreur de mise à jour du profil');
      }
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Confirm you're ready</Text>
      
      <Text style={styles.instructions}>
        Please accept the <Text style={styles.link} onPress={() => navigation.navigate('https://kittycara.kansafrica.com/terme')}>Terms of Service</Text>{' '}
        and <Text style={styles.link} onPress={() => navigation.navigate('https://kittycara.kansafrica.com/agree')}>Privacy Policy</Text>. Please note:
      </Text>

      <Text style={styles.bullet}>
        ● This app is not intended to substitute for professional medical advice, diagnosis or treatment. Always consult a professional before taking any actions.
      </Text>
      <Text style={styles.bullet}>
        ● Do not use it in case of an emergency. Ask for help from your family and friends or call your local emergency number right away when there's a health emergency.
      </Text>
      <Text style={styles.bullet}>
        ● Your data is safe. The information you give won’t be shared or used to identify you.
      </Text>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={checkedTerms ? 'checked' : 'unchecked'}
          onPress={() => setCheckedTerms(!checkedTerms)}
          color="#000"
        />
        <Text style={styles.checkboxLabel}>I have read and accept the Terms of Service.</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={checkedPrivacy ? 'checked' : 'unchecked'}
          onPress={() => setCheckedPrivacy(!checkedPrivacy)}
          color="#000"
        />
        <Text style={styles.checkboxLabel}>I agree for my health information to be used for the interview.</Text>
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={onSubmitTerms} disabled={isLoading}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#DADAE6',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold', // Assurez-vous que la police est chargée
    color: '#353b8f',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
    marginBottom: 20,
    fontFamily: 'Poppins-Bold', // Utiliser la même police personnalisée

  },
  link: {
    color: '#353b8f',
    // textDecorationLine: 'underline',
  },
  bullet: {
    fontSize: 11,
    color: '#000',
    textAlign: 'left',
    marginBottom: 1,
    width: '90%',
    fontFamily: 'Poppins-Bold', // Utiliser la même police personnalisée

  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    fontFamily: 'Poppins-Bold', // Utiliser la même police personnalisée

  },
  checkboxLabel: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Poppins-Bold', // Utiliser la même police personnalisée

  },
  nextButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#353b8f',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-Bold', // Utiliser la même police personnalisée
    // fontWeight: 'bold',
  },
  
});

export default TermsScreen;
