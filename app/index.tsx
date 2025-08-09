import React from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AddTodoInput } from '../components/AddTodoInput';
import { SearchBar } from '../components/SearchBar';
import { TodoFilters } from '../components/TodoFilters';
import { TodoItem } from '../components/TodoItem';
import { useTodos } from '../hooks/useTodos';

export default function TodoApp() {
  const {
    todos,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    loading,
    stats,
    newTodoId,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    refreshTodos,
  } = useTodos();

  const renderTodoItem = ({ item }: { item: any }) => (
    <TodoItem
      todo={item}
      onToggle={toggleTodo}
      onUpdate={updateTodo}
      onDelete={deleteTodo}
      isNew={item.id === newTodoId}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>
        {searchQuery ? 'No todos found' : 'No todos yet'}
      </Text>
      <Text style={styles.emptySubtitle}>
        {searchQuery
          ? 'Try adjusting your search'
          : 'Add your first todo to get started!'}
      </Text>
    </View>
  );

  const ListHeaderComponent = () => (
    <View>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Stay organized and productive</Text>
      </View>
      
      <AddTodoInput onAddTodo={addTodo} />
      
      {stats.total > 0 && (
        <>
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <TodoFilters
            currentFilter={filter}
            onFilterChange={setFilter}
            stats={stats}
            onClearCompleted={clearCompleted}
          />
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refreshTodos} />
        }
        contentContainerStyle={[
          styles.listContent,
          todos.length === 0 && styles.emptyListContent,
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F3F4',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 49,
    paddingBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#1A202C',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 20,
    paddingTop: 10,
    color: '#07004D',
    fontWeight: '500',
    fontStyle: 'italic',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 24,
  },
});
