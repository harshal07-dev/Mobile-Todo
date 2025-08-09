export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  colorId?: string; // For consistent colors
}

export interface TodoFilter {
  type: 'all' | 'active' | 'completed';
}
