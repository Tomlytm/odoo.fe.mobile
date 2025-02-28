import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Button,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import ActivityModal from "@/components/Modal";

import styles from "../../styles/leads"; // Importing styles
import {
  useGetActivityByPipelineId,
  useGetPipelineById,
} from "@/services/queries/pipelines";

const leadDetails = {
  id: 1,
  name: "MicroSoft",
  interactions: 18,
  assignedDate: "8th Dec, 2023",
  activities: [
    {
      time: "2:45 PM",
      type: "Contact added",
      location: "City, State",
      visitType: "Visit Type",
    },
    {
      time: "2:45 PM",
      type: "Contact added",
      location: "City, State",
      visitType: "Visit Type",
    },
  ],
};

type Activity = {
  time: string;
  type: string;
  visitType: string;
};

const LeadDetailsScreen = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const { pipelineData, isDataLoading } = useGetPipelineById(Number(id));
  const { activitiesData } = useGetActivityByPipelineId(Number(id));
  console.log(activitiesData, "wtyff");
  if (isDataLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      {/* Header Section */}
      <View>
        <LinearGradient
          colors={["#00002E", "#000068"]}
          start={[0, 0]}
          end={[1, 0]}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 50,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  marginLeft: 15,
                  fontFamily: "Lexend",
                }}
              >
                Lead
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 50,
                padding: 10,
                marginRight: 10,
              }}
            >
              <Ionicons name="person" size={24} color="#00002E" />
            </View>
            <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
              {pipelineData?.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 30,
            }}
          >
            <Text
              style={{ color: "white", fontSize: 14, fontFamily: "Lexend" }}
            >
              {leadDetails.interactions} Interactions
            </Text>
            <Text
              style={{ color: "white", fontSize: 14, fontFamily: "Lexend" }}
            >
              Assigned: {leadDetails.assignedDate}
            </Text>
          </View>
        </LinearGradient>
      </View>
      {/* Search & Actions */}
      <View style={{ flexDirection: "row", alignItems: "center", margin: 20 }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#CFD3D4",
            flex: 1,
            flexDirection: "row",
            // backgroundColor: "#FFFFFF",
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
      {/* Date Label */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 20,
        }}
      >
        <Feather name="calendar" size={18} color="gray" />
        <Text
          style={{
            marginLeft: 10,
            fontSize: 16,
            fontFamily: "Lexend",
            color: "#333",
          }}
        >
          12th January, 2025
        </Text>
      </View>

      {Array.isArray(activitiesData) && activitiesData.length > 0 ? (
        <FlatList
          data={activitiesData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedActivity(item);
                setModalVisible(true);
              }}
              style={styles.activityCard}
            >
              <View style={styles.activityRow}>
                <Text style={styles.activityName}>{item.name}</Text>
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <Text style={styles.activityTime}>2:45 PM</Text>
                  <FontAwesome size={12} color={"#6C7480"} name="bars" />
                </View>
              </View>
              <Text style={styles.activityDetail}>Contact added</Text>
              <View style={styles.reminderFooter}>
                <View style={styles.typeContainer}>
                  <Text
                    style={{
                      color: "#1EBA2D",
                      fontFamily: "Lexend",
                      fontSize: 12,
                    }}
                  >
                    Visit Type
                  </Text>
                </View>
                <View style={styles.footerContainer}>
                  <FontAwesome size={14} color={"#000"} name="map-marker" />
                  <Text style={styles.reminderFooterText}>City, State</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ fontFamily: "Lexend", fontSize: 16, color: "red" }}>
            No activities found.
          </Text>
        </View>
      )}
      <ActivityModal
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        // activity={selectedActivity}
      />
    </View>
  );
};

export default LeadDetailsScreen;
