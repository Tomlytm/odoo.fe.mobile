import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Switch,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import styles from "../styles/leads"; // Importing styles

const staticAlertsData = [
  {
    id: 1,
    name: "Meeting with John",
    time: "2 hours",
    detail: "Discuss project updates",
    visitType: "Office Visit",
    location: "New York, NY",
  },
  {
    id: 2,
    name: "Call with Sarah",
    time: "30 minutes",
    detail: "Follow up on proposal",
    visitType: "Phone Call",
    location: "Los Angeles, CA",
  },
  {
    id: 3,
    name: "Lunch with Mike",
    time: "1 hour",
    detail: "Business lunch",
    visitType: "Restaurant Visit",
    location: "Chicago, IL",
  },
];

import { useRouter } from "expo-router";

const AlertsScreen = () => {
  const [selectedActivities, setSelectedActivities] = useState<number[]>([]);
  const router = useRouter();

  const toggleActivitySelection = (id: number) => {
    setSelectedActivities((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((activityId) => activityId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Alerts</Text>
            <Text style={styles.subtitle}>Create and manage Reminders</Text>
          </View>

          <View style={styles.profileImageWrapper}>
            <Image
              source={require("@/assets/images/Img.png")}
              style={styles.profileImage}
            />
          </View>
        </View>

        {/* Search Bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: "#CFD3D4",
              flex: 1,
              flexDirection: "row",
              padding: 10,
              borderRadius: 50,
              alignItems: "center",
            }}
          >
            <Feather name="search" size={18} color="gray" />
            <TextInput
              placeholder="Search"
              placeholderTextColor="gray"
              style={{ marginLeft: 10, flex: 1, fontFamily: "Lexend" }}
            />
          </View>

          <TouchableOpacity
            style={{
              marginLeft: 10,
              borderWidth: 1,
              borderColor: "#CFD3D4",
              padding: 10,
              borderRadius: 50,
            }}
          >
            <Feather name="filter" size={24} color="#898A8B" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginLeft: 10,
              backgroundColor: "#071952",
              padding: 10,
              borderRadius: 50,
            }}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <FontAwesome size={14} color={"#000"} name="calendar" />
          <Text style={styles.activityDate}>12th January, 2025</Text>
        </View>

        {/* Loader */}
        {false ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          /* Leads List */
          <FlatList
            data={staticAlertsData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => toggleActivitySelection(item.id)}
                style={styles.activityCard}
              >
                <View
                  style={{ flex: 1, flexDirection: "row", marginBottom: 15 }}
                >
                  <FontAwesome name="clock-o" size={14} color="gray" />
                  <Text
                    style={{
                      color: "gray",
                      fontFamily: "Lexend",
                      marginLeft: 4,
                    }}
                  >
                    {item.time} left
                  </Text>
                </View>
                <View style={styles.activityRow}>
                  <Text style={styles.activityName}>{item.name}</Text>
                  <View style={{ flexDirection: "row", gap: 4 }}>
                    <Switch
                      value={selectedActivities.includes(item.id)}
                      onValueChange={() => toggleActivitySelection(item.id)}
                      trackColor={{ false: "#767577", true: "#071952" }}
                      //   thumbColor={
                      //     selectedActivities.includes(item.id)
                      //       ? "#071952"
                      //       : "#f4f3f4"
                      //   }
                      style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                    />
                  </View>
                </View>
                <Text style={styles.activityDetail}>{item.detail}</Text>
                {/* <View style={styles.reminderFooter}>
                  <View style={styles.typeContainer}>
                    <Text
                      style={{
                        color: "#1EBA2D",
                        fontFamily: "Lexend",
                        fontSize: 12,
                      }}
                    >
                      {item.visitType}
                    </Text>
                  </View>
                  <View style={styles.footerContainer}>
                    <FontAwesome size={14} color={"#000"} name="map-marker" />
                    <Text style={styles.reminderFooterText}>
                      {item.location}
                    </Text>
                  </View>
                </View> */}
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default AlertsScreen;
