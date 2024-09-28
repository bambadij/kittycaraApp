import React, { useState, useRef,useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import * as Font from 'expo-font';
import axios from 'axios';
import { ActivityIndicator } from 'react-native-paper';

const ChatPage = ({navigation,route}) => {
  const {userId} =route.params
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
 
  
  
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [messages, setMessages] = useState([]);

  const loadFonts = async () => {
    await Font.loadAsync({ 
      'PlaypenSans': require('../assets/fonts/Playpen_Sans/PlaypenSans-VariableFont_wght.ttf'),
      'Poppins-Bold': require('../assets/fonts/SofadiOne-Regular.ttf'),
    });
    setFontsLoaded(true);
  };
  useEffect(() => {
    loadFonts();
    // Set initial messages when the component mounts
    setMessages([
      { id: 1, type: 'in', message: `Hello ! \nI'm Kittycara Your friendly menstrual health assistant.` },
      // { id: 2, type: 'out', message: '' },
    ]);
  }, []);


  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;
    setLoading(true);

    const userMessage = { id: Date.now(), type: 'out', message: newMessage };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      // Send the message to your API
      const response = await axios.post('https://bambadij-apikittycara.hf.space/analyze', {
        message: newMessage,
      });

      const apiResponse = response.data.response;  // Get the response from the API
      const botMessage = { id: Date.now() + 1, type: 'in', message: apiResponse };
      // animateBotResponse(apiResponse);

      // Add the bot's response to the messages list
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { id: Date.now() + 1, type: 'in', message: 'Sorry, something went wrong.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setNewMessage('');
    setLoading(false);
  };
  const animateBotResponse = (message) => {
    const words = message.split(' '); // Split the message into words
    let currentWordIndex = 0;
    setDisplayedMessage(''); // Clear previous message
    setCurrentMessageIndex(messages.length); // Set the current message index for tracking

    const interval = setInterval(() => {
      if (currentWordIndex < words.length) {
        setDisplayedMessage((prev) => prev + words[currentWordIndex] + ' ');
        currentWordIndex++;
      } else {
        clearInterval(interval);
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now() + 1, type: 'in', message }, // Once the message is fully displayed, add it to the list
        ]);
      }
    }, 1000); // Delay of 100ms between each word
  };
  const renderItem = ({ item}) => {
    const inMessage = item.type === 'in';
    const itemStyle = inMessage ? styles.itemIn : styles.itemOut;
    console.log(item.message);
    

    return (
      <View style={[styles.item, itemStyle]}>
        <View style={styles.balloon}>
        <Text style={inMessage ? styles.inMessageText : styles.outMessageText}>
        {item.message}

          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Messages list */}
      <FlatList
        style={styles.list}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListFooterComponent={loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : null}
      />

      {/* Message input */}
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Start conversation..."
            underlineColorAndroid="transparent"
            onChangeText={setNewMessage}
            value={newMessage}
          />
        </View>
        <TouchableOpacity style={styles.btnSend} onPress={handleSendMessage} disabled={loading}>
          <Image
            source={{ uri: 'https://img.icons8.com/small/75/ffffff/filled-sent.png' }}
            style={styles.iconSend}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DADAE6',
  },
  list: {
    paddingHorizontal: 17,
    
  },
  footer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#353b8f',
    paddingHorizontal: 10,
    padding: 5,
  },
  btnSend: {
    backgroundColor: '#353b8f',
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  inputs: {
    height: 40,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    fontFamily: 'Poppins-Bold',

  },
  item: {
    marginVertical: 10,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    fontFamily: 'Poppins-Bold',

  },
  itemIn: {
    alignSelf: 'flex-start',
    backgroundColor: '#6677CC',
    fontFamily: 'Poppins-Bold',

  },
  inMessageText: { fontFamily: 'Poppins-Bold', fontSize: 16 }, // Apply Poppins-Bold to incoming messages
  outMessageText: { fontFamily: 'Poppins-Bold', fontSize: 16 }, // Apply Poppins-Bold to outgoing messages
  itemOut: {
    alignSelf: 'flex-end',
    backgroundColor: '#f1f0f0',
    fontFamily: 'Poppins-Bold',

  },
  balloon: {
    maxWidth: 250,
    padding: 10,
    borderRadius: 10,
    fontFamily: 'Poppins-Bold',

  },
  loaderContainer: { alignItems: 'center', padding: 10 },

});

export default ChatPage;
