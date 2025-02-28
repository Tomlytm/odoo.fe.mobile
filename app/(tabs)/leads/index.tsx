import React from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import styles from "../../styles/leads"; // Importing styles
import { useGetPipelines } from "@/services/queries/pipelines";
import { useRouter } from "expo-router";

const LeadsScreen = () => {
  const { pipelinesData, isDataLoading } = useGetPipelines();
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Leads</Text>
            <Text style={styles.subtitle}>Manage your assigned leads!</Text>
          </View>

          <View style={styles.profileImageWrapper}>
            <Image
              source={require("@/assets/images/Img.png")}
              style={styles.profileImage}
            />
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#777"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search"
            placeholderTextColor="gray"
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={20} color="#777" />
          </TouchableOpacity>
        </View>

        {/* Loader */}
        {isDataLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          /* Leads List */
          <FlatList
            data={Array.isArray(pipelinesData?.data) ? pipelinesData.data : []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => router.push(`/leads/${item.id}`)}
                style={styles.leadCard}
              >
                <View style={styles.leadInfo}>
                  {/* <Image source={item.logo} style={styles.leadLogo} /> */}
                  <View>
                    <View style={styles.leadNameContainer}>
                      <FontAwesome
                        size={17}
                        color="#00002E"
                        style={styles.leadIcon}
                        name="address-book"
                      />
                      <Text style={styles.leadName}>{item.name}</Text>
                    </View>
                    <Text style={styles.visits}>{item.id} Visits</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={12} color="#6C7480" />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default LeadsScreen;
