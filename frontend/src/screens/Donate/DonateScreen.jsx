import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DonateScreen = ({ navigation }) => {
  const [donations, setDonations] = useState([
    {
      id: '1',
      foodType: 'Sandwiches',
      quantity: '5 boxes',
      pickupAddress: '123 Street, City',
      contact: '9876543210',
      status: 'Available',
      image: require('../../../assets/form2.png'),
    },
    {
      id: '2',
      foodType: 'Fruits',
      quantity: '10 kg',
      pickupAddress: '456 Avenue, City',
      contact: '9876543211',
      status: 'Accepted',
      image: require('../../../assets/form2.png'),
    },
    {
      id: '3',
      foodType: 'Pizza',
      quantity: '3 boxes',
      pickupAddress: '789 Road, City',
      contact: '9876543212',
      status: 'Cancelled',
      image: require('../../../assets/form2.png'),
    },
  ]);

  // 🔴 Cancel Donation Handler
  const handleCancel = (id) => {
    setDonations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Cancelled" } : item
      )
    );
  };

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.foodImage} />

      <View style={styles.cardBody}>
        <View style={styles.cardHeader}>
          <Text style={styles.foodType}>{item.foodType}</Text>

          <View
            style={[
              styles.statusBadge,
              item.status === 'Available'
                ? styles.availableBG
                : item.status === 'Accepted'
                  ? styles.acceptedBG
                  : styles.cancelledBG,
            ]}
          >
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>

        <Text style={styles.info}>Quantity: {item.quantity}</Text>
        <Text style={styles.info}>Pickup: {item.pickupAddress}</Text>
        <Text style={styles.info}>Contact: {item.contact}</Text>

        {/* 🔴 Cancel Button — only when NOT cancelled */}
        {item.status !== 'Cancelled' && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => handleCancel(item.id)}
          >
            <Text style={styles.cancelButtonText}>Cancel Donation</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ShareMeal</Text>
        <Text style={styles.headerSubtitle}>Donation Dashboard</Text>
      </View>

      <View style={styles.buttonWrapper}>
        <Text style={styles.tagline}>
          Share extra food — make someone’s day brighter!
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateDonationForm")}
          activeOpacity={0.7}
        >
          <View style={styles.glassButton}>
            <Text style={styles.glassButtonText}>Create Donation</Text>
          </View>
        </TouchableOpacity>

      </View>

      <FlatList
        data={donations}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 15 }}
        ListHeaderComponent={<Text style={styles.title}>Your Donations</Text>}

      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  /* HEADER */
  header: {
    backgroundColor: '#1ABC9C',
    padding: 22,
    paddingBottom: 25,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 6,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    marginTop: 2,
  },

  /* SECTION TITLE */
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 15,
    color: '#16A085',
  },

  /* CARD */
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    marginBottom: 14,

    // Light shadow for modern look
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,

    elevation: 6,
  },

  foodImage: {
    width: '100%',
    height: 120, // Reduced
    resizeMode: 'cover',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },

  cardBody: {
    padding: 12, // Reduced padding
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },

  foodType: {
    fontSize: 17, // Reduced
    fontWeight: '700',
    color: '#333',
  },

  /* STATUS BADGE */
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  statusText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 11,
  },
  availableBG: { backgroundColor: '#3BB273' },
  acceptedBG: { backgroundColor: '#3498DB' },
  cancelledBG: { backgroundColor: '#E74C3C' },

  /* INFO TEXT */
  info: {
    fontSize: 13,
    marginBottom: 3,
    color: '#555',
  },

  /* CANCEL BUTTON */
  cancelButton: {
    backgroundColor: '#E74C3C',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },

  /* TOP SECTION: Create Button + Tagline */
  buttonWrapper: {
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
  },

  glassButton: {
    paddingVertical: 12,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    marginTop: 8,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },

    elevation: 6,
  },

  glassButtonText: {
    color: "#1ABC9C",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  tagline: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 13,
    color: "#4D4D4D",
    opacity: 0.8,
    fontStyle: "italic",
  },
});


export default DonateScreen;
