import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons"; // For icons
import DropDownPicker from "react-native-dropdown-picker";
interface ReminderModalProps {
  isModalVisible: boolean;
  toggleModal: () => void;
}

const ReminderModal: React.FC<ReminderModalProps> = ({
  isModalVisible,
  toggleModal,
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
  ]);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}
      >
        <View style={styles.handle} />
        <Text style={styles.modalHeader}>Set Reminder</Text>
        <View style={styles.divider} />

        {/* Description Input */}
        <TextInput
          style={styles.inputLarge}
          placeholder="Description"
          placeholderTextColor={"gray"}
          multiline
          value={description}
          onChangeText={setDescription}
        />

        {/* Date & Time Buttons */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.dateTimeButton}
            // onPress={() => setShowDatePicker(true)}
          >
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              style={{ backgroundColor: "#fff" }}
              onChange={onChangeDate}
            />
            <FontAwesome name="calendar" size={20} color="#333" />
            {/* <Text style={styles.dateTimeText}>{date.toDateString()}</Text> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateTimeButton}>
            <DateTimePicker
              value={date}
              mode="time"
              display="default"
              onChange={onChangeDate}
            />
            <MaterialIcons name="access-time" size={20} color="#333" />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.dropdown}>
          <Text style={styles.dropdownText}>Client</Text>
          <TouchableOpacity>
            <Text style={styles.dropdownText}>Select Client</Text>
          </TouchableOpacity>
        </View> */}
        <DropDownPicker
          open={openDropdown}
          value={selectedValue}
          items={items}
          setOpen={setOpenDropdown}
          setValue={setSelectedValue}
          setItems={setItems}
          placeholder="Select an option"
          style={styles.dropdown}
        />

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
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
    fontFamily: "Lexend",
  },
  modalContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    fontFamily: "Lexend",
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 30,
    marginTop: 20,
    fontFamily: "Lexend",
  },
  modalHeader: {
    fontSize: 18,
    marginBottom: 20,
    // fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Lexend",
  },
  divider: {
    height: 3,
    backgroundColor: "#00002E",
    marginVertical: 10,
  },
  inputLarge: {
    height: 120,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 20,
    fontFamily: "Lexend",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateTimeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    flex: 1,
    // justifyContent: "center",
    marginRight: 5,
    fontFamily: "Lexend",
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
    marginTop: 20,
    // fontSize: 16,
    fontFamily: "Lexend",
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
    marginBottom: 50,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "semibold",
    fontFamily: "Lexend",
  },
});

export default ReminderModal;
