import ReminderModal from '@/components/ActionModal';
import { useUser } from '@/context/UserContext';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import Modal from 'react-native-modal';
// imprt ReminderModal
export default function TabOneScreen() {
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);
  const { user } = useUser();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleNextPage = () => {
    router.push('/screens/activity?header=false');
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <View>
              <Text style={styles.greeting}>Hello {user?.name ?? 'Guest'},</Text>
            </View>

            <Text style={styles.subGreeting}>Get started on your activities for today!</Text>
          </View>

          <View style={styles.profileImageWrapper}>
            <Image
              source={require('@/assets/images/Img.png')}
              style={styles.profileImage}
            />
          </View>
        </View>

        {/* Quick Actions Section */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard}>
            <Image
              source={require('@/assets/images/action2.png')}
              style={styles.actionImage}
            />
            <Text style={styles.actionTitle}>Log Activity</Text>
            <Text style={styles.actionSubtitle}>
              Record your client visits, calls, or meetings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard1} onPress={toggleModal}>
            <Image
              source={require('@/assets/images/action.png')}
              style={styles.actionImage}
            />
            <Text style={styles.actionTitle}>Set Reminder</Text>
            <Text style={styles.actionSubtitle}>
              Plan ahead! Set alerts for visits, calls, or deadlines.
            </Text>
          </TouchableOpacity>
        </View>
        <ReminderModal isModalVisible={isModalVisible} toggleModal={toggleModal} />



        {/* Reminders Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Reminders</Text>


            <View style={styles.sectionActionContainer}>

              <Text style={styles.sectionAction}>View all</Text>
              <FontAwesome size={7} color={"#2D264B"} name='chevron-right' />
            </View>
          </View>
          {
            ["#E2E2FE", "#C6C6FE", "#00002E"].map((item, index) => (
              <View
                key={item}
                style={[
                  styles.reminderCard,
                  { marginTop: index !== 0 ? -150 : 0, backgroundColor: item }, // Adjust the overlap by changing the negative value
                ]}
              >
                <View style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                  gap: 15
                }}>
                  <FontAwesome size={16} color={"white"} name='clock-o' />
                  <Text style={styles.reminderTime}>01:25 PM - 2 hours Left</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={styles.reminderTask}>
                    Schedule and confirm attendees for CRM Demo
                  </Text>
                  <FontAwesome size={16} color={"white"} name='square-o' />
                </View>
                <View style={styles.reminderFooter}>
                  <View style={styles.footerContainer}>
                    <Image
                      source={require('@/assets/images/ellipse.png')}
                    />
                    <Text style={styles.reminderFooterText}>Deloitte</Text>
                  </View>
                  <View style={styles.footerContainer}>
                    <FontAwesome size={14} color={'#000'} name='map-marker' />
                    <Text style={styles.reminderFooterText}>City, State</Text>
                  </View>
                </View>
              </View>
            ))
          }
        </View>

        {/* Activities Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Activities</Text>

            <TouchableOpacity onPress={handleNextPage}>
              <View style={styles.sectionActionContainer}>
                <Text style={styles.sectionAction}>View all</Text>
                <FontAwesome size={7} color={"#2D264B"} name='chevron-right' />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <FontAwesome size={14} color={"#000"} name='calendar' />
            <Text style={styles.activityDate}>12th January, 2025</Text>
          </View>
          {[1, 2, 3, 4].map((item) => (
            <View key={item} style={styles.activityCard}>
              <View style={styles.activityRow}>
                <Text style={styles.activityName}>Microsoft</Text>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <Text style={styles.activityTime}>2:45 PM</Text>
                  <FontAwesome size={12} color={'#6C7480'} name='bars' />
                </View>
              </View>
              <Text style={styles.activityDetail}>Contact added</Text>
              <View style={styles.reminderFooter}>
                <View style={styles.typeContainer}>
                  <Text style={{ color: "#1EBA2D", fontFamily: "Lexend", fontSize: 12 }}>Visit Type</Text>
                </View>
                <View style={styles.footerContainer}>
                  <FontAwesome size={14} color={'#000'} name='map-marker' />
                  <Text style={styles.reminderFooterText}>City, State</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    padding: 20,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greetingContainer: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  greeting: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 500,
    fontFamily: 'PlayFair',
    color: '#000068',
  },
  subGreeting: {
    fontSize: 14,
    color: '#6C7480',
    fontWeight: 300,
    fontFamily: "Lexend"
  },
  profileImageWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#E2E2FE',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  actionCard1: {
    width: '48%',
    backgroundColor: '#F7F7F7',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  actionImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 500,
    fontFamily: "Lexend",
    color: '#333',
    marginBottom: 15
  },
  actionSubtitle: {
    fontSize: 12,
    fontWeight: 300,
    fontFamily: "Lexend",
    color: '#333333',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#6C7480',
    fontWeight: 500,
    fontFamily: "Lexend"
  },
  sectionAction: {
    fontSize: 14,
    color: '#000068',
    fontFamily: "Lexend"
  },
  sectionActionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    color: '#007bff',
  },
  reminderCard: {
    borderRadius: 25,
    padding: 15,
    shadowColor: '#000',
    // shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    height: 162,
    position: 'relative', // Ensure correct layering
    zIndex: 1,
  },
  reminderTime: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Lexend',
    fontWeight: 300,
  },
  reminderTask: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Lexend',
    fontWeight: '500',
    marginBottom: 10,
  },
  reminderFooter: {
    marginTop: 'auto',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 24,
    padding: 8,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,

  },
  reminderFooterText: {
    color: "#333333",
    fontSize: 12,
    fontFamily: "Lexend",
    fontWeight: 300
  },
  activityCard: {
    backgroundColor: '#FAFAFC',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    // shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  activityDate: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    fontFamily: "Lexend"
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  activityName: {
    fontSize: 16,
    marginBottom: 15,
    fontFamily: "Lexend",
    fontWeight: 'bold',
    color: '#6C7480',
  },
  activityTime: {
    fontSize: 14,
    color: '#777',
    fontFamily: "Lexend",
  },
  activityDetail: {
    fontSize: 14,
    color: '#333',
    fontWeight: 500,
    fontFamily: "Lexend",
    marginBottom: 15
  },
  typeContainer: {
    backgroundColor: '#E9F9EA',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 20,
    color: "#1EBA2D",
    borderColor: "#1EBA2D",
    borderWidth: .5,

    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,

  },
  // Modal styles
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalOption: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    marginTop: 15,
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#d9534f',
    borderRadius: 5,
  },
  closeText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
