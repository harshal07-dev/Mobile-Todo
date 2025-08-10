import { Ionicons } from '@expo/vector-icons';
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

interface OnboardingScreenProps {
  title: string;
  subtitle: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  backgroundColor: string;
  isLast?: boolean;
  onNext: () => void;
  onSkip?: () => void;
  currentIndex: number;
  totalScreens: number;
  scrollX: Animated.Value;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  title,
  subtitle,
  description,
  icon,
  iconColor,
  backgroundColor,
  isLast = false,
  onNext,
  onSkip,
  currentIndex,
  totalScreens,
  scrollX,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const iconScale = useRef(new Animated.Value(0.5)).current;
  const iconRotate = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0.8)).current;
  const writeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Staggered animations for better visual appeal
    const animations = [
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(iconScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(iconRotate, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(buttonScale, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ];

    // Writing animation loop
    const writeLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(writeAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(writeAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );

    Animated.stagger(100, animations).start();
    writeLoop.start();
  }, [fadeAnim, slideAnim, iconScale, iconRotate, buttonScale, writeAnim]);

  const iconRotation = iconRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const writeOpacity = writeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  const renderPaginationDots = () => {
    return (
      <View style={styles.paginationContainer}>
        {Array.from({ length: totalScreens }).map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.2, 0.8],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.paginationDot,
                {
                  transform: [{ scale }],
                  opacity,
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Background pattern */}
      <View style={styles.backgroundPattern} />
      
      {/* Icon container with enhanced animations */}
      <Animated.View
        style={[
          styles.iconContainer,
          {
            opacity: fadeAnim,
            transform: [
              { scale: iconScale },
              { rotate: iconRotation },
            ],
          },
        ]}
      >
        <View style={[styles.iconBackground, { backgroundColor: `${iconColor}20` }]}>
          <Ionicons name={icon} size={80} color={iconColor} />
        </View>
        
        {/* Writing effect around icon */}
        <Animated.View
          style={[
            styles.writingEffect,
            {
              opacity: writeOpacity,
            },
          ]}
        >
          <View style={[styles.writingDot, { backgroundColor: iconColor }]} />
          <View style={[styles.writingDot, { backgroundColor: iconColor }]} />
          <View style={[styles.writingDot, { backgroundColor: iconColor }]} />
        </Animated.View>
      </Animated.View>

      {/* Content with slide animation */}
      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.description}>{description}</Text>
      </Animated.View>

      {/* Pagination dots */}
      {renderPaginationDots()}

      {/* Button container */}
      <View style={styles.buttonContainer}>
        {onSkip && !isLast && (
          <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
        
        <Animated.View
          style={[
            styles.buttonWrapper,
            {
              transform: [{ scale: buttonScale }],
            },
          ]}
        >
          <TouchableOpacity
            style={[styles.nextButton, isLast && styles.getStartedButton]}
            onPress={onNext}
          >
            <Text style={styles.nextButtonText}>
              {isLast ? 'Get Started' : 'Continue'}
            </Text>
            <Ionicons
              name={isLast ? 'checkmark' : 'arrow-forward'}
              size={20}
              color="#FFFFFF"
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    position: 'relative',
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    backgroundColor: 'transparent',
  },
  iconContainer: {
    marginBottom: 60,
    alignItems: 'center',
    position: 'relative',
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  writingEffect: {
    position: 'absolute',
    top: -20,
    right: -20,
    flexDirection: 'row',
  },
  writingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 2,
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1A202C',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#4A5568',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: width * 0.8,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4F46E5',
    marginHorizontal: 6,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 32,
    right: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  skipText: {
    fontSize: 16,
    color: '#718096',
    fontWeight: '500',
  },
  buttonWrapper: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  nextButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 18,
    paddingHorizontal: 36,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 140,
    justifyContent: 'center',
  },
  getStartedButton: {
    backgroundColor: '#10B981',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  },
});
