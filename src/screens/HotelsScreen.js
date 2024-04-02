// src/screens/HotelsScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import eventsData from './../data/events.json';

const HotelsScreen = ({ route }) => {
    const { eventId } = route.params;
    const event = eventsData.find(e => e.id === eventId);

    const renderHotelItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>Preço: {item.price}</Text>
            <Text>Distância do evento: {item.distance}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {event ? (
                <FlatList
                    data={event.hotels}
                    renderItem={renderHotelItem}
                    keyExtractor={item => item.name}
                />
            ) : (
                <Text>Nenhum hotel encontrado para este evento.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    card: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default HotelsScreen;
