import React from 'react';
import {
  View, Text, TextInput, FlatList, Image, TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/leads'; // Importing styles
import { useGetPipelines } from '@/services/queries/pipelines';

const leads = [
  { id: '1', name: 'Microsoft', visits: 1 },
  { id: '2', name: 'Huawei', visits: 26 },
  { id: '3', name: 'Dell', visits: 21 },
  { id: '4', name: 'Canon', visits: 25 },
  { id: '5', name: 'Accenture', visits: 3 },
];

const LeadsScreen = () => {
  const { pipelinesData } = useGetPipelines();
  console.log(pipelinesData, 'jkn');
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Leads</Text>
          <Text style={styles.subtitle}>Manage your assigned leads!</Text>
        </View>
        {/* <Image source={require('./assets/profile.png')} style={styles.profileImage} /> */}
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
        <TextInput placeholder="Search" style={styles.searchInput} />
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="#777" />
        </TouchableOpacity>
      </View>

      {/* Leads List */}
      <FlatList
        data={Array.isArray(pipelinesData) ? pipelinesData : []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.leadCard}>
            <View style={styles.leadInfo}>
              {/* <Image source={item.logo} style={styles.leadLogo} /> */}
              <View>
                <Text style={styles.leadName}>{item.name}</Text>
                <Text style={styles.visits}>{item.id} Visits</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#777" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default LeadsScreen;
