export interface TodoColor {
  background: string;
  border: string;
  text: string;
  accent: string;
}

export const todoColors: TodoColor[] = [
  {
    background: '#FFF5F5', // Light Rose
    border: '#FED7D7',
    text: '#744C4C',
    accent: '#F56565',
  },
  {
    background: '#F0FFF4', // Light Green
    border: '#C6F6D5',
    text: '#276749',
    accent: '#48BB78',
  },
  {
    background: '#FFFAF0', // Light Orange
    border: '#FEEBC8',
    text: '#C05621',
    accent: '#ED8936',
  },
  {
    background: '#EBF8FF', // Light Blue
    border: '#BEE3F8',
    text: '#2A69AC',
    accent: '#4299E1',
  },
  {
    background: '#FAF5FF', // Light Purple
    border: '#E9D8FD',
    text: '#553C9A',
    accent: '#9F7AEA',
  },
  {
    background: '#F7FAFC', // Light Gray
    border: '#E2E8F0',
    text: '#4A5568',
    accent: '#718096',
  },
  {
    background: '#FFFBEB', // Light Yellow
    border: '#FEF5E7',
    text: '#B7791F',
    accent: '#F6E05E',
  },
  {
    background: '#F0F9FF', // Light Cyan
    border: '#BAE6FD',
    text: '#0C4A6E',
    accent: '#0284C7',
  },
  {
    background: '#FEFCE8', // Light Lime
    border: '#D9F99D',
    text: '#365314',
    accent: '#65A30D',
  },
  {
    background: '#FDF2F8', // Light Pink
    border: '#FBCFE8',
    text: '#831843',
    accent: '#EC4899',
  },
];

export const getRandomTodoColor = (): TodoColor => {
  const randomIndex = Math.floor(Math.random() * todoColors.length);
  return todoColors[randomIndex];
};

export const getTodoColorByIndex = (index: number): TodoColor => {
  return todoColors[index % todoColors.length];
};

export const getTodoColorById = (id: string): TodoColor => {
  // Use the ID to generate a consistent color for each todo
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    const char = id.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  const index = Math.abs(hash) % todoColors.length;
  return todoColors[index];
};
