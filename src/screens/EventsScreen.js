import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

import eventsData from './../data/events.json';

const EventsScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [firestoreEvents, setFirestoreEvents] = useState([]);

    useEffect(() => {
        const fetchFirestoreEvents = async () => {
            const db = getFirestore();
            const querySnapshot = await getDocs(collection(db, "events"));
            const fetchedEvents = querySnapshot.docs.map(doc => {
                const event = doc.data();
                return { ...event, id: doc.id };
            });
            setFirestoreEvents(fetchedEvents);
        };

        fetchFirestoreEvents();
    }, []);

    const combinedEvents = useMemo(() => {
        const combined = [...firestoreEvents, ...eventsData];
        return combined.filter(event => {
            return (
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (selectedCategory === 'Todos' || event.tags?.includes(selectedCategory))
            );
        });
    }, [firestoreEvents, searchQuery, selectedCategory]);

    const renderTag = (tag, index) => {
        let backgroundColor = tag === selectedCategory ? '#EF233C' : '#8D99AE';
        return (
            <TouchableOpacity
                key={index}
                style={[styles.tag, { backgroundColor }]}
                onPress={() => setSelectedCategory(tag)}
            >
                <Text style={styles.tagText}>{tag}</Text>
            </TouchableOpacity>
        );
    };

    const renderEventItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
        >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>{item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    const allTags = ['Todos', ...new Set(eventsData.flatMap(event => event.tags))];

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar eventos..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsContainer}>
                {allTags.map(renderTag)}
            </ScrollView>
            <FlatList
                data={combinedEvents}
                renderItem={renderEventItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDF2F4',
    },
    searchInput: {
        margin: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
    },
    card: {
        flexDirection: 'row',
        padding: 10,
        margin: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        elevation: 3
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8
    },
    info: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    price: {
        fontSize: 16,
        color: '#EF233C'
    },
    tagsContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        minHeight: 20,
    },
    tag: {
        paddingVertical: 1,
        paddingHorizontal: 10,
        borderRadius: 20,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: 30,
    },
    tagText: {
        color: '#FFFFFF',
        fontSize: 12
    }
});

export default EventsScreen;
