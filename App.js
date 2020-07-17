import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback} from 'react-native';
import getDistance from 'geolib/es/getDistance';

var myLong = 40.730610;
var myLat = -73.935242;

const FOODBANKS = [
  { 
    name:'First United Methodist Church of Jamaica', 
    longitude: 40.636190, 
    latitude: -73.741430,
  },
  { 
    name:'Bethel Mission Food Bank', 
    longitude: 40.695790, 
    latitude: -73.799280, 
  },
  {
    name: 'Bethany Baptist Church of Jamaica',
    longitude: 40.687120,
    latitude: -73.789370, 
  }, 
  {
    name: 'Macedonia AME Church Food Pantry and Hot Meal',
    longitude: 40.698080, 
    latitude: -73.792350, 
  }
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
      <Text style={styles.textZip}>Zipcode: 11101</Text>
    </View>
      <View styles={{flex:1}}>
      <FlatList
          data={FOODBANKS}
          renderItem= {( {item} ) => (
            <View style ={{borderRadius: 15, borderWidth: 1, borderColor: 'white', marginBottom: 30, marginRight: 25,
            marginLeft: 25, paddingTop:10, paddingBottom:30, backgroundColor: 'white',  paddingLeft: 15,}}>
              <Text style={styles.textName}>{item.name}</Text>
              <Text style={styles.textData}>{item.distance.toFixed(1)} miles away</Text>
              <View style ={{borderRadius: 12, borderWidth: 1, borderColor: '#3d3045', backgroundColor: '#3d3045', paddingBottom: 5, marginVertical: -20, marginRight: 230, marginLeft: 10}}> 
              <Text style={styles.textMore}>See more</Text>
              </View>
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
    fontSize: 16,
    color: 'white',
    alignItems: 'center'
  },
  textName: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 25,
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
  },
 textBank: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 10,
    paddingTop: 80,
    paddingLeft: 25,
    paddingRight: 15,
    marginBottom: 7,
    color: 'white',
    backgroundColor: '#3d3045',
  },
  textData: {
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 16,
    color: '#fb8f67',
    paddingBottom: 15,
    marginBottom: 20,
  },
  zip: {
    backgroundColor: '#fb8f67',  
    alignItems: 'flex-end', 
    paddingRight: 10, 
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft:275,
    marginRight: 15,
    marginBottom: 10,
  },
  textMore: {
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 15,
    marginLeft: 15,
    paddingTop: 5,
    color: 'white',
    marginBottom: 1
  }
});

