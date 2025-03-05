import React, {useState} from 'react';
import {
  Button,
  Image,
  View,
  StyleSheet,
  Text,
  NativeModules,
  PermissionsAndroid,
  Platform,
} from 'react-native';

const {CameraModule} = NativeModules;

const CameraButton = () => {
  const [imageUri, setImageUri] = useState(null);
  const [error, setError] = useState(null);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Camera permission request failed:', err);
        return false;
      }
    }
    return true; // No explicit permission needed for iOS
  };

  const takePicture = async () => {
    try {
      setError(null);

      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        setError('Camera permission denied');
        return;
      }

      // Ensure CameraModule exists before calling it
      if (!CameraModule || !CameraModule.captureImage) {
        setError('Camera module not available.');
        return;
      }

      const uri = await CameraModule.captureImage();
      setImageUri(uri);
    } catch (e) {
      console.error('Error taking picture:', e);
      setError(e?.message || 'An error occurred while capturing the image.');
    }
  };

  return (
    <>
      <View >
        <Text style={styles.main}>Native Modules : Camera App</Text>
      </View>
      <View style={styles.container}>
        <Button title="Take Picture" onPress={takePicture} />

        {error && <Text style={styles.errorText}>Error: {error}</Text>}

        {imageUri && (
          <View style={styles.imageContainer}>
            <Text style={styles.uriText}>Image URI: {imageUri}</Text>
            <Image source={{uri: imageUri}} style={styles.image} />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    padding:20,
    fontSize: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 10,
    borderRadius: 10,
  },
  uriText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default CameraButton;
