"use client";

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Animated,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useLogin } from "@/services/queries/auth/login";

const LoginScreen = () => {
  const router = useRouter();
  const { login, logging } = useLogin(() => {
    router.push("/(tabs)?header=false"); // Navigate on successful login
  });

  const [logoFade] = useState(new Animated.Value(0));
  const [logoPosition] = useState(new Animated.Value(150));
  const [contentFade] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoFade, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(logoPosition, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(contentFade, {
      toValue: 1,
      duration: 1500,
      delay: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = () => {
    login({ email: "thato.meso@sita.co.za" }); // Replace with actual email input
  };

  return (
    <ImageBackground
      source={require("@/assets/images/login-bg.jpg")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.innerContainer}>
        <Animated.View
          style={[
            styles.logoContainer,
            { opacity: logoFade, transform: [{ translateY: logoPosition }] },
          ]}
        >
          <Image
            source={require("@/assets/images/logo-bluechip.png")}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View style={[styles.textContainer, { opacity: contentFade }]}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Sign in to get started</Text>

          {/* Show loading indicator when logging in */}
          <TouchableOpacity onPress={handleLogin} disabled={logging}>
            {logging ? (
              <ActivityIndicator color="white" />
            ) : (
              <Image
                source={require("@/assets/images/button.png")}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>

          <View style={styles.tip}>
            <Image source={require("@/assets/images/Pin.png")} />
            <Text style={styles.tip_text}>
              Tip: Ensure you log your activity at the site to keep your records
              precise.
            </Text>
          </View>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

const commonStyles = {
  fontFamily: "Lexend", // Generalized font family
  color: "white",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    flexDirection: "column",
    gap: 40,
    backgroundColor: "#00002EB2",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "500",
    marginBottom: 20,
    ...commonStyles,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    ...commonStyles,
  },
  tip: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    ...commonStyles,
  },
  tip_text: {
    fontSize: 12,
    ...commonStyles,
  },
  // button: { alignItems: 'center', justifyContent: 'center', height: 50 },
});

export default LoginScreen;
