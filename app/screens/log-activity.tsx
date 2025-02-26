import { View, Text, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";

const LogActivity = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      <Pressable onPress={() => router.back()} style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, color: "blue" }}>← Back</Text>
      </Pressable>

      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>Log Activity</Text>

      <TextInput
        placeholder="Select Date"
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 10,
          borderRadius: 8,
          marginBottom: 10,
        }}
      />
      <TextInput
        placeholder="Client"
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 10,
          borderRadius: 8,
          marginBottom: 10,
        }}
      />
      <TextInput
        placeholder="Activity"
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 10,
          borderRadius: 8,
          marginBottom: 10,
        }}
      />
      <TextInput
        placeholder="Purpose"
        multiline
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 10,
          borderRadius: 8,
          height: 80,
          marginBottom: 10,
        }}
      />
      <TextInput
        placeholder="Achievement"
        multiline
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 10,
          borderRadius: 8,
          height: 80,
          marginBottom: 20,
        }}
      />

      <Pressable
        style={{
          backgroundColor: "#000066",
          padding: 15,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Save Activity</Text>
      </Pressable>
    </View>
  );
};

export default LogActivity;
