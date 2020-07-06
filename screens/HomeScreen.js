import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native';

const HomeScreen = props => {

    const [donateColor, setDonateColor] = useState('');
    const [findColor, setFindColor] = useState('');
    const [enteredValue, setEnteredValue] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const numberInputHandler = inputText => {
        setEnteredValue(inputText);
    };

    const useMyLocationHandler = () => {
        const myLocation = '00000';
        setEnteredValue(myLocation);
        setSelectedValue(myLocation);
    };

    const donateHandler = () => {
        setSelectedOption('donate');
        setDonateColor('#95d3e6');
        setFindColor('#10518f');
    };

    const findHandler = () => {
        setSelectedOption('find');
        setDonateColor('#10518f');
        setFindColor('#95d3e6');
    };

    const startHandler = () => {
        if (selectedValue === '' && selectedOption === '') {
            Alert.alert('Enter the Following Information!', 'Please enter a location and select an action.', [{ text: 'Okay', style: 'cancel' }]);
            return;
        }
        else if (selectedOption === '') {
            Alert.alert('Select an Action!', 'Please select whether you would like to donate or find resources.', [{ text: 'Okay', style: 'cancel' }]);
            return;
        }
        else if (isNaN(parseInt(enteredValue)) || enteredValue.length != 5) {
            Alert.alert('Invalid Zip Code!', 'A valid zip code must be entered.', [{ text: 'Okay', style: 'destructive', onPress: () => setEnteredValue('') }]);
            return;
        }
        setSelectedValue(enteredValue);
        props.onStart(selectedValue, selectedOption);
    };

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={styles.screen}>
                <View style={styles.title}>
                    <Text style={styles.appName}>A M P L E</Text>
                </View>
                <View style={styles.findPlaces}>
                    <Text style={styles.textLook}>Enter Your Zip Code:</Text>
                    <View style={styles.zipcodeInput}>
                        <TextInput
                            style={styles.zipcode}
                            blurOnSubmit
                            keyboardType="numeric"
                            maxLength={5}
                            onChangeText={numberInputHandler}
                            value={enteredValue} 
                        />
                    </View>
                    <Text style={styles.orText}>OR</Text>
                    <View>
                        <Button color='#10518f' title="Use My Location" onPress={useMyLocationHandler}/>
                    </View>
                </View>
                <View style={styles.selection}>
                    <Text style={styles.textLook}>Would you like to:</Text>
                    <View style={styles.buttons}>
                        <Button color={donateColor} title="DONATE" onPress={donateHandler} />
                    </View>
                    <View style={styles.buttons}>
                        <Button color={findColor} title="FIND RESOURCES" onPress={findHandler} />
                    </View>
                </View>
                <View style={styles.start}>
                    <TouchableOpacity style={styles.customButton} onPress={startHandler}>
                        <Text style={styles.startText}>GET STARTED</Text>
                    </TouchableOpacity>
                    <Text>End the food crisis, one donation at a time!</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    appName: {
        fontSize: 60,
        marginBottom: 20,
        color: 'white'
    },
    title: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100
    },
    findPlaces: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    textLook: {
        fontSize: 20,
        marginTop: 20,
        marginBottom: 5
    },
    orText: {
        fontSize: 16,
        marginVertical: 10
    },
    zipcode: {
        padding: 5,
        marginTop: 10,
        borderColor: 'black',
        borderWidth: 1,
        width: 100,
        textAlign: 'center'
    },
    selection: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    selectionText: {
        fontSize: 20
    },
    buttons: {
        width: 150,
        marginVertical: 5
    },
    start: {
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    customButton: {
        borderColor: 'pink',
        borderWidth: 2,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: 'pink',
        width: 200,
        elevation: 5,
        borderRadius: 5
    },
    startText: {
        fontSize: 23,
        fontWeight: 'bold',
        color: 'white'
    }
});

export default HomeScreen;