import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Todo } from '../types/Todo';
import { getTodoColorById } from '../utils/colorUtils';

const { height: screenHeight } = Dimensions.get('window');

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  isNew?: boolean;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onUpdate,
  onDelete,
  isNew = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [scaleAnim] = useState(new Animated.Value(1));
  const slideAnim = useRef(new Animated.Value(isNew ? -100 : 0)).current;
  const fadeAnim = useRef(new Animated.Value(isNew ? 0 : 1)).current;
  const bounceAnim = useRef(new Animated.Value(isNew ? 0.8 : 1)).current;
  const editSlideAnim = useRef(new Animated.Value(0)).current;
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  
  const todoColor = getTodoColorById(todo.colorId || todo.id);
  const inputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  // Keyboard handling
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        // Auto-scroll to top when keyboard appears for better UX
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({ y: 0, animated: true });
        }, 100);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  // Entrance animation for new todos
  useEffect(() => {
    if (isNew) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(bounceAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isNew, slideAnim, fadeAnim, bounceAnim]);

  // Animation for edit mode
  useEffect(() => {
    if (isEditing) {
      Animated.timing(editSlideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Delay focus to ensure animation completes
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      });
    } else {
      Animated.timing(editSlideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isEditing, editSlideAnim]);

  const handleToggle = () => {
    // Add subtle animation when toggling
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    onToggle(todo.id);
  };

  const handleUpdate = () => {
    const trimmedText = editText.trim();
    if (trimmedText && trimmedText !== todo.text) {
      onUpdate(todo.id, trimmedText);
    } else if (!trimmedText) {
      // If empty, delete the todo
      onDelete(todo.id);
      return;
    }
    setIsEditing(false);
    Keyboard.dismiss();
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this todo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(todo.id),
        },
      ]
    );
  };

  const handleStartEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText(todo.text);
    Keyboard.dismiss();
  };

  const handleKeyPress = (e: any) => {
    if (e.nativeEvent.key === 'Escape') {
      handleCancelEdit();
    }
  };

  if (isEditing) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { minHeight: screenHeight - keyboardHeight - 100 }
          ]}
          showsVerticalScrollIndicator={false}
          bounces={true}
          alwaysBounceVertical={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="none"
        >
          <View style={styles.editWrapper}>
            <Animated.View 
              style={[
                styles.editContainer, 
                {
                  backgroundColor: todoColor.background,
                  borderColor: todoColor.border,
                  transform: [
                    { scale: Animated.multiply(scaleAnim, bounceAnim) },
                    { translateX: slideAnim }
                  ],
                  opacity: fadeAnim,
                }
              ]}
            >
              <View style={styles.editHeader}>
                <Text style={[styles.editTitle, { color: todoColor.text }]}>
                  Edit Todo
                </Text>
                <TouchableOpacity onPress={handleCancelEdit} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>

              <View style={styles.editContent}>
                <TextInput
                  ref={inputRef}
                  style={[
                    styles.editInput, 
                    { 
                      color: todoColor.text, 
                      borderColor: todoColor.accent,
                      backgroundColor: 'rgba(255,255,255,0.95)',
                    }
                  ]}
                  value={editText}
                  onChangeText={setEditText}
                  onSubmitEditing={handleUpdate}
                  onKeyPress={handleKeyPress}
                  multiline
                  placeholder="Edit your todo..."
                  placeholderTextColor={todoColor.text + '60'}
                  returnKeyType="done"
                  blurOnSubmit={false}
                  textAlignVertical="top"
                  maxLength={200}
                  autoCorrect={false}
                />
                
                <View style={styles.editActions}>
                  <TouchableOpacity 
                    onPress={handleCancelEdit} 
                    style={[styles.actionButton, styles.cancelButton]}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="close-circle" size={20} color="#F44336" />
                    <Text style={styles.actionText}>Cancel</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    onPress={handleUpdate} 
                    style={[styles.actionButton, styles.saveButton]}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                    <Text style={styles.actionText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <Animated.View 
      style={[
        styles.container, 
        {
          backgroundColor: todoColor.background,
          borderColor: todoColor.border,
          transform: [
            { scale: Animated.multiply(scaleAnim, bounceAnim) },
            { translateX: slideAnim }
          ],
          opacity: fadeAnim,
        }
      ]}
    >
      <TouchableOpacity
        style={[
          styles.checkbox, 
          { borderColor: todoColor.accent },
          todo.completed && { backgroundColor: todoColor.accent }
        ]}
        onPress={handleToggle}
        activeOpacity={0.7}
      >
        {todo.completed && (
          <Ionicons name="checkmark" size={16} color="#FFFFFF" />
        )}
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.textContainer}
          onPress={handleStartEdit}
          onLongPress={handleStartEdit}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.todoText,
              { color: todo.completed ? todoColor.text + '60' : todoColor.text },
              todo.completed && styles.completedText,
            ]}
            numberOfLines={3}
          >
            {todo.text}
          </Text>
        </TouchableOpacity>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={handleStartEdit}
            style={[styles.actionButton, styles.editButton]}
            activeOpacity={0.7}
          >
            <Ionicons name="pencil" size={18} color="#666" />
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDelete}
            style={[styles.actionButton, styles.deleteButton]}
            activeOpacity={0.7}
          >
            <Ionicons name="trash" size={18} color="#F44336" />
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  editWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    padding: 18,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  editContainer: {
    borderRadius: 16,
    padding: 0,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    minHeight: 250,
    maxWidth: '100%',
    width: '100%',
  },
  editHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  editTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  editContent: {
    padding: 18,
    flex: 1,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2.5,
    marginRight: 14,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    marginBottom: 8,
    paddingVertical: 4,
  },
  todoText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    flexWrap: 'wrap',
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  editButton: {
    backgroundColor: 'rgba(102,102,102,0.1)',
  },
  deleteButton: {
    backgroundColor: 'rgba(244,67,54,0.1)',
  },
  saveButton: {
    backgroundColor: 'rgba(76,175,80,0.1)',
  },
  cancelButton: {
    backgroundColor: 'rgba(244,67,54,0.1)',
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
    color: '#666',
  },
  editInput: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
    minHeight: 120,
    borderRadius: 8,
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
});
