import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons"; // For icons

const ReminderModal = ({ isModalVisible, toggleModal }) => {
  const [description, setDescription] = useState("");

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={toggleModal}
      onBackButtonPress={toggleModal}
      swipeDirection="down"
      onSwipeComplete={toggleModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      useNativeDriver
      style={styles.modal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.handle} />
        <Text style={styles.modalHeader}>Set Reminder</Text>
        <View style={styles.divider} />

        {/* Description Input */}
        <TextInput
          style={styles.inputLarge}
          placeholder="Description"
          multiline
          value={description}
          onChangeText={setDescription}
        />

        {/* Date & Time Buttons */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.dateTimeButton}>
            <FontAwesome name="calendar" size={16} color="#333" />
            <Text style={styles.dateTimeText}>Select Date</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateTimeButton}>
            <MaterialIcons name="access-time" size={16} color="#333" />
            <Text style={styles.dateTimeText}>Select Time</Text>
          </TouchableOpacity>
        </View>

        {/* Dropdowns */}
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>Client</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>Notify me - Standard</Text>
        </TouchableOpacity>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Reminder</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
    fontFamily: "Lexend"
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    fontFamily: "Lexend"
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 30,
    fontFamily: "Lexend"
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Lexend"
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  inputLarge: {
    height: 80,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 10,
    fontFamily: "Lexend"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateTimeButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    flex: 1,
    justifyContent: "center",
    marginRight: 5,
    fontFamily: "Lexend"
  },
  dateTimeText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginTop: 10,
    fontFamily: "Lexend"
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#00002E",
    // backgroundImage: "linear-gradient(90deg, #000068 0%, #00002E 100%)",
    paddingVertical: 24,
    borderRadius: 30,
    marginTop: 15,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "semibold",
    fontFamily: "Lexend"
  },
});

export default ReminderModal;
