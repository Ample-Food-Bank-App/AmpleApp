import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Accordian from './components/Accordian';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory :[
        { 
          title: 'Fruits and Vegetables',
          data: 'Enter here',
        },
         { 
          title: 'Grains',
          data: 'Enter here',
         },
         { 
          title: 'Legumes',
          data: 'Enter here',
         },
         { 
          title: 'Soups and Packaged Meals',
          data: 'Enter here',
         },
         { 
          title: 'Canned meat/fish',
          data: 'Enter here',
         },
         { 
          title: 'Snacks',
          data: 'Enter here',
         },
         { 
          title: 'Personal Hygiene Products',
          data: 'Enter here',
         },
         { 
          title: 'Cleaning Products',
          data: 'Enter here',
         },
         { 
          title: 'Specialty Items',
          data: 'Enter here',
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