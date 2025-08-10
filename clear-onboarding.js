const AsyncStorage = require('@react-native-async-storage/async-storage');

async function clearOnboarding() {
  try {
    await AsyncStorage.removeItem('onboarding_completed');
    console.log('Onboarding status cleared successfully!');
  } catch (error) {
    console.error('Error clearing onboarding:', error);
  }
}

clearOnboarding();
