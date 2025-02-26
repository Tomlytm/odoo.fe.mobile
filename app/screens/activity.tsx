import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const activities = [
  {
    date: '12th January, 2025',
    data: [
      {
        id: '1',
        company: 'MicroSoft',
        // logo: require('./assets/microsoft.png'), // Change path to your image
        time: '2:45 PM',
        type: 'Contact added',
        tag: 'Visit Type',
        location: 'City, State',
      },
      {
        id: '2',
        company: 'Huawei',
        // logo: require('./assets/huawei.png'),
        time: '2:45 PM',
        type: 'Contact added',
        tag: 'Visit Type',
        location: 'City, State',
      },
      {
        id: '3',
        company: 'Dell',
        // logo: require('./assets/dell.png'),
        time: '2:45 PM',
        type: 'Contact added',
        tag: 'Visit Type',
        location: 'City, State',
      },
    ],
  },
  {
    date: '10th January, 2025',
    data: [
      {
        id: '4',
        company: 'Apple',
        // logo: require('./assets/apple.png'),
        time: '1:30 PM',
        type: 'Meeting scheduled',
        tag: 'Call Type',
        location: 'City, State',
      },
    ],
  },
];

const ActivityScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
const router = useRouter();
  const renderActivityItem = ({ item }) => (
    <View style={styles.activityCard}>
      <View style={styles.cardHeader}>
        <Image source={item.companyName} style={styles.companyLogo} />
        <Text style={styles.companyName}>{item.company}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <Text style={styles.activityType}>{item.type}</Text>
      <View style={styles.cardFooter}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{item.tag}</Text>
        </View>
        <View style={styles.location}>
          <Ionicons name="location-outline" size={16} color="#999" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.headerTitle}>Activities</Text>
      <Text style={styles.headerSubtitle}>Track and manage all your activities!</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="filter" size={18} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton}       onPress={() => router.push("/screens/log-activity")}        >
          <Ionicons name="add" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* Activity List */}
      <FlatList
        data={activities}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.dateHeader}>{item.date}</Text>
            <FlatList data={item.data} keyExtractor={(activity) => activity.id} renderItem={renderActivityItem} />
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, fontFamily:"Lexend", backgroundColor: 'white', padding: 16 },
  headerTitle: { fontSize: 22, fontFamily:"Lexend", fontWeight: 'bold', color: '#3D5AFE' },
  headerSubtitle: { fontSize: 14, fontFamily:"Lexend", color: '#777', marginBottom: 10 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F3F5', borderRadius: 10, paddingHorizontal: 10, marginBottom: 16 },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, paddingVertical: 8 },
  filterButton: { padding: 10 },
  addButton: { marginLeft: 8, backgroundColor: '#3D5AFE', borderRadius: 20, padding: 8 },
  dateHeader: { fontSize: 14, fontFamily:"Lexend", fontWeight: 'bold', color: '#555', marginVertical: 10 },
  activityCard: { backgroundColor: '#fff', padding: 12, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 3, elevation: 3, marginBottom: 10 },
  cardHeader: { flexDirection: 'row', fontFamily:"Lexend", alignItems: 'center' },
  companyLogo: { width: 30, height: 30, borderRadius: 15, marginRight: 10 },
  companyName: { fontSize: 16, fontWeight: 'bold', flex: 1 },
  time: { fontSize: 12, color: '#888' },
  activityType: { fontSize: 14, color: '#444', marginVertical: 5 },
  cardFooter: { flexDirection: 'row', fontFamily:"Lexend", justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  tag: { backgroundColor: '#E5F2FF', fontFamily:"Lexend", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 5 },
  tagText: { fontSize: 12,  fontFamily:"Lexend",color: '#007BFF' },
  location: { flexDirection: 'row', alignItems: 'center' },
  locationText: { fontSize: 12, color: '#777', marginLeft: 4 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, borderTopWidth: 1, borderColor: '#E5E5E5', backgroundColor: '#fff' },
});

export default ActivityScreen;
