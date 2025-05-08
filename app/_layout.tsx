import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-reanimated";
import { UserProvider } from "../context/UserContext";
import { ModalProvider } from "../contexts/ModalContext";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ModalProvider>
      <UserProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack
            initialRouteName="login"
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right",
              animationDuration: 300,
              contentStyle: { backgroundColor: "#FFF5EB" },
              presentation: "card",
              gestureEnabled: true,
              gestureDirection: "horizontal",
              animationTypeForReplace: "push",
              fullScreenGestureEnabled: true,
            }}
          >
            <Stack.Screen
              name="login"
              options={{
                animation: "slide_from_right",
                animationDuration: 300,
              }}
            />
            <Stack.Screen
              name="signup"
              options={{
                animation: "slide_from_right",
                animationDuration: 300,
              }}
            />
            <Stack.Screen
              name="(tabs)"
              options={{
                animation: "fade",
                animationDuration: 300,
              }}
            />
            <Stack.Screen
              name="animal-details"
              options={{
                animation: "slide_from_right",
                animationDuration: 300,
              }}
            />
            <Stack.Screen
              name="+not-found"
              options={{
                animation: "fade",
                animationDuration: 300,
              }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </UserProvider>
    </ModalProvider>
  );
}
