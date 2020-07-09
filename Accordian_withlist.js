import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, UIManager, Image} from "react-native";

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
                <View style = {styles.child}>
                    <Text style ={styles.textData}>{this.props.data}</Text> 
                </View>
            }
             
        </View>
     )
   }
}


 const styles = StyleSheet.create({
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
    textData: {
        fontSize: 14,
    },
    child: {
        backgroundColor: 'white',
        padding: 5,
        paddingLeft: 30,
        paddingRight:15,
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
        height:1,
        width:'100%'
    },
});