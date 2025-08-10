import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

export const LoadingScreen: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const writeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const resetOnboarding = async () => {
    try {
      await AsyncStorage.removeItem('onboarding_completed');
      console.log('Onboarding reset successfully');
      // Force reload the app
      setTimeout(() => {
        // This will trigger a reload
        console.log('Reloading app...');
      }, 100);
    } catch (error) {
      console.error('Error resetting onboarding:', error);
    }
  };

  useEffect(() => {
    // Fade in animation
    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });

    // Scale up animation
    const scaleUp = Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    });

    // Continuous rotation
    const rotate = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    );

    // Writing animation
    const write = Animated.loop(
      Animated.sequence([
        Animated.timing(writeAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(writeAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    // Pulse animation
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    Animated.parallel([fadeIn, scaleUp, rotate, write, pulse]).start();
  }, [fadeAnim, scaleAnim, rotateAnim, writeAnim, pulseAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const writeOpacity = writeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <View style={styles.container}>
      {/* Background gradient effect */}
      <View style={styles.backgroundGradient} />
      
      {/* Main icon container */}
      <Animated.View
        style={[
          styles.iconContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Pen icon with rotation */}
        <Animated.View
          style={[
            styles.penContainer,
            {
              transform: [{ rotate: spin }],
            },
          ]}
        >
          <Ionicons name="create" size={60} color="#4F46E5" />
        </Animated.View>

        {/* Writing effect dots */}
        <Animated.View
          style={[
            styles.writingDots,
            {
              opacity: writeOpacity,
            },
          ]}
        >
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </Animated.View>
      </Animated.View>

      {/* App title with pulse effect */}
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: Animated.multiply(fadeAnim, 20) },
              { scale: pulseAnim },
            ],
          },
        ]}
      >
        <Text style={styles.title}>Todo App</Text>
        <Text style={styles.subtitle}>Organizing your life, one task at a time</Text>
      </Animated.View>

      {/* Loading indicator */}
      <Animated.View
        style={[
          styles.loadingIndicator,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <View style={styles.loadingDot} />
        <View style={styles.loadingDot} />
        <View style={styles.loadingDot} />
      </Animated.View>

      {/* Created by Harshal */}
      <Animated.View
        style={[
          styles.creatorContainer,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <Text style={styles.creatorText}>Created by Harshal</Text>
      </Animated.View>

      {/* Debug reset button */}
      <TouchableOpacity
        style={styles.resetButton}
        onPress={resetOnboarding}
      >
        <Text style={styles.resetButtonText}>Reset Onboarding (Debug)</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F1F5F9',
  },
  iconContainer: {
    marginBottom: 60,
    alignItems: 'center',
    position: 'relative',
  },
  penContainer: {
    marginBottom: 20,
  },
  writingDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4F46E5',
    marginHorizontal: 4,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: width * 0.8,
  },
  loadingIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  loadingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4F46E5',
    marginHorizontal: 6,
    opacity: 0.6,
  },
  creatorContainer: {
    position: 'absolute',
    bottom: 160,
    alignItems: 'center',
  },
  creatorText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  resetButton: {
    position: 'absolute',
    bottom: 100,
    backgroundColor: '#EF4444',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
