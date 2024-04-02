import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

import app from './../firebase/firebaseConfig'

const firestore = getFirestore(app)

const AddEventScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');

    const addEvent = async () => {
        try {
            const docRef = await addDoc(collection(firestore, "events"), {
                title,
                description,
                price,
                location,
                date
            });
            Alert.alert('Evento Adicionado', `Evento ${title} foi adicionado com sucesso. ID: ${docRef.id}`);
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao adicionar o evento.');
            console.error("Error adding document: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Título do Evento"
                style={styles.input}
            />
            <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Descrição"
                style={styles.input}
            />
            <TextInput
                value={price}
                onChangeText={setPrice}
                placeholder="Preço"
                style={styles.input}
            />
            <TextInput
                value={location}
                onChangeText={setLocation}
                placeholder="Localização"
                style={styles.input}
            />
            <TextInput
                value={date}
                onChangeText={setDate}
                placeholder="Data"
                style={styles.input}
            />
            <Button title="Adicionar Evento" onPress={addEvent} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});

export default AddEventScreen;
