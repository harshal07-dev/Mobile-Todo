import { useCallback, useEffect, useState } from 'react';
import { Todo, TodoFilter } from '../types/Todo';
import { todoStorage } from '../utils/todoStorage';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter['type']>('all');
  const [loading, setLoading] = useState(true);
  const [newTodoId, setNewTodoId] = useState<string | null>(null);

  // Load todos on mount
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    setLoading(true);
    try {
      const loadedTodos = await todoStorage.loadTodos();
      setTodos(loadedTodos);
    } catch (error) {
      console.error('Failed to load todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    try {
      const newTodo = await todoStorage.addTodo(text);
      setTodos(prev => [newTodo, ...prev]);
      setNewTodoId(newTodo.id);
      
      // Clear the newTodoId after animation completes
      setTimeout(() => setNewTodoId(null), 600);
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  }, []);

  const updateTodo = useCallback(async (id: string, text: string) => {
    if (!text.trim()) return;
    
    try {
      await todoStorage.updateTodo(id, { text });
      setTodos(prev => prev.map(todo => 
        todo.id === id ? { ...todo, text, updatedAt: new Date() } : todo
      ));
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  }, []);

  const toggleTodo = useCallback(async (id: string) => {
    try {
      await todoStorage.toggleTodo(id);
      setTodos(prev => prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed, updatedAt: new Date() } : todo
      ));
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  }, []);

  const deleteTodo = useCallback(async (id: string) => {
    try {
      await todoStorage.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  }, []);

  const clearCompleted = useCallback(async () => {
    try {
      await todoStorage.clearCompleted();
      setTodos(prev => prev.filter(todo => !todo.completed));
    } catch (error) {
      console.error('Failed to clear completed todos:', error);
    }
  }, []);

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    // Apply filter
    if (filter === 'active' && todo.completed) return false;
    if (filter === 'completed' && !todo.completed) return false;
    
    return true;
  });

  const stats = {
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length,
  };

  return {
    todos: filteredTodos,
    allTodos: todos,
    filter,
    setFilter,
    loading,
    stats,
    newTodoId,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    refreshTodos: loadTodos,
  };
};
