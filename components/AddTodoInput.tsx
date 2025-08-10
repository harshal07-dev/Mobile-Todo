import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

interface AddTodoInputProps {
  onAddTodo: (text: string) => void;
}

export const AddTodoInput: React.FC<AddTodoInputProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));
  const [fadeAnim] = useState(new Animated.Value(0));
  const inputRef = useRef<TextInput>(null);

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
      // Don't dismiss keyboard, keep focus for quick adding
      inputRef.current?.focus();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleClear = () => {
    setText('');
    inputRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}>
        <View style={styles.inputWrapper}>
          <Ionicons 
            name="create" 
            size={20} 
            color={isFocused ? '#4F46E5' : '#999'} 
            style={styles.inputIcon}
          />
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="What needs to be done?"
            placeholderTextColor="#999"
            multiline
            maxLength={200}
            onSubmitEditing={handleSubmit}
            onFocus={handleFocus}
            onBlur={handleBlur}
            returnKeyType="done"
            blurOnSubmit={false}
            autoCorrect={false}
          />
          {text.length > 0 && (
            <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
        
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={[
              styles.addButton, 
              !text.trim() && styles.addButtonDisabled,
              isFocused && styles.addButtonFocused
            ]}
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
      
      <Animated.View 
        style={[
          styles.characterCount,
          { opacity: fadeAnim }
        ]}
      >
        <Text style={styles.characterCountText}>
          {text.length}/200 characters
        </Text>
      </Animated.View>
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
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 16,
  },
  inputContainerFocused: {
    borderColor: '#4F46E5',
    backgroundColor: '#F8FAFC',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    paddingVertical: 8,
    minHeight: 24,
    maxHeight: 120,
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
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
    backgroundColor: '#E5E7EB',
    shadowOpacity: 0,
    elevation: 0,
  },
  addButtonFocused: {
    backgroundColor: '#3730A3',
  },
  characterCount: {
    paddingHorizontal: 18,
    paddingBottom: 8,
  },
  characterCountText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
});
