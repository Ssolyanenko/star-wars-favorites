import React from "react";
import {StyleSheet, Text, View} from "react-native";


export function DetailsScreen({route}) {
    const {character} = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Character Details</Text>
            <Text style={styles.text}>Name: {character.name}</Text>
            <Text style={styles.text}>Birth Year: {character.birthYear}</Text>
            <Text style={styles.text}>Gender: {character.gender}</Text>
            <Text style={styles.text}>Hair color: {character.hair_color}</Text>
            <Text style={styles.text}>Skin color: {character.skin_color}</Text>
            {/* Display other details */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontWeight: 'bold',
        color: '#003459'
    }
});