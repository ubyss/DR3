import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

const GalleryScreen = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const storage = getStorage();

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        setLoading(true);
        const photosRef = ref(storage, 'photos/');
        const photosUrls = [];
        try {
            const result = await listAll(photosRef);
            for (const itemRef of result.items) {
                const url = await getDownloadURL(itemRef);
                photosUrls.push({ id: itemRef.name, url });
            }
            setPhotos(photosUrls);
        } catch (error) {
            console.error("Error listing documents: ", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={photos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item.url }} style={styles.image} />
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    image: {
        width: 100,
        height: 100,
        margin: 5,
    }
});

export default GalleryScreen;
