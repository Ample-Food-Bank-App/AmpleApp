import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Accordian from './components/ListAccordian';

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
            {key:'Canned meat (chicken, beef, ham'}
          ]
        },
        { 
          title: 'Fruits and Vegetables', 
          data: [
            {key:'Canned/Dried Fruits'},
            {key:'Vegetable Soups'},
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
            {key: 'Shampoo and soap'}
          ] 
        },
      ]
     }
  }
  render () {
    return (
      <View style={styles.container}>
          <View style={styles.heading}>
              <Text style={styles.textBank}>Bethel Mission Food Bank</Text>
              <Text style={styles.textItem}>Items in Need: </Text>
          </View>
        { this.renderData() }
      </View>
    );
  }
  renderData=()=> {
    const items = [];
    for (item of this.state.inventory) {
        items.push(
            <Accordian 
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
   flex:1,
   paddingTop:60,
  }, 
  heading: {
    alignItems: 'center',
    justifyContent: 'center',

  }, 
  textBank: {
    fontSize: 20,
  }, 
  textItem: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5
  }
});
