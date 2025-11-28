import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Button, Avatar, useTheme } from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const DonationCard = ({ donation, onAccept, onPress, isAccepted = false }) => {
  const theme = useTheme();
  const {
    foodType,
    quantity,
    area,
    pickupTime,
    donorName,
    meals,
    foodImage,
    isVeg,
    isPackaged
  } = donation;

  return (
    <Card style={styles.card} onPress={onPress}>
      <View style={styles.cardContent}>
        <View style={styles.imageContainer}>
          {foodImage ? (
            <Image 
              source={{ uri: foodImage }} 
              style={styles.foodImage}
              resizeMode="cover"
            />
          ) : (
            <MaterialIcons name="fastfood" size={40} color="#9e9e9e" />
          )}
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.headerRow}>
            <View style={styles.foodInfo}>
              <Text style={styles.foodType}>{foodType}</Text>
              
              <View style={styles.infoRow}>
                <MaterialIcons name="location-on" size={16} color="#666" />
                <Text style={styles.infoText}>{area}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <MaterialIcons name="access-time" size={16} color="#666" />
                <Text style={styles.infoText}>{pickupTime}</Text>
              </View>
              
              <View style={styles.chipContainer}>
                <View 
                  style={[
                    styles.chip, 
                    { 
                      backgroundColor: isVeg ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                      borderColor: isVeg ? '#4CAF50' : '#F44336'
                    }
                  ]}
                >
                  <Text 
                    style={[
                      styles.chipText, 
                      { color: isVeg ? '#4CAF50' : '#F44336' }
                    ]}
                  >
                    {isVeg ? 'Veg' : 'Non-Veg'}
                  </Text>
                </View>
                
                <View 
                  style={[
                    styles.chip, 
                    { 
                      backgroundColor: 'rgba(63, 81, 181, 0.1)',
                      borderColor: '#3F51B5'
                    }
                  ]}
                >
                  <Text style={[styles.chipText, { color: '#3F51B5' }]}>
                    {isPackaged ? 'Packaged' : 'Fresh'}
                  </Text>
                </View>
              </View>
            </View>
            
            <View style={styles.quantityContainer}>
              <Text style={styles.quantityText}>{quantity} servings</Text>
              <Text style={styles.mealsText}>~{meals} meals</Text>
            </View>
          </View>
          
          {donorName && (
            <Text style={styles.donorText}>
              Donated by: {donorName}
            </Text>
          )}
        </View>
      </View>
      
      <Card.Actions style={styles.cardActions}>
        <Button 
          mode="contained" 
          onPress={onAccept}
          disabled={isAccepted}
          style={[
            styles.actionButton, 
            isAccepted && { backgroundColor: theme.colors.secondary }
          ]}
          labelStyle={styles.buttonLabel}
        >
          {isAccepted ? 'Accepted' : 'Accept Donation'}
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  cardContent: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: 120,
    height: 120,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodImage: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    flex: 1,
    padding: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  foodInfo: {
    flex: 1,
  },
  foodType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  chipContainer: {
    flexDirection: 'row',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 6,
    marginBottom: 4,
  },
  chipText: {
    fontSize: 10,
    fontWeight: '500',
  },
  quantityContainer: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3F51B5',
  },
  mealsText: {
    fontSize: 10,
    color: '#666',
  },
  donorText: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic',
  },
  cardActions: {
    padding: 0,
    backgroundColor: '#f9f9f9',
  },
  actionButton: {
    flex: 1,
    borderRadius: 0,
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default DonationCard;
