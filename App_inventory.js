import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Linking, TouchableHighlight, Platform, TouchableOpacity} from 'react-native';
import Accordion from './components/ListAccordion';
import MapView, { PROVIDER_GOOGLE, Marker, Callout }from 'react-native-maps';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        inventory: [
        { 
          title: 'Grains', 
          data: [
            {key:'Rice (white, brown, flavored)'},
            {key:'Pasta/Noodles'},
            {key:'Cold cereal'},
          ] 
        },
        { 
          title: 'Proteins',
          data: [
            {key:'Beans (canned or dry)'},
            {key:'Nuts'},
            {key:'Peanut Butter'},
          ]
        },
        { 
          title: 'Fruits', 
          data: [
            {key:'Canned/Dried Fruits'},
            {key:'Fruit Juices'},
          ] 
        },
        { 
          title: 'Vegetables', 
          data: [
            {key:'Canned vegetables'},
            {key:'Vegetable soups'},
          ] 
        },
        { 
          title: 'Dairy', 
          data: [
            {key:'Shelf-stable milk'},
            {key:'Dry milk packets'},
          ] 
        },
        { 
          title: 'Specialty Items', 
          data: [
            {key:'Nutrition Beverages (e.g. Boost, Ensure)'},
            {key:'Granola bars'},
          ] 
        },
        { 
          title: 'Hygiene and Personal Care', 
          data: [
            {key:'Diapers'},
            {key:'Sanitary pads/tampons'},
            {key: 'Shampoo and soap'},
          ] 
        },
      ]
     }
  };
 
  makeCall = () => {
    let phoneNumber = '+1 (781)6577915';
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${+1 (781)6577915}';
    } else {
      phoneNumber = 'telprompt:${+1 (781)6577915}';
    }
    Linking.openURL(phoneNumber);
  }
  openMap = () => {
    Linking.openURL('https://www.google.com/maps/search/?api=1&query=Bethel+Mission+Church+154th+Street+Jamaica');
  };

  render () {
    return (
      <ScrollView>
        <View styles={styles.container}>
          <Text style={styles.textBank}>Bethel Mission Food Bank</Text>
            <View style={styles.need}>
              <Text style={styles.textItem}>Items in Need: </Text>
            </View>

           <View style={{backgroundColor:'#fb8f67'}}>
            { this.renderData() }
          </View>

          <View style = {styles.line}/>
          <View style={{backgroundColor: '#fb8f67'}}> 
            <Text style={styles.textSubheader}>Address & Contact Details</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableHighlight   onPress={() => this.openMap() }>
              <Image style={styles.address}
                source={require ('./images/address.png')}
              ></Image>
            </TouchableHighlight>
            <Text style={styles.textAddress1}>10623 154th St</Text>
          </View> 
          <View style={{flexDirection: 'row'}}>
            <Text style = {styles.textAddress2}>Jamaica, NY 11433</Text>
            
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
              onPress={this.makeCall}
              >
                 <Image style={styles.phone}
                  source={require ('./images/phone.png')}
                ></Image>
              </TouchableHighlight>
              <Text style={styles.textPhone}>(718) 657-7915</Text>
            </View>
          </View> 
          
          <View>
          <MapView
            style={{flex: 1, height: 180, paddingTop: 30}}
            provider={ PROVIDER_GOOGLE }
            initialRegion={{
              latitude: 40.695790,
              longitude: -73.799280,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >
            <TouchableHighlight >
            <Marker
                coordinate={{ latitude: 40.695790, longitude: -73.799280 }}
                onPress  onPress={() => this.openMap() }
            >
            </Marker>  
            </TouchableHighlight>
    
          </MapView>
          </View>
        </View>
      </ScrollView>
    );
  }
  renderData=()=> {
    const items = [];
    for (item of this.state.inventory) {
        items.push(
            <Accordion 
                title = {item.title}
                data = {item.data}
            />
        );
    }
    return items;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '100%',
  },
  textBank: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 10,
    paddingTop: 80,
    paddingLeft: 25,
    paddingRight: 15,
    color: 'white',
    backgroundColor: '#3d3045'
  }, 
  textItem: {
    fontSize: 20,
    marginTop: 10,
    paddingBottom: 5,
    alignItems: 'center',
    color: 'white'
  }, 
  need: {
    paddingLeft: 30,
    backgroundColor: '#fb8f67',
  },
  line: {
    borderBottomWidth: 0.5,
    borderColor:'lightgray',
  }, 
  address: {
    width: 55, 
    height: 55, 
    tintColor: '#3d3045',
    marginLeft: 8,
    marginVertical: 10,
  }, 
  phone: {
    width: 25,
    height: 25, 
    tintColor: '#3d3045',
    marginLeft: 25,
    marginVertical: -50,
  },
  textAddress1: {
    marginLeft: -3, 
    marginVertical: 15, 
    fontSize: 16,
  }, 
  textAddress2: {
    marginLeft: 60, 
    marginVertical: -40, 
    fontSize: 16,
  }, 
  textPhone: {
    marginLeft: 8, 
    marginVertical: -50, 
    fontSize: 16,
  }, 
  textSubheader: {
    fontSize: 20, 
    marginLeft: 25, 
    marginTop: 10,
    marginVertical: 5, 
    color: 'white',
  },
});
