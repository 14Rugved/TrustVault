import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function UploadDoc() {
  const [selectedImage, setSelectedImage] = useState(null);  // State to store the selected image
  const [ocrResult, setOcrResult] = useState('');  // State to store the OCR result
  const [isImageUploaded, setIsImageUploaded] = useState(false);  // State to check if the image is uploaded

  // Request permission on component mount
  useEffect(() => {
    (async () => {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
      }
    })();
  }, []);

  // Function to handle image selection
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,  // Restrict to images only
      allowsEditing: true,  // Allow users to crop/edit the image before uploading
      quality: 1,  // Full image quality
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri; // Get the URI from the first asset
      console.log('Selected image URI:', imageUri);  // Log the selected image URI
      setSelectedImage(imageUri);  // Set the selected image URI
      setIsImageUploaded(false);  // Reset image uploaded state
      setOcrResult('');  // Clear previous OCR result
    } else {
      console.log('Image selection was cancelled.');
    }
  };

  // Function to upload the image
  const uploadImage = async () => {
    if (!selectedImage) {
      alert('No image selected');
      return;
    }

    const fileUri = selectedImage;
    const fileName = fileUri.split('/').pop();  // Get the file name from the URI
    const fileType = fileName.split('.').pop();  // Get the file extension

    const formData = new FormData();
    formData.append('image', {
      uri: fileUri,
      name: fileName,
      type: `image/${fileType === 'jpg' ? 'jpeg' : fileType}`,  // Ensure correct file type
    });

    console.log('Uploading image with FormData:', formData);

    try {
      // Replace with your local IP or ngrok URL
      const response = await fetch('http://192.168:18:197:3000/api/ocr', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',  // Important for sending file data
        },
      });

      if (!response.ok) {
        console.error('Failed to upload image. Status:', response.status);
        setOcrResult('Failed to upload image.');
        return;
      }

      const responseData = await response.json();  // Handle the response
      console.log('Upload response:', responseData);

      setIsImageUploaded(true);  // Mark the image as uploaded
      setOcrResult(responseData.text || 'Image uploaded successfully.');
    } catch (error) {
      console.error('Error uploading image:', error);
      setOcrResult('Error uploading image.');
    }
  };

  // Function to fetch previously recognized texts from the server
  const fetchRecognizedTexts = async () => {
    if (!isImageUploaded) {
      setOcrResult('Please upload an image first.');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.38:3000/api/ocr/data');  // Replace with local IP or ngrok URL
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const texts = await response.json();
      setOcrResult(JSON.stringify(texts, null, 2));  // Show the recognized texts in a readable format
    } catch (error) {
      console.error('Error fetching recognized texts:', error);
      setOcrResult('Error fetching recognized texts.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OCR API Test</Text>

      {/* Button to pick an image */}
      <Button title="Pick an Image" onPress={pickImage} />

      {selectedImage && (
        <>
          {/* Display the selected image */}
          <Image source={{ uri: selectedImage }} style={styles.image} />

          {/* Button to upload the image */}
          <Button title="Upload Image" onPress={uploadImage} />

          {/* Button to fetch recognized texts after uploading the image */}
          <Button title="Fetch Recognized Texts" onPress={fetchRecognizedTexts} />
        </>
      )}

      {/* Display OCR result */}
      <Text style={styles.result}>{ocrResult}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    textAlign: 'center',
    width: '100%',
  },
});