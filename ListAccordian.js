import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, LayoutAnimation, UIManager, Image} from "react-native";

export default class Accordian extends Component{
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,

        }
        this.icons = {
            'up': require('../images/up.png'),
            'down' :require('../images/down.png')
        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    makeExpand=()=> {
        LayoutAnimation.configureNext (LayoutAnimation.Presets.Linear)
        this.setState({expanded : !(this.state.expanded)})
    }
    render () {
        let icon = this.icons ['down'];
        if(this.state.expanded){
            icon = this.icons['up']; 
        }
    
    return (
        <View>
        <TouchableOpacity
          ref={this.accordion}
          style={styles.row}
          onPress={() => this.makeExpand()} 
        >
        
         <Text style={styles.textTitle}>{this.props.title}</Text>
        
        <Image style = {styles.icon}
            source = {icon}
        ></Image>
        
        </TouchableOpacity>
        {this.state.expanded && (
          <View style={styles.container}>
            <FlatList
            keyExtractor={item => item.key}
            data={this.props.data}
            scrollEnabled={true}
            renderItem={({ item, index }) => (
                <View style={styles.item}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.textData}>{item.key}</Text>
                    </View>
                </View>
              )}
            />
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 5,
  },
  item: {
    padding: 2,
    marginLeft: 25,
    marginRight: 15,
  },
  row: {
    height: 37,
    paddingLeft: 25,
    paddingRight: 15,
    paddingBottom: 0,
    margin: 5,
    backgroundColor: "lightblue",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  textTitle: {
    fontSize: 17,
  },
  textData: {
    fontSize: 14,
  },
  icon: {
    width: 27,
    height: 27,
    tintColor: "darkblue",
  },
  category: {
    alignItems: "flex-start",
  },
});