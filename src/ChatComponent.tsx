import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import io from 'socket.io-client';

const ChatComponent = () => {
  const [messages, setMessages] = useState<{ id: number, text: string }[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const socket = io('http://192.168.0.24:3000');

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, { id: Date.now(), text: msg }]);
    });

    return () => {
      socket.disconnect(); 
    };
  }, []);

  const sendMessage = () => {
    socket.emit('chat message', inputMessage); 
    setInputMessage(''); 
  };

  return (
    <View>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Text>{item.text}</Text>}
        keyExtractor={(item) => item.id.toString()}
      />
      <TextInput
        value={inputMessage}
        onChangeText={(text) => setInputMessage(text)}
        placeholder="Enter message"
        style={{ borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default ChatComponent;