import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';

export default function App() {

  const [option, setOption] = useState('');
  const [location, setLocation] = useState('');
  
  const showFoodBanksHandler = (inputLocation, selectedOption) => {
    setLocation(inputLocation);
    setOption(selectedOption);
  };

  console.log(option);
  console.log(location);

  let content = <HomeScreen onStart={showFoodBanksHandler}/>;

  if (option === 'donate') {
    console.log('donate!');
  }
  else if (option === 'find') {
    console.log('find resources!');
  }

  return (
    <View style={styles.screen}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#65c1f0'
  },
});
