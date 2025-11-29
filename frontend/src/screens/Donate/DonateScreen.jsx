// DonateScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DonateScreen = ({ navigation }) => {
  // Sample data for donations
  const [donations, setDonations] = useState([
    {
      id: '1',
      foodType: 'Sandwiches',
      quantity: '5 boxes',
      pickupAddress: '123 Street, City',
      contact: '9876543210',
      status: 'Available',
    },
    {
      id: '2',
      foodType: 'Fruits',
      quantity: '10 kg',
      pickupAddress: '456 Avenue, City',
      contact: '9876543211',
      status: 'Accepted',
    },
    {
      id: '3',
      foodType: 'Pizza',
      quantity: '3 boxes',
      pickupAddress: '789 Road, City',
      contact: '9876543212',
      status: 'Cancelled',
    },
  ]);

  // Render individual donation card
  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.foodType}>{item.foodType}</Text>
        <Text
          style={[
            styles.status,
            item.status === 'Available'
              ? styles.available
              : item.status === 'Accepted'
              ? styles.accepted
              : styles.cancelled,
          ]}
        >
          {item.status}
        </Text>
      </View>
      <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
      <Text style={styles.address}>Pickup: {item.pickupAddress}</Text>
      <Text style={styles.contact}>Contact: {item.contact}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={donations}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 15 }}
        ListHeaderComponent={
          <Text style={styles.title}>Your Donations</Text>
        }
        ListFooterComponent={
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('CreateDonationForm')}
          >
            <Text style={styles.buttonText}>Create Donation</Text>
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1ABC9C',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  foodType: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    fontWeight: '600',
  },
  available: { color: '#3BB273' },
  accepted: { color: '#3498DB' },
  cancelled: { color: '#E74C3C' },
  quantity: { fontSize: 14, marginBottom: 3 },
  address: { fontSize: 14, marginBottom: 3 },
  contact: { fontSize: 14 },
  button: {
    backgroundColor: '#1ABC9C',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default DonateScreen;
