import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Accordian from './components/Accordian';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        inventory: [
        { 
          title: 'Fruit', 
          data: [
            {key:'ONE'},
            {key:'TWO'},
            {key:'THREE'},
          ] 
        },
        { 
          title: 'VEGETABLES',
          data: [
            {key:'A'},
            {key:'B'},
            {key:'C'},
            {key:'D'}
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