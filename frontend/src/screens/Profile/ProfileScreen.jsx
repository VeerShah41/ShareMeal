import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
    const userData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 8900',
        location: 'New York, USA',
        donationsCount: 12,
        volunteerHours: 24,
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>
                                {userData.name.split(' ').map(n => n[0]).join('')}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.name}>{userData.name}</Text>
                    <Text style={styles.email}>{userData.email}</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>{userData.donationsCount}</Text>
                        <Text style={styles.statLabel}>Donations</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>{userData.volunteerHours}</Text>
                        <Text style={styles.statLabel}>Volunteer Hours</Text>
                    </View>
                </View>

                <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>Contact Information</Text>
                    
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Email</Text>
                        <Text style={styles.infoValue}>{userData.email}</Text>
                    </View>
                    
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Phone</Text>
                        <Text style={styles.infoValue}>{userData.phone}</Text>
                    </View>
                    
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Location</Text>
                        <Text style={styles.infoValue}>{userData.location}</Text>
                    </View>
                </View>

                <View style={styles.actionsContainer}>
                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.editButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.settingsButton}>
                        <Text style={styles.settingsButtonText}>Settings</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: '#f8f9fa',
    },
    avatarContainer: {
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#1ABC9C',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    avatarText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: '#666',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    statCard: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1ABC9C',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
    },
    infoSection: {
        padding: 20,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    infoLabel: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    infoValue: {
        fontSize: 14,
        color: '#333',
        flex: 1,
        textAlign: 'right',
    },
    actionsContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    editButton: {
        backgroundColor: '#1ABC9C',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    settingsButton: {
        backgroundColor: '#fff',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1ABC9C',
    },
    settingsButtonText: {
        color: '#1ABC9C',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ProfileScreen;
