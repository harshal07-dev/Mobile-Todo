import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  View,
  ViewToken
} from 'react-native';
import { OnboardingScreen } from './OnboardingScreen';

// Width is used in OnboardingScreen component

interface OnboardingData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;
  iconColor: string;
  backgroundColor: string;
}

const onboardingData: OnboardingData[] = [
  {
    id: '1',
    title: 'Welcome to Todo App',
    subtitle: 'Make your things done',
    description: 'Transform your productivity with our intuitive task management app. Write, organize, and complete your goals with ease.',
    icon: 'create',
    iconColor: '#4F46E5',
    backgroundColor: '#F8FAFC',
  },
  {
    id: '2',
    title: 'Write & Organize',
    subtitle: 'Pen and paper experience',
    description: 'Capture your thoughts instantly with our smooth writing interface. Organize tasks with categories and priorities.',
    icon: 'document-text',
    iconColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  {
    id: '3',
    title: 'Smart Features',
    subtitle: 'Intelligent task management',
    description: 'Set reminders, add notes, and track your progress. Our smart features help you stay on top of everything.',
    icon: 'bulb',
    iconColor: '#F59E0B',
    backgroundColor: '#FFFBEB',
  },
  {
    id: '4',
    title: 'Ready to Start?',
    subtitle: 'Let\'s get productive',
    description: 'Your journey to better organization begins now. Create your first task and experience the magic of getting things done!',
    icon: 'rocket',
    iconColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
];

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    } else {
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('onboarding_completed', 'true');
      onComplete();
    } catch (error) {
      console.error('Error saving onboarding status:', error);
      onComplete();
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const renderItem = ({ item, index }: { item: OnboardingData; index: number }) => (
    <OnboardingScreen
      title={item.title}
      subtitle={item.subtitle}
      description={item.description}
      icon={item.icon}
      iconColor={item.iconColor}
      backgroundColor={item.backgroundColor}
      isLast={index === onboardingData.length - 1}
      onNext={handleNext}
      onSkip={handleSkip}
      currentIndex={currentIndex}
      totalScreens={onboardingData.length}
      scrollX={scrollX}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        scrollEventThrottle={16}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
