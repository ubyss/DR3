import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

const CameraScreen = () => {
    const storage = getStorage();

    const takePhotoAndUpload = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Required', 'Sorry, we need camera permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (result.cancelled) {
            Alert.alert('Cancelled', 'Image picker was cancelled.');
            return;
        }

        const { assets } = result;
        if (assets && assets.length > 0) {
            const { uri } = assets[0];
            const fileName = uri.split('/').pop();
            const imageRef = ref(storage, `photos/${fileName}`);

            try {
                const imgBlob = await fetch(uri).then(r => r.blob());
                await uploadBytes(imageRef, imgBlob);
                Alert.alert('Upload Successful', 'Your photo has been uploaded successfully!');
            } catch (error) {
                console.error("Upload failed", error);
                Alert.alert('Upload Failed', `Error during upload: ${error.message}`);
            }
        } else {
            console.log('Image picker result:', result);
            Alert.alert('Error', 'No image selected or image picker error occurred.');
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Take Photo" onPress={takePhotoAndUpload} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CameraScreen;
