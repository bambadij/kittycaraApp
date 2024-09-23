import React, { useState, useRef,useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import * as Font from 'expo-font';

const ChatPage = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'in', message: 'Hello! How are you?' },
    { id: 2, type: 'out', message: 'I am good, thank you!' },
  ]);
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
  const [newMessage, setNewMessage] = useState('');

  const renderItem = ({ item }) => {
    const inMessage = item.type === 'in';
    const itemStyle = inMessage ? styles.itemIn : styles.itemOut;

    return (
      <View style={[styles.item, itemStyle]}>
        <View style={styles.balloon}>
          <Text>{item.message}</Text>
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
        <TouchableOpacity style={styles.btnSend} onPress={() => console.log('Send Message')}>
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
  },
  item: {
    marginVertical: 10,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
  },
  itemIn: {
    alignSelf: 'flex-start',
    backgroundColor: '#6677CC',
  },
  itemOut: {
    alignSelf: 'flex-end',
    backgroundColor: '#f1f0f0',
  },
  balloon: {
    maxWidth: 250,
    padding: 10,
    borderRadius: 10,
  },
});

export default ChatPage;
