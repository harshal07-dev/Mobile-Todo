import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from '../types/Todo';

const TODOS_STORAGE_KEY = '@todos';

export const todoStorage = {
  async loadTodos(): Promise<Todo[]> {
    try {
      const todosJson = await AsyncStorage.getItem(TODOS_STORAGE_KEY);
      if (todosJson) {
        const todos = JSON.parse(todosJson);
        // Convert date strings back to Date objects
        return todos.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt),
        }));
      }
      return [];
    } catch (error) {
      console.error('Error loading todos:', error);
      return [];
    }
  },

  async saveTodos(todos: Todo[]): Promise<void> {
    try {
      const todosJson = JSON.stringify(todos);
      await AsyncStorage.setItem(TODOS_STORAGE_KEY, todosJson);
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  },

  async addTodo(text: string): Promise<Todo> {
    const todos = await this.loadTodos();
    const todoId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const newTodo: Todo = {
      id: todoId,
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      colorId: todoId, // Use ID for consistent colors
    };
    
    const updatedTodos = [newTodo, ...todos];
    await this.saveTodos(updatedTodos);
    return newTodo;
  },

  async updateTodo(id: string, updates: Partial<Todo>): Promise<void> {
    const todos = await this.loadTodos();
    const updatedTodos = todos.map(todo => 
      todo.id === id 
        ? { ...todo, ...updates, updatedAt: new Date() }
        : todo
    );
    await this.saveTodos(updatedTodos);
  },

  async deleteTodo(id: string): Promise<void> {
    const todos = await this.loadTodos();
    const filteredTodos = todos.filter(todo => todo.id !== id);
    await this.saveTodos(filteredTodos);
  },

  async toggleTodo(id: string): Promise<void> {
    const todos = await this.loadTodos();
    const updatedTodos = todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
        : todo
    );
    await this.saveTodos(updatedTodos);
  },

  async clearCompleted(): Promise<void> {
    const todos = await this.loadTodos();
    const activeTodos = todos.filter(todo => !todo.completed);
    await this.saveTodos(activeTodos);
  }
};
