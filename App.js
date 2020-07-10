import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import FoodBanksScreen from './screens/FoodBanksScreen';
import DonateScreen from './screens/DonateScreen';
import FindResourcesScreen from './screens/FindResourcesScreen';

export default function App() {

  const [option, setOption] = useState('');
  const [location, setLocation] = useState('');
  const [goToHome, setGoToHome] = useState(false);
  const [goToList, setGoToList] = useState(false);
  const [goToInventory, setGoToInventory] = useState(false);
  
  const showFoodBanksHandler = (inputLocation, selectedOption) => {
    setLocation(inputLocation);
    setOption(selectedOption);
  };

  const goToHomeHandler = goHome => {
    setGoToHome(goHome);
  };

  const goToInventoryHandler = inventory => {
    setGoToInventory(inventory);
  };


  const goToListingHandler = list => {
    setGoToList(list);
  }; 

  let content = <HomeScreen onStart={showFoodBanksHandler} onGoToHome={goToHomeHandler}/>;

  if (goToHome) {
    content = <HomeScreen onStart={showFoodBanksHandler} onGoToHome={goToHomeHandler}/>;
  }
  else if ((option && location && !goToHome && !goToInventory) || goToList) {
    content = <FoodBanksScreen 
                onGoToHome={goToHomeHandler} 
                locationOfUser={location} 
                onGoToInv={goToInventoryHandler}
                onGoToList={goToListingHandler}
              />;
  }
  else if (goToInventory && option === 'donate' && !goToList){
    content = <DonateScreen onGoToList={goToListingHandler}/>;
  }
  else if (goToInventory && option === 'find' && !goToList){
    content = <FindResourcesScreen onGoToList={goToListingHandler}/>;
  }

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor='#10518f' style={styles.bar}/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#65c1f0'
  },
  bar: {
    marginBottom: 10
  }
});
