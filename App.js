import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { render } from 'react-dom';
import Constants from 'expo-constants';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCalzqoNM9kGTiHoa7oEzbdu4qFsOQ32zI",
  authDomain: "myfirstapp-55a67.firebaseapp.com",
  databaseURL: "https://myfirstapp-55a67.firebaseio.com",
  projectId: "myfirstapp-55a67",
  storageBucket: "myfirstapp-55a67.appspot.com",
  messagingSenderId: "141305113369",
  appId: "1:141305113369:web:f608b5c097546529e57388",
  measurementId: "G-T2NV1M2RBT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
      messages: []
    }

    this.addItem = this.addItem.bind(this);
  }

  componentDidMount() {
    // gets all the existing data from database
    firebase
      .database()
      .ref()
      .child("messages")
      .once("value", snapshot => {
        const data = snapshot.val()
        if (snapshot.val()) {
          const initMessages = [];
          Object
            .keys(data)
            .forEach(message => initMessages.push(data[message]));
          this.setState({
            messages: initMessages
          })
        }
      });
    
    // makes sure that app always gets the latest data
    firebase
      .database()
      .ref()
      .child("messages")
      .on("child_added", snapshot => {
        const data = snapshot.val();
        if(data) {
          this.setState(prevState => ({
            messages: [data, ...prevState.messages]
          }))
        }
      })

  }

  addItem () {
    if(!this.state.message) return;

    const newMessage = firebase
                        .database()
                        .ref()
                        .child("messages")
                        .push();
    newMessage.set(this.state.message, () => this.setState({message: ''}))
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.msgBox}>
          <TextInput placeHolder='Enter your message'
            value={this.state.message}
            onChangeText={(text) => this.setState({message: text})} 
            style={styles.txtInput}/>
          <Button title='Send' onPress={this.addItem}/>
        </View>
        <FlatList data={this.state.messages} 
          renderItem={
            ({item}) => 
            <View style={styles.listItemContainer}>
              <Text style={styles.listItem}>
                {item}
              </Text>
            </View>
          }/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    marginTop: Constants.statusBarHeight
  },
  msgBox: {
    flexDirection:'row',
    padding: 20,
    backgroundColor: '#fff'
  },
  txtInput: {
    flex: 1,
  },
  listItemContainer: {
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 5
  },
  listItem: {
    fontSize: 20,
    padding: 10
  }
});
