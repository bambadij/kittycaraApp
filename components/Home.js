import React, { useState, useRef,useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';

const { width } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const loadFonts = async () => {
    await Font.loadAsync({
      // 'Poppins-Bold': require('../assets/fonts/Playpen_Sans/static/Poppins-Bold-Bold.ttf'), // Assurez-vous que le chemin est correct
      'Poppins-Bold': require('../assets/fonts/SofadiOne-Regular.ttf'), // Assurez-vous que le chemin est correct
    });
    setFontsLoaded(true);
  };
 
  useEffect(() => {
    loadFonts();
  }, []);
 
  const pages = [
    {
      image: require('../assets/kittyhome3.png'),
      title: ' ',
      description: '',
    },
    {
      image: require('../assets/kittyhome2.png'),
      title: 'Let\'s get started! ',
      description: 'Confused by your menstrual symptoms? Kittycara will offer you immediate insights and practical advice taillored to your unique health needs.',
    },
    {
      image: require('../assets/cara/caraAI4remove.png'),
      title: 'Check your symptoms',
      description: 'Answer questions about your symptoms.The information you give is safe won\'t be shared.',
    },
    {
      image: require('../assets/cara/caraAI3rem.png'),
      title: 'Review possible causes',
      description: 'Uncover what may be causing your symptoms.',
    },
    {
      image: require('../assets/kittyhome.png'),
      title: "Choose what to do next",
      description: 'receive immediate insights and advice powered by cutting edge AI technology.',
    },
    
  ];

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newPage = Math.round(contentOffsetX / width);
    setCurrentPage(newPage);
  };

  const goToNextPage = () => {
    if (currentPage < pages.length - 1) {
      scrollViewRef.current.scrollTo({ x: (currentPage + 1) * width, animated: true });
      setCurrentPage(currentPage + 1);
    } else {
      navigation.navigate('Login');
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollViewRef}
      >
        {pages.map((page, index) => (
          <View key={index} style={styles.page}>
            <>
            <Image source={page.image} style={styles.stepImage} resizeMode="cover" />
            </>
            <>
            <Text style={styles.title1}>{page.title}</Text>
            </>
            <Text style={styles.description1}>{page.description}</Text>
            
            {index === pages.length - 1 && (
              <View style={styles.iconContainer}>
                <FontAwesome name="heartbeat" size={30} color="#353b8f" />
                <FontAwesome name="user-md" size={30} color="#353b8f" />
                <FontAwesome name="shield" size={30} color="#353b8f" />
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.paginationContainer}>
        {pages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              { backgroundColor: index === currentPage ? '#353b8f' : '#ccc' },
            ]}
          />
        ))}
      </View>
      {currentPage !== 0 && (        <>
      <TouchableOpacity  onPress={() => navigation.navigate('Register')} style={styles.nextButton}>
        <Text style={styles.nextButtonText}>sign up
          {/* {currentPage === pages.length - 1 ? 'Get Started' : 'sign up'} */}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity  onPress={() => navigation.navigate('Login')} style={styles.nextButton}>
        <Text style={styles.nextButtonText}>log in
          {/* {currentPage === pages.length - 1 ? 'Get Started' : 'log in'} */}
        </Text>
      </TouchableOpacity>
      </>
       )}
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#353b8f',
  },
  page: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  stepImage: {
    width: width * 0.8,
    height: width * 0.8,
    // marginBottom: 1,
  },
  title1: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 2,
    marginTop:-2,
    textAlign: 'center',
    color:'#FFF',

  },
  description1: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color:'#FFF',
    fontFamily: 'Poppins-Bold'

  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 17,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  paginationDot: {
    width: 10, 
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  nextButton: {
    backgroundColor: '#d6d5f7',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 15,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',

  },
  nextButtonText: {
    color: '#353b8f',
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
     fontFamily: 'Poppins-Bold'
    // fontWeight: 'bold',
  },
};

export default OnboardingScreen;