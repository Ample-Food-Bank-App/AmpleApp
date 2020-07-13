import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, LayoutAnimation, UIManager, Image, YellowBox, Linking} from "react-native";

YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

export default class Accordion extends Component{
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        };
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
        <View style={{backgroundColor: 'white', borderWidth: 0.5,
        borderColor:'#8E8E93',  }}>
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
            scrollEnabled={true}
            data={this.props.data}
            renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.textData}>{item.key}</Text>
                </View>
              )}
            ></FlatList>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 2, 
  },
  item: {
    padding: 1,
    marginLeft: 25,
    marginRight: 15,

  },
  row: {
    height: 40,
    paddingLeft: 25,
    paddingRight: 15,
    margin: 5,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  textTitle: {
    fontSize: 18,
    color: 'black',
  },
  textData: {
    fontSize: 15,
    paddingBottom: 5,
    paddingTop: 0,
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: '#3d3045',
    alignItems: "center",
  },
  category: {
    alignItems: "flex-start",
  },
});
