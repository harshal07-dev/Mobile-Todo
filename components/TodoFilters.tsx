import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { TodoFilter } from '../types/Todo';

interface TodoFiltersProps {
  currentFilter: TodoFilter['type'];
  onFilterChange: (filter: TodoFilter['type']) => void;
  stats: {
    total: number;
    active: number;
    completed: number;
  };
  onClearCompleted: () => void;
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({
  currentFilter,
  onFilterChange,
  stats,
  onClearCompleted,
}) => {
  const filters: { key: TodoFilter['type']; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: stats.total },
    { key: 'active', label: 'Active', count: stats.active },
    { key: 'completed', label: 'Completed', count: stats.completed },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.filtersContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterButton,
              currentFilter === filter.key && styles.activeFilterButton,
            ]}
            onPress={() => onFilterChange(filter.key)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterText,
                currentFilter === filter.key && styles.activeFilterText,
              ]}
            >
              {filter.label}
            </Text>
            <Text
              style={[
                styles.filterCount,
                currentFilter === filter.key && styles.activeFilterCount,
              ]}
            >
              {filter.count}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {stats.completed > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={onClearCompleted}
          activeOpacity={0.7}
        >
          <Text style={styles.clearButtonText}>Clear Completed</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  filtersContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginHorizontal: 3,
    borderRadius: 12,
    backgroundColor: '#F7FAFC',
  },
  activeFilterButton: {
    backgroundColor: '#4F46E5',
    shadowColor: '#4F46E5',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4A5568',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  filterCount: {
    fontSize: 11,
    fontWeight: '800',
    color: '#718096',
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    minWidth: 22,
    textAlign: 'center',
  },
  activeFilterCount: {
    color: '#4F46E5',
    backgroundColor: '#FFFFFF',
  },
  clearButton: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#E53E3E',
    shadowColor: '#E53E3E',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
