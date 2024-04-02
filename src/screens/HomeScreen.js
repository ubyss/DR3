import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={require('./../../assets/logo.png')} style={styles.logo} />
            <Text style={styles.title}>App de Eventos</Text>
            <Text style={styles.description}>
                Bem-vindo ao App de Eventos, a sua plataforma para descobrir e participar de eventos incríveis.
            </Text>
            <Text style={styles.createdBy}>Criado por Thiago Vinicius</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDF2F4',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
        borderRadius: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2B2D42',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#2B2D42',
        textAlign: 'center',
        marginBottom: 20,
    },
    createdBy: {
        fontSize: 14,
        color: '#2B2D42',
        marginTop: 20,
    },
});

export default HomeScreen;
