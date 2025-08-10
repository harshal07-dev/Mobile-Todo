# Todo App - Task Manager

A beautiful and functional todo application built with React Native and Expo, featuring modern UI design and smooth animations.

![Todo App](https://img.shields.io/badge/React%20Native-0.79.5-blue)
![Expo](https://img.shields.io/badge/Expo-53.0.20-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- ✅ **Add, Edit, Delete Todos** - Full CRUD functionality with smooth animations
- 🔍 **Smart Search & Filter** - Find todos quickly with real-time search and filter by status
- 💾 **Persistent Storage** - Uses AsyncStorage to keep your todos between app sessions
- 🎨 **Modern UI/UX** - Clean, intuitive design with beautiful animations and transitions
- 📱 **Android Optimized** - Built specifically for Android with native performance
- 🚀 **Onboarding Experience** - Beautiful welcome screens for new users
- ⌨️ **Keyboard Friendly** - Optimized for smooth typing and editing experience
- 🎯 **Accessibility** - Designed with accessibility in mind

## 🎬 Demo

### Onboarding Experience
- Beautiful welcome screens with pen/paper theme
- Smooth animations and transitions
- Interactive pagination dots

### Task Management
- Add tasks with single tap
- Edit tasks with full-screen editor
- Search and filter functionality
- Persistent storage

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router
- **Storage**: AsyncStorage
- **Icons**: Expo Vector Icons (Ionicons)
- **State Management**: React Hooks
- **Build Tool**: EAS Build

## 📱 Screenshots

### Onboarding Screens
- Welcome to Todo App
- Write & Organize
- Smart Features
- Ready to Start

### Main App
- Task List with Search
- Add New Task
- Edit Task Interface
- Settings Screen

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI
- Android Studio or physical Android device

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/harshal07-dev/Mobile-Todo.git
   cd Mobile-Todo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on Android**
   ```bash
   npm run android
   ```

## 📖 Usage

### Basic Operations

- **Add Todo**: Tap the input field, type your todo, and press the plus button
- **Complete Todo**: Tap the circle checkbox next to any todo
- **Edit Todo**: Tap on the todo text to edit it in full-screen mode
- **Delete Todo**: Tap the trash icon (confirms before deleting)

### Advanced Features

- **Search**: Use the search bar to find specific todos
- **Filter**: Switch between All, Active, and Completed todos
- **Clear Completed**: Remove all completed todos at once
- **Pull to Refresh**: Pull down on the list to refresh

## 🏗️ Architecture

```
todo-app/
├── app/                    # Main app screens
│   ├── _layout.tsx        # Root layout with onboarding
│   ├── index.tsx          # Main todo screen
│   └── settings.tsx       # Settings screen
├── components/            # Reusable UI components
│   ├── AddTodoInput.tsx   # Todo input component
│   ├── SearchBar.tsx      # Search functionality
│   ├── TodoFilters.tsx    # Filter buttons
│   ├── TodoItem.tsx       # Individual todo item
│   ├── Onboarding.tsx     # Onboarding flow
│   ├── OnboardingScreen.tsx # Individual onboarding screen
│   ├── LoadingScreen.tsx  # Loading screen
│   └── EmptyState.tsx     # Empty state display
├── hooks/                 # Custom React hooks
│   ├── useTodos.ts        # Todo state management
│   └── useOnboarding.ts   # Onboarding state management
├── types/                 # TypeScript type definitions
│   └── Todo.ts            # Todo interface
├── utils/                 # Utility functions
│   └── colorUtils.ts      # Color utilities
└── assets/                # Images and fonts
    └── images/            # App icons and images
```

## 🚀 Deployment

### Play Store Deployment

1. **Generate App Icons**
   ```bash
   npm run generate-icons
   ```
   Create the required icon files in `assets/images/`:
   - `icon.png` (1024x1024)
   - `adaptive-icon.png` (1024x1024)
   - `favicon.png` (48x48)
   - `splash-icon.png` (200x200)

2. **Build for Production**
   ```bash
   npm run build:production
   ```

3. **Submit to Play Store**
   ```bash
   npm run submit:android
   ```

### Build Profiles

- **Development**: `npm run build:android` - For testing
- **Preview**: `npm run build:preview` - Internal testing
- **Production**: `npm run build:production` - Play Store release

## 📋 Play Store Requirements

### App Icons
- ✅ Main app icon: 512x512px (PNG)
- ✅ High-res icon: 1024x1024px (PNG)
- ✅ Adaptive icon: 1024x1024px (PNG)
- ✅ Feature graphic: 1024x500px (PNG)

### Screenshots
- ✅ Screenshots: 16:9 ratio, min 320px height
- ✅ Different device sizes (phone, tablet)

### App Metadata
- ✅ App name: "Todo App - Task Manager"
- ✅ Package name: "com.harshal07dev.todoapp"
- ✅ Description: Comprehensive app description
- ✅ Keywords: todo, task manager, productivity
- ✅ Category: Productivity

## 🎨 Design Guidelines

### Color Scheme
- Primary: #4F46E5 (Indigo)
- Success: #10B981 (Green)
- Warning: #F59E0B (Amber)
- Error: #EF4444 (Red)
- Background: #F8FAFC (Light Gray)

### Typography
- Headings: Bold, 32-36px
- Body: Regular, 16px
- Captions: Medium, 12-14px

### Animations
- Smooth transitions (300-800ms)
- Spring animations for interactions
- Fade and slide effects

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Harshal Dev**
- GitHub: [@harshal07-dev](https://github.com/harshal07-dev)
- Repository: [Mobile-Todo](https://github.com/harshal07-dev/Mobile-Todo)

## 🙏 Acknowledgments

- Expo team for the amazing framework
- React Native community for continuous improvements
- Ionicons for beautiful icons
- All contributors and testers

## 📞 Support

If you have any questions or need support, please open an issue on GitHub.

---

⭐ **Star this repository if you found it helpful!**