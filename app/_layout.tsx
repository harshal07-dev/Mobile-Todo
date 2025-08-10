import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { LoadingScreen } from "../components/LoadingScreen";
import { Onboarding } from "../components/Onboarding";
import { useOnboarding } from "../hooks/useOnboarding";

export default function RootLayout() {
  const { isOnboardingCompleted, isLoading, completeOnboarding } = useOnboarding();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // Add a longer delay to show the loading screen properly
      const timer = setTimeout(() => {
        setShowOnboarding(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (isLoading || !showOnboarding) {
    return <LoadingScreen />;
  }

  if (!isOnboardingCompleted) {
    return (
      <View style={styles.container}>
        <Onboarding onComplete={completeOnboarding} />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
