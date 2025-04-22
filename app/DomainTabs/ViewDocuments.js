import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system';

export default function ViewDocuments() {
  const router = useRouter();
  const [imageUri, setImageUri] = useState(null);
  const uploadDir = FileSystem.documentDirectory + 'uploads/';

  useEffect(() => {
    // Ensure the uploads directory exists
    const createUploadDir = async () => {
      try {
        const dirInfo = await FileSystem.getInfoAsync(uploadDir);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(uploadDir, { intermediates: true });
        }
      } catch (error) {
        console.error('Error creating uploads directory:', error);
      }
    };
    createUploadDir();
  }, []);

  const pickImage = async (source) => {
    try {
      let result;
      if (source === 'camera') {
        result = await ImagePicker.launchCameraAsync({ 
          mediaTypes: ImagePicker.MediaTypeOptions.Images, 
          allowsEditing: true, 
          quality: 1 
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({ 
          mediaTypes: ImagePicker.MediaTypeOptions.Images, 
          allowsEditing: true, 
          quality: 1 
        });
      }

      if (!result.canceled && result.assets.length > 0) {
        const fileUri = result.assets[0].uri;
        const fileName = fileUri.split('/').pop();
        const destUri = uploadDir + fileName;

        await FileSystem.moveAsync({ from: fileUri, to: destUri });
        setImageUri(destUri);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while uploading the document.');
      console.error('File upload error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upload Document</Text>

      <TouchableOpacity style={styles.button} onPress={() => pickImage('camera')}>
        <Text style={styles.buttonText}>Upload via Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => pickImage('gallery')}>
        <Text style={styles.buttonText}>Upload via Gallery</Text>
      </TouchableOpacity>

      {imageUri && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewText}>Uploaded Document:</Text>
          <Image source={{ uri: imageUri }} style={styles.preview} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: "80%",
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  previewContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  previewText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  preview: {
    width: 200,
    height: 200,
    borderRadius: 10,
  }
});
