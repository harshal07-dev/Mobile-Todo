# Todo App

A beautiful and functional todo application built with React Native and Expo.

## Features

- ✅ **Add, Edit, Delete Todos** - Full CRUD functionality
- 🔍 **Search & Filter** - Find todos quickly with search and filter by status
- 💾 **Persistent Storage** - Uses AsyncStorage to keep your todos between app sessions
- 🎨 **Modern UI** - Clean, intuitive design with smooth animations
- 📱 **Android Optimized** - Built specifically for Android with native performance
- 🚀 **No Authentication Required** - Simple and easy to use

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- Android Studio or physical Android device

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Run on Android:
   ```bash
   npm run android
   ```

## Usage

### Basic Operations

- **Add Todo**: Tap the input field at the top, type your todo, and press the plus button
- **Complete Todo**: Tap the circle checkbox next to any todo
- **Edit Todo**: Tap on the todo text to edit it inline
- **Delete Todo**: Tap the trash icon (confirms before deleting)

### Advanced Features

- **Search**: Use the search bar to find specific todos
- **Filter**: Switch between All, Active, and Completed todos
- **Clear Completed**: Remove all completed todos at once
- **Pull to Refresh**: Pull down on the list to refresh

## Architecture

- **Types**: TypeScript interfaces for type safety
- **Storage**: AsyncStorage for persistent local data
- **Hooks**: Custom React hooks for state management
- **Components**: Modular, reusable UI components
- **Styling**: React Native StyleSheet with modern design principles

## File Structure

```
todo-app/
├── app/                    # Main app screens
│   ├── _layout.tsx        # Root layout
│   └── index.tsx          # Main todo screen
├── components/            # Reusable UI components
│   ├── AddTodoInput.tsx   # Todo input component
│   ├── SearchBar.tsx      # Search functionality
│   ├── TodoFilters.tsx    # Filter buttons
│   ├── TodoItem.tsx       # Individual todo item
│   └── EmptyState.tsx     # Empty state display
├── hooks/                 # Custom React hooks
│   └── useTodos.ts        # Todo state management
├── types/                 # TypeScript type definitions
│   └── Todo.ts            # Todo interface
├── utils/                 # Utility functions
│   └── todoStorage.ts     # AsyncStorage wrapper
└── assets/                # Images and fonts
```

## Technical Details

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Storage**: AsyncStorage
- **Icons**: Expo Vector Icons (Ionicons)
- **Navigation**: Expo Router
- **State Management**: React Hooks

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).