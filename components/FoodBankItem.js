import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

<FoodBankItem id={itemData.item.id} title={itemData.item.value} />

const FoodBankItem = props => {
    return (
        <View style={styles.listItem}>
            <Text style={styles.title}>{props.title}</Text>
            <Text>BLANK miles away</Text>
            <TouchableOpacity style={styles.customButton} onPress={props.onGoToInv(true)}>
                <Text style={styles.buttonText}>VIEW INVENTORY >> </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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
    title: {
        fontSize: 20,
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

export default FoodBankItem;