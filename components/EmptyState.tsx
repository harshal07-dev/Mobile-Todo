import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface EmptyStateProps {
  searchQuery?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ searchQuery }) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name={searchQuery ? 'search' : 'checkmark-circle-outline'}
        size={64}
        color="#E0E0E0"
        style={styles.icon}
      />
      <Text style={styles.title}>
        {searchQuery ? 'No todos found' : 'All set! ✨'}
      </Text>
      <Text style={styles.subtitle}>
        {searchQuery
          ? `No todos match "${searchQuery}"`
          : 'You have no todos. Time to create your first one!'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
});
