import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import firebase from '../database/firebaseDb';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import getDistance from 'geolib/es/getDistance';
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

//         console.log('userlat: ' + props.userLat);
//         console.log('userlong: ' + props.userLong);
//         console.log('dis lat' + lat);
//         console.log('dis long' + long);

//         let lat1 = parseInt(props.userLat) * Math.PI / 180;
//         let lat2 = parseInt(lat) * Math.PI / 180;
//         let long1 = parseInt(props.userLong) * Math.PI / 180;
//         let long2 = parseInt(long) * Math.PI / 180;

//         let latDif = lat2 - lat1;
//         let longDif = long2 - long1;
//         let meanLat = Math.cos((lat1 + lat2) / 2);
//         let sqLong = meanLat * longDif;
//         let earthRadius = 3958.761;

//         let result = earthRadius * Math.sqrt(Math.pow(latDif, 2) + Math.pow(sqLong, 2));
        
            let result = getDistance(
              {latitude: parseInt(lat), longitude: parseInt(long)}, 
              {latitude: parseInt(props.userLat), parseInt(longitude: props.userLong)}
              ) * (0.00062137) ;
           }
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
                    <Text style={{ color: 'white' }}>BACK</Text>
                </TouchableOpacity>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>Food Banks Near: {props.locationOfUser}</Text>
                </View>
            </View>
            <View style={styles.list}>
                <FlatList
                    keyExtractor={(item, index) => item.id}
                    data={foodBanks}
                    renderItem={itemData =>
                        <View style={styles.listItem}>
                            <Text style={styles.name}>{itemData.item.id}</Text>
                            <Text>{itemData.item.distance} miles away</Text>
                            <TouchableOpacity style={styles.customButton} onPress={() => {
                                props.onGoToInv(true);
                                props.onGoToList(false);
                                props.onName(itemData.item.id);
                            }}>
                                <Text style={styles.buttonText}>VIEW INVENTORY</Text>
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
        flex: 1
    },
    topBar: {
        maxWidth: '100%',
        backgroundColor: '#10518f',
        height: 110
    },
    backButton: {
        borderColor: '#10518f',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        backgroundColor: '#10518f',
        width: 50,
        borderRadius: 5,
        marginRight: 5,
        marginTop: 40
    },
    title: {
        color: 'white',
        fontSize: 20,
        marginTop: 8
    },
    list: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 150
    },
    listItem: {
        padding: 10,
        backgroundColor: '#65c1f0',
        borderColor: 'black',
        borderWidth: 1,
        maxWidth: '100%',
        width: 355,
        alignItems: 'center',
        justifyContent: 'center',
        height: 150
    },
    name: {
        fontSize: 0.05 * 355,
        color: 'white'
    },
    customButton: {
        backgroundColor: '#10518f',
        width: 140,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        paddingVertical: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 13
    }
});

export default FoodBanksScreen;
