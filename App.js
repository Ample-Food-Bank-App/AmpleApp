import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback} from 'react-native';
import getDistance from 'geolib/es/getDistance';

var myLong = 40.730610;
var myLat = -73.935242;

const FOODBANKS = [
  { 
    name: 'First United Methodist Church of Jamaica', 
    longitude: 40.636190, 
    latitude: -73.741430,
  },
  { 
    name: 'Bethel Mission Food Bank', 
    longitude: 40.695790, 
    latitude: -73.799280, 
  },
] 

const findDistance = () => {
  for(var i=0; i<FOODBANKS.length; i++){
    FOODBANKS[i]['distance'] = getDistance(
      {latitude: myLat, longitude: myLong}, 
      {latitude: JSON.stringify(FOODBANKS[i].latitude), longitude: JSON.stringify(FOODBANKS[i].longitude)}
      ) * (0.00062137) ;
  }
}
const compare = (a,b) => {
  findDistance ();
  if (a.distance < b.distance)
     return -1;
  if (a.distance > b.distance)
    return 1;
  return 0;
}

FOODBANKS.sort(compare);

export default function App() {

  return (
    <View style={styles.container}>
      <Text style={styles.textBank}>Nearby Food Banks </Text>
    <View style={styles.zip}>
      <Text style={styles.textZip}>Zipcode: 02155</Text>
    </View>
      <View styles={{flex:1}}>
      <FlatList
          data={FOODBANKS}
          renderItem= {( {item} ) => (
            <View style ={{borderRadius: 15, borderWidth: 1, borderColor: 'white', marginBottom: 30, marginRight: 25,
            marginLeft: 25, paddingTop:10, paddingBottom:30, backgroundColor: 'white'}}>
              <Text style={styles.textName}>{item.name}</Text>
              <Text style={styles.textData}>{item.distance.toFixed(1)} miles away</Text>
              <Text style={styles.textMore}>See more</Text>
            </View>
          )}
      >
      </FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#E5E5EA',
  },
  textZip: {
    fontSize: 18,
    color: 'white',
    alignItems: 'center'
  },
  textName: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 25,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 10,
    paddingRight: 15
  },
 textBank: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingBottom: 10,
    paddingTop: 80,
    paddingLeft: 25,
    paddingRight: 15,
    color: 'white',
    backgroundColor: '#3d3045',
  },
  textData: {
    backgroundColor: '#3d3045',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
    fontSize: 16,
    color: '#fb8f67',
    paddingBottom: 40,
    marginBottom: 20,
  },
  zip: {
    backgroundColor: '#fb8f67',  
    alignItems: 'flex-end', 
    paddingRight: 10, 
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft:250,
    marginBottom: 15,
    marginRight: 15,
  },
  textMore: {
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0.75,
    borderColor: '#3d3045',
    fontSize: 14,
    marginLeft: 10, 
    marginRight: 250,
    marginVertical: -30,
  }
});
