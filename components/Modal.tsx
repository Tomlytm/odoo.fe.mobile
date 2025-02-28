import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

interface ActivityModalProps {
  modalVisible: boolean;
  onClose: () => void;
}

const ActivityModal: React.FC<ActivityModalProps> = ({
  modalVisible,
  onClose,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Activity</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="times" size={25} color="#6C7480" />
            </TouchableOpacity>
          </View>

          {/* Body */}
          <View style={styles.body}>
            <View style={styles.row}>
              <Icon name="calendar-alt" size={16} color="#6C7480" />
              <Text style={styles.label}>Timestamp:</Text>
              <Text style={styles.value}>12 Jan 2025, 12:45 PM</Text>
            </View>

            <View style={styles.row}>
              <Icon name="map-marker-alt" size={16} color="#6C7480" />
              <Text style={styles.label}>Location:</Text>
              <Text style={styles.value}>
                15, Freedom Way, Lekki Phase 1, 105102
              </Text>
            </View>

            <View style={styles.row}>
              <Icon name="user" size={16} color="#6C7480" />
              <Text style={styles.label}>Client:</Text>
              <View style={styles.clientIndicator} />
              <Text style={styles.value}>Huawei</Text>
            </View>

            <View style={styles.row}>
              <Icon name="clipboard-list" size={16} color="#6C7480" />
              <Text style={styles.label}>Visit Type:</Text>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Visit Type</Text>
              </View>
            </View>

            <View style={styles.row}>
              <Icon name="clipboard" size={16} color="#6C7480" />
              <Text style={styles.label}>Visit Purpose:</Text>
              <Text style={styles.value}>Lorem ipsum dolor amet ut</Text>
            </View>

            <View style={styles.row}>
              <Icon name="trophy" size={16} color="#6C7480" />
              <Text style={styles.label}>Achievement:</Text>
              <Text style={styles.value}>Lorem ipsum dolor amet ut</Text>
            </View>
          </View>

          {/* Edit Button */}
          <TouchableOpacity style={styles.editButton} onPress={() => {}}>
            <Text style={styles.editText}>Edit</Text>
            <Icon
              name="pen"
              size={14}
              color="#2D264B"
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 20,
    padding: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#00002E",
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Lexend",
    color: "#333333",
  },
  body: {
    marginTop: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  label: {
    color: "#6C7480",
    marginLeft: 8,
    marginRight: 5,
    fontFamily: "Lexend",
  },
  value: {
    color: "#333",
    fontFamily: "Lexend",
  },
  clientIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "black",
    marginHorizontal: 5,
  },
  tag: {
    backgroundColor: "#E9F9EA",
    borderWidth: 0.5,
    borderColor: "#1EBA2D",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  tagText: {
    color: "#1EBA2D",
    fontFamily: "Lexend",
  },
  editButton: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginTop: 10,
    color: "#2D264B",
  },
  editText: {
    color: "#2D264B",
    fontWeight: "600",
    fontFamily: "Lexend",
  },
});

export default ActivityModal;
