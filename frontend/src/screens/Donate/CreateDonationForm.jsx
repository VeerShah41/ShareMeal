import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import { BlurView } from 'expo-blur';
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

export default function CreateDonationForm({ navigation }) {
  const [foodType, setFoodType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [photos, setPhotos] = useState([]);
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [notes, setNotes] = useState('');

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhotos(result.assets.map(asset => asset.uri));
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/form3.jpg")}
      style={styles.bg}
    >
      {/* Back arrow floating on background */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <BlurView intensity={50} tint="light" style={styles.formCard}>
          <Text style={styles.heading}>Create Donation</Text>

          <Text style={styles.label}>Food Type</Text>
          <TextInput
            placeholder="E.g., Rice, Sandwiches"
            placeholderTextColor="#eee"
            style={styles.underlineInput}
            value={foodType}
            onChangeText={setFoodType}
          />

          <Text style={styles.label}>Quantity</Text>
          <TextInput
            placeholder="E.g., 5 plates / 2 boxes"
            placeholderTextColor="#eee"
            style={styles.underlineInput}
            value={quantity}
            onChangeText={setQuantity}
          />

          <Text style={styles.label}>Food Photos</Text>
          <TouchableOpacity style={styles.photoButton} onPress={pickImages}>
            <Text style={styles.photoButtonText}>Upload Photos</Text>
          </TouchableOpacity>
          {photos.length > 0 && <Text style={styles.photoCount}>{photos.length} photo(s) selected</Text>}

          <Text style={styles.label}>Pickup Details</Text>
          <TextInput
            placeholder="Address"
            placeholderTextColor="#eee"
            style={styles.underlineInput}
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            placeholder="Contact Number"
            placeholderTextColor="#eee"
            style={styles.underlineInput}
            keyboardType="phone-pad"
            value={contact}
            onChangeText={setContact}
          />
          <TextInput
            placeholder="Available for pickup until (e.g., 5:00 PM)"
            placeholderTextColor="#eee"
            style={styles.underlineInput}
            value={pickupTime}
            onChangeText={setPickupTime}
          />

          <Text style={styles.label}>Additional Notes</Text>
          <TextInput
            placeholder="E.g., Allergies, special instructions..."
            placeholderTextColor="#eee"
            style={[styles.underlineInput, { height: 100 }]}
            multiline
            value={notes}
            onChangeText={setNotes}
          />

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Create Donation</Text>
          </TouchableOpacity>

        </BlurView>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 80,
  },
  backButton: {
    position: 'absolute',
    top: 40, // distance from top of screen
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 8,
    borderRadius: 25,
  },
  formCard: {
    borderRadius: 25,
    marginTop: 100, // pushed down so arrow is above the card
    padding: 25,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  heading: {
    fontSize: 33,
    fontWeight: "800",
    color: "#ffffffff",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "French"
  },
  label: {
    color: "#fff",
    fontWeight: "800",
    marginBottom: 6,
    marginTop: 12,
  },
  underlineInput: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingVertical: 8,
    color: "#fff",
    fontSize: 16,
    marginBottom: 17,
  },
  photoButton: {
    backgroundColor: "#ffffffaa",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  photoButtonText: {
    color: "#111",
    fontWeight: "600",
  },
  photoCount: {
    color: "#fff",
    marginBottom: 15,
  },
  button: {
    marginTop: 25,
    backgroundColor: "#fffefeff",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "#111111ff",
    fontWeight: "600",
    fontSize: 16,
  },
});
