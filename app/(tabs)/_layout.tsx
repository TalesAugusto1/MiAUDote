import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

const CustomTabBarIcon = ({
  name,
  color,
  focused,
}: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
  focused: boolean;
}) => {
  return (
    <View style={[styles.iconContainer, focused && styles.focusedIcon]}>
      <Ionicons name={name} size={24} color={color} />
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#4CC9F0",
        tabBarInactiveTintColor: "#A3A3A3",
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 50,
          right: 50,
          elevation: 8,
          backgroundColor: "#FFFFFF",
          borderRadius: 30,
          height: 65,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 0,
          maxWidth: 500,
          alignSelf: "center",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Animais",
          tabBarIcon: ({ color, focused }) => (
            <CustomTabBarIcon name="paw" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, focused }) => (
            <CustomTabBarIcon name="person" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  focusedIcon: {
    backgroundColor: "#E6F7FF",
  },
});
