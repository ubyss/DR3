import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

import eventsData from './../data/events.json';

const EventDetailsScreen = ({ route }) => {
    const { eventId } = route.params;
    const event = eventsData.find(e => e.id === eventId);

    if (!event) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Evento não encontrado.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: event.image }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{event.title}</Text>
                <Text style={styles.description}>{event.description}</Text>
                <Text style={styles.details}>Local: {event.location}</Text>
                <Text style={styles.details}>Data: {event.date}</Text>
                <Text style={styles.price}>Preço: {event.price}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDF2F4'
    },
    image: {
        width: '100%',
        height: 250
    },
    infoContainer: {
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    description: {
        fontSize: 16,
        marginBottom: 10
    },
    details: {
        fontSize: 16,
        marginBottom: 5
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#EF233C',
        marginTop: 10
    }
});

export default EventDetailsScreen;
