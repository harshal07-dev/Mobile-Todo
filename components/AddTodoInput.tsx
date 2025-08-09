import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Animated,
    Keyboard,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface AddTodoInputProps {
  onAddTodo: (text: string) => void;
}

export const AddTodoInput: React.FC<AddTodoInputProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');
  const [scaleAnim] = useState(new Animated.Value(1));

  const handleSubmit = () => {
    if (text.trim()) {
      // Add enhanced animation feedback
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 0.9,
          tension: 300,
          friction: 10,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 300,
          friction: 10,
          useNativeDriver: true,
        }),
      ]).start();

      onAddTodo(text.trim());
      setText('');
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Add a new todo..."
          placeholderTextColor="#999"
          multiline
          maxLength={200}
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
          blurOnSubmit={true}
        />
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={[styles.addButton, !text.trim() && styles.addButtonDisabled]}
            onPress={handleSubmit}
            disabled={!text.trim()}
            activeOpacity={0.7}
          >
            <Ionicons
              name="add"
              size={24}
              color={text.trim() ? '#FFFFFF' : '#CCC'}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 18,
  },
  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: '#2D3748',
    marginRight: 14,
    minHeight: 24,
    maxHeight: 96,
    fontWeight: '500',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonDisabled: {
    backgroundColor: '#E2E8F0',
    shadowOpacity: 0,
    elevation: 0,
  },
});
