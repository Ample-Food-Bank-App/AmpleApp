import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import firebase from '../database/firebaseDb';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { getAppLoadingLifecycleEmitter } from 'expo/build/launch/AppLoading';
import haversine from 'haversine';

const FoodBanksScreen = props => {

    const haversine = require('haversine');
    const ref = firebase.firestore().collection('ListOfFoodBanks');
    const [loading, setLoading] = useState(true);
    const [foodBanks, setFoodBanks] = useState([]);
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');

    useEffect(() => {
        ref.onSnapshot(querySnapshot => {
            const list = [];
            querySnapshot.forEach(doc => {
                
                // get food bank's zip code
                const { zipcode } = doc.data();

                // get lat & long of zip code and calculate distance between food bank and user location
                let dist = calculateDistance(zipcode);

                // if food bank is within 50 miles, add food bank to list
                if (dist <= 50) {
                    list.push({
                        id: doc.id,
                        distance: dist
                    });
                }
            });

            setFoodBanks(list);

            if (loading) {
                setLoading(false);
            }
        });
    }, []);

    const calculateDistance = async zip => {
        let latlong = await Location.geocodeAsync(zip);

        // user lat & long
        const start = {
            latitude: JSON.stringify(props.userLat),
            longitude: JSON.stringify(props.userLong)
        };

        // food bank lat & long
        const end = {
            latitude: latlong[0].latitude,
            longitude: latlong[0].longitude
        };

        // haversine calculates distance between both lat & long points
        let dist = haversine(start, end, { unit: 'mile' });

        // return rounded distance
        return dist.toFixed(1);
    }

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