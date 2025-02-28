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
} from "react-native";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import styles from "../styles/leads"; // Importing styles
import {
  useGetActivityTypes,
  useGetPipelines,
} from "@/services/queries/pipelines";
import { useRouter } from "expo-router";
import ActivityModal from "@/components/Modal";

type Activity = {
  time: string;
  type: string;
  visitType: string;
};
const ActivitiesScreen = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const { activityTypesData, isDataLoading } = useGetActivityTypes();
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Activities</Text>
            <Text style={styles.subtitle}>
              Track and manage all your activities!
            </Text>
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
        <View style={{ flexDirection: "row", gap: 10 }}>
          <FontAwesome size={14} color={"#000"} name="calendar" />
          <Text style={styles.activityDate}>12th January, 2025</Text>
        </View>

        {/* Loader */}
        {isDataLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          /* Leads List */
          <FlatList
            data={
              Array.isArray(activityTypesData?.data)
                ? activityTypesData.data
                : []
            }
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
        )}
        <ActivityModal
          modalVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          // activity={selectedActivity}
        />
      </View>
    </SafeAreaView>
  );
};

export default ActivitiesScreen;
