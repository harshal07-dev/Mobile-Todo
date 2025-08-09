import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        value={searchQuery}
        onChangeText={onSearchChange}
        placeholder="Search todos..."
        placeholderTextColor="#999"
        returnKeyType="search"
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Ionicons name="close-circle" size={20} color="#999" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 10,
    paddingHorizontal: 18,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  searchIcon: {
    marginRight: 14,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2D3748',
    fontWeight: '500',
  },
  clearButton: {
    marginLeft: 10,
    padding: 2,
  },
});
