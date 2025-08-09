import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Todo } from '../types/Todo';
import { getTodoColorById } from '../utils/colorUtils';

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
  
  const todoColor = getTodoColorById(todo.colorId || todo.id);

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
    if (editText.trim() && editText.trim() !== todo.text) {
      onUpdate(todo.id, editText.trim());
    } else {
      setEditText(todo.text);
    }
    setIsEditing(false);
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
  };

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
        {isEditing ? (
          <View style={styles.editContainer}>
            <TextInput
              style={[styles.editInput, { color: todoColor.text, borderBottomColor: todoColor.accent }]}
              value={editText}
              onChangeText={setEditText}
              onSubmitEditing={handleUpdate}
              onBlur={handleUpdate}
              autoFocus
              multiline
              placeholder="Enter todo text..."
              placeholderTextColor={todoColor.text + '80'}
            />
            <View style={styles.editActions}>
              <TouchableOpacity onPress={handleUpdate} style={styles.saveButton}>
                <Ionicons name="checkmark" size={20} color="#4CAF50" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCancelEdit} style={styles.cancelButton}>
                <Ionicons name="close" size={20} color="#F44336" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <TouchableOpacity
              style={styles.textContainer}
              onPress={handleStartEdit}
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
                style={styles.actionButton}
                activeOpacity={0.7}
              >
                <Ionicons name="pencil" size={18} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                style={styles.actionButton}
                activeOpacity={0.7}
              >
                <Ionicons name="trash" size={18} color="#F44336" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 4,
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
    marginLeft: 12,
    padding: 4,
  },
  editContainer: {
    flex: 1,
  },
  editInput: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    borderBottomWidth: 2,
    paddingVertical: 6,
    marginBottom: 12,
    minHeight: 24,
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  saveButton: {
    marginRight: 12,
    padding: 4,
  },
  cancelButton: {
    padding: 4,
  },
});
