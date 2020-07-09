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
             <TouchableOpacity ref={this.accordion} style={styles.row} onPress={()=>this.makeExpand()}>
                <Text style={styles.textTitle}>{this.props.title}</Text>
                <Image style = {styles.icon}
                    source = {icon}
                ></Image>
            </TouchableOpacity>

            <View style={styles.parent}/>
            {
                this.state.expanded &&
                <View style={styles.container}>
                    <FlatList
                    data={this.state.data}
                    renderItem={({item}) => (
                        <View>
                            <Text style={styles.textData}>{item.key}</Text>
                        <View style={styles.child}/>
                        </View>
                    )}
                    />
                </View>
            }
        </View>
     )
   }
}


 const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      paddingTop: 40,
      paddingHorizontal: 20,
    },
    row :{
        height: 37, 
        paddingLeft: 25,
        paddingRight:15,
        paddingBottom: 0,
        margin: 5,
        backgroundColor: 'lightblue',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textTitle: {
        fontSize: 17,
    },
    texrData: {
        fontSize: 14,
    },
    child: {
        backgroundColor: 'blue',
        height: 30,
        width: 100,
    },
    icon: {
        width: 27,
        height: 27,
        tintColor: 'darkblue',
    },
    category: {
        alignItems: 'flex-start',
    },
    parent: {
        height:100,
        width:'100%'
    },
});