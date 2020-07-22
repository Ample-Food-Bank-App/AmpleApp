import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import firebase from '../database/firebaseDb';
import * as Location from 'expo-location';
import getDistance from 'geolib/es/getDistance';
import * as Permissions from 'expo-permissions';
import { getAppLoadingLifecycleEmitter } from 'expo/build/launch/AppLoading';


const FoodBanksScreen = props => {

    const ref = firebase.firestore().collection('ListOfFoodBanks');
    const [loading, setLoading] = useState(true);
    const [foodBanks, setFoodBanks] = useState([]);
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const [distance, setDistance] = useState(0);

    getLatLong = async zip => {
        let latlong = await Location.geocodeAsync(zip);
        setLat(latlong[0].latitude);
        setLong(latlong[0].longitude);
        console.log('async lat: ' + latlong[0].latitude);
        console.log('async long: ' + latlong[0].longitude);
    }

    const calculateDistance = () => {
        let result = getDistance(
            {latitude: lat, longitude: long}, 
            {latitude: props.userLat, longitude: props.userLong}
            ) * (0.00062137);
        console.log(result);

        setDistance(result);
    };

    useEffect(() => {
        ref.onSnapshot(querySnapshot => {
            const list = [];
            querySnapshot.forEach(doc => {
                const { name, zipcode } = doc.data();
                getLatLong(zipcode);
                calculateDistance();
                if (distance <= 70) {
                    list.push({
                        id: doc.id,
                        distance: distance
                    });
                }
            });

            setFoodBanks(list);

            if (loading) {
                setLoading(false);
            }
        });
    }, []);

    return (
        <View style={styles.screen}>
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.backButton} onPress={() => props.onGoToHome(true)}>
                    <Image style={styles.back} source={require('../images/back.png')}></Image>
                </TouchableOpacity>
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 20}}>
                    <Text style={styles.title}>Nearby Food Banks</Text>
                </View>
                <View style={styles.zip}>
                    <Text style={styles.textZip}>Zipcode: {props.locationOfUser}</Text>
                </View>
            </View>
            <View style={styles.list}>
                <FlatList
                    keyExtractor={(item) => item.id}
                    data={foodBanks}
                    renderItem={itemData =>
                        <View style={styles.listItem}>
                            <Text style={styles.textName}>{itemData.item.id}</Text>
                            <Text style={styles.textData}>{itemData.item.distance} miles away</Text>
                            <TouchableOpacity style={styles.customButton} onPress={() => {
                                props.onGoToInv(true);
                                props.onGoToList(false);
                                props.onName(itemData.item.id);
                            }}>
                                <Text style={styles.buttonText}>See more</Text>
                            </TouchableOpacity>
                        </View>
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#E5E5EA',
    },
    topBar: {
        maxWidth: '100%',
        backgroundColor: '#10518f',
        height: 110,
        paddingBottom: 12
    },
    backButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        width: 50,
        borderRadius: 5,
        marginRight: 5,
        marginTop: 40
    },
    title: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },
    list: {
        marginTop: 60,
        paddingBottom: 180
    },
    listItem: {
        backgroundColor: 'white',
        borderRadius: 15, 
        borderWidth: 1, 
        borderColor: 'white', 
        marginBottom: 30, 
        marginRight: 25,
        marginLeft: 25, 
        paddingTop:5, 
        paddingBottom:20, 
        paddingLeft: 15,
    },
    textName: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    textData: {
        fontSize: 16,
        color: '#10518f',
        paddingBottom: 15,
    },
    customButton: {
        width: 88,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 1,
        borderRadius: 12, 
        borderWidth: 1, 
        borderColor: '#ff8000', 
        backgroundColor: '#ff8000', 
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        alignItems: 'center'
    }, 
    textZip: {
        fontSize: 16,
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    back: {
        width: 25, 
        height: 25,
        tintColor: 'white',
    },
    zip: {
        backgroundColor: '#ff8000',  
        alignItems: 'flex-end', 
        paddingRight: 10, 
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft:250,
        marginRight: 25,
        marginBottom: 10,
      },
});

export default FoodBanksScreen;