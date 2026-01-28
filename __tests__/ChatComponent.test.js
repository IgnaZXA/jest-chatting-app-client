import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ChatComponent from '../src/ChatComponent';
import io from 'socket.io-client';

jest.mock('socket.io-client'); 

let socket;

beforeEach(() => {
  socket = {
    on: jest.fn(),
    emit: jest.fn(),
    disconnect: jest.fn(),
  };
  io.mockReturnValue(socket); // Simulate socket client connection
});

test('should display messages from the server and send messages', () => {
  // Simulate the server sending a message
  socket.on.mockImplementation((event, callback) => {
    if (event === 'chat message') {
      callback('Hello from Kaotika socket server!');
    }
  });

  
  const { getByPlaceholderText, getByText } = render(<ChatComponent />);


  // Verify that the server message is displayed on the interface
  expect(getByText('Hello from Kaotika socket server!')).toBeTruthy();

  // Simulate message entry
  const input = getByPlaceholderText('Enter message');
  fireEvent.changeText(input, 'Hello from Ancient Hall of Sages!');
  fireEvent.press(getByText('Send'));

  // Verify that the message was sent to the server
  expect(socket.emit).toHaveBeenCalledWith('chat message', 'Hello from Ancient Hall of Sages!');
});