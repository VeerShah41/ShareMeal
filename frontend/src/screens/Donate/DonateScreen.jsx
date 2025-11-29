import React, { useState, useEffect } from "react";
import {View,Text,StyleSheet,FlatList,TouchableOpacity,Image,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "DONATIONS_LIST";

const DEFAULT_DONATIONS = [
  {
    id: "1",
    foodType: "Sandwiches",
    quantity: "5 boxes",
    pickupAddress: "123 Street, City",
    contact: "9876543210",
    status: "Available",
    image: require("../../../assets/sandwich.jpg"),
  },
  {
    id: "2",
    foodType: "Fruits",
    quantity: "10 kg",
    pickupAddress: "456 Avenue, City",
    contact: "9876543211",
    status: "Accepted",
    image: require("../../../assets/fruits.jpg"),
  },
  {
    id: "3",
    foodType: "Pizza",
    quantity: "3 boxes",
    pickupAddress: "789 Road, City",
    contact: "9876543212",
    status: "Cancelled",
    image: require("../../../assets/pizza.jpg"),
  },
];

const DonateScreen = ({ navigation }) => {
  const [donations, setDonations] = useState(DEFAULT_DONATIONS);

  const loadDonations = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);
        setDonations([...DEFAULT_DONATIONS, ...parsed]);
      } else {
        setDonations(DEFAULT_DONATIONS);
      }
    } catch (error) {
      console.log("Error loading donations:", error);
      setDonations(DEFAULT_DONATIONS);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadDonations();
    });

    return unsubscribe;
  }, [navigation]);

  const handleCancel = async (id) => {
    const updated = donations.map((item) =>
      item.id === id ? { ...item, status: "Cancelled" } : item
    );

    setDonations(updated);

    const updatedStored = updated.filter((item) => Number(item.id) > 3);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStored));
  };

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      {item.photos && item.photos.length > 0 ? (
        <Image source={{ uri: item.photos[0] }} style={styles.foodImage} />
      ) : item.image ? (
        <Image source={item.image} style={styles.foodImage} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>No Photo</Text>
        </View>
      )}

      <View style={styles.cardBody}>
        <View style={styles.cardHeader}>
          <Text style={styles.foodType}>{item.foodType}</Text>

          <View
            style={[
              styles.statusBadge,
              item.status === "Available"
                ? styles.availableBG
                : item.status === "Accepted"
                ? styles.acceptedBG
                : styles.cancelledBG,
            ]}
          >
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>

        <Text style={styles.info}>Quantity: {item.quantity}</Text>
        <Text style={styles.info}>
          Pickup: {item.address || item.pickupAddress}
        </Text>

        {item.pickupTime && (
          <Text style={styles.info}>Available until: {item.pickupTime}</Text>
        )}

        <Text style={styles.info}>Contact: {item.contact}</Text>

        {item.notes && (
          <Text style={styles.notes} numberOfLines={2}>
            Notes: {item.notes}
          </Text>
        )}

        {item.status !== "Cancelled" && (
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
          Share extra food — make someone's day brighter!
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
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 15 }}
        ListHeaderComponent={<Text style={styles.title}>Your Donations</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },

  header: {
    backgroundColor: "#1ABC9C",
    padding: 22,
    paddingBottom: 25,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 6,
  },
  headerTitle: { fontSize: 28, fontWeight: "bold", color: "white" },
  headerSubtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 16,
    marginTop: 2,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginVertical: 15,
    color: "#16A085",
  },

  buttonWrapper: {
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
  },
  tagline: {
    textAlign: "center",
    fontSize: 13,
    color: "#4D4D4D",
    opacity: 0.8,
    fontStyle: "italic",
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
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    marginBottom: 14,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  foodImage: {
    width: 110,
    height: 110,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
  placeholder: {
    width: 110,
    height: 110,
    backgroundColor: "#ecf0f1",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
  placeholderText: { color: "#7f8c8d" },

  cardBody: { flex: 1, padding: 12 },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  foodType: { fontSize: 17, fontWeight: "700" },

  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  statusText: { color: "#fff", fontSize: 11, fontWeight: "600" },

  availableBG: { backgroundColor: "#3BB273" },
  acceptedBG: { backgroundColor: "#3498DB" },
  cancelledBG: { backgroundColor: "#E74C3C" },

  info: { fontSize: 13, marginBottom: 2, color: "#555" },
  notes: { fontSize: 12, marginTop: 4, fontStyle: "italic", color: "#777" },

  cancelButton: {
    backgroundColor: "#E74C3C",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  cancelButtonText: { color: "#fff", fontWeight: "600", fontSize: 12 },
});

export default DonateScreen;
