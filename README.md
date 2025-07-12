# TypingSpeed Tester

A comprehensive typing speed tester built with Next.js, TypeScript, and Tailwind CSS. Test your typing speed and accuracy with customizable paragraphs across different categories.

try it live at [TypingSpeed Tester](https://typing-speed-tester-eight.vercel.app/)

![TypingSpeed Tester](https://img.shields.io/badge/Next.js-15.3.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🚀 Features

-   **Timed Typing Tests**: Customizable test duration with real-time timer
-   **WPM & Accuracy Tracking**: Detailed statistics including Words Per Minute and accuracy percentage
-   **Multiple Categories**: Choose from Tech, Casual, or Random paragraph categories
-   **Leaderboard System**: Local leaderboard using localStorage to track your best scores
-   **Real-time Feedback**: Visual character-by-character feedback during typing
-   **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
-   **User Profiles**: Track personal statistics and progress over time
-   **Performance Analytics**: Compare current results with personal bests and averages

## 🎯 Audience

-   **Students**: Improve typing skills for academic work
-   **Typists**: Professional typing practice and skill assessment
-   **General Users**: Anyone looking to improve their typing speed and accuracy
-   **Developers**: Practice typing with programming-related content

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

-   **Node.js** (version 18.0 or higher)
-   **npm** (version 8.0 or higher) or **yarn**
-   A modern web browser (Chrome, Firefox, Safari, Edge)

## 🛠️ Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/chirag127/Typing-Speed-Tester.git
    cd Typing-Speed-Tester
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables** (optional)

    ```bash
    cp .env.example .env.local
    ```

    Currently, no environment variables are required for basic functionality.

## 🚀 Running the Project

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

### Type Checking

```bash
npm run type-check
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── CategorySelector.tsx
│   ├── Leaderboard.tsx
│   ├── Navigation.tsx
│   ├── ParagraphSelector.tsx
│   ├── Results.tsx
│   ├── StatsDisplay.tsx
│   ├── Timer.tsx
│   ├── TypingDisplay.tsx
│   ├── TypingTest.tsx
│   └── UserProfile.tsx
├── data/                  # Static data
│   └── paragraphs.ts      # Paragraph content for tests
├── types/                 # TypeScript type definitions
│   └── index.ts
└── utils/                 # Utility functions
    ├── calculations.ts    # WPM and accuracy calculations
    └── localStorage.ts    # Local storage management
```

## 🎮 How to Use

1. **Select a Category**: Choose from Tech, Casual, or Random content
2. **Pick a Paragraph**: Select a specific paragraph or use the random option
3. **Start Typing**: Click start and begin typing the displayed text
4. **Monitor Progress**: Watch your real-time WPM, accuracy, and progress
5. **View Results**: See detailed statistics after completing the test
6. **Check Leaderboard**: Compare your scores with previous attempts

## 🏆 Key Features Explained

### Paragraph Categories

-   **Tech**: Programming and technology-related content
-   **Casual**: Everyday topics and lifestyle content
-   **Random**: Mixed topics including science, history, and general knowledge

### Statistics Tracked

-   **WPM (Words Per Minute)**: Standard typing speed measurement
-   **Accuracy**: Percentage of correctly typed characters
-   **Character Count**: Correct vs incorrect character breakdown
-   **Time Elapsed**: Total time taken for the test
-   **Progress**: Real-time completion percentage

### Leaderboard Features

-   **Category Filtering**: View top scores by content category
-   **Personal Records**: Track your best WPM and accuracy scores
-   **Score Persistence**: All data stored locally in your browser
-   **Performance Comparison**: Compare current results with historical data

## 🛡️ Tech Stack

-   **Frontend Framework**: Next.js 15.3.5
-   **Language**: TypeScript 5.0
-   **Styling**: Tailwind CSS 4.0
-   **Icons**: Lucide React
-   **State Management**: React Hooks (useState, useEffect, useCallback)
-   **Data Persistence**: localStorage API
-   **Build Tool**: Next.js built-in bundler
-   **Linting**: ESLint with Next.js configuration

## 🎨 Design Features

-   **Modern UI**: Clean, professional interface design
-   **Responsive Layout**: Optimized for all device sizes
-   **Smooth Animations**: CSS transitions and animations
-   **Accessibility**: WCAG-compliant design patterns
-   **Dark Mode Ready**: CSS custom properties for theme switching
-   **Visual Feedback**: Real-time character state indicators

## 📊 Performance Metrics

The application tracks several key performance indicators:

-   **Speed Categories**: Learning (0-15 WPM), Beginner (15-30), Intermediate (30-50), Advanced (50-70), Expert (70+ WPM)
-   **Accuracy Levels**: Needs Improvement (<80%), Fair (80-90%), Good (90-95%), Very Good (95-98%), Excellent (98%+)
-   **Progress Tracking**: Character-level completion tracking
-   **Time Management**: Configurable test duration with countdown timer

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Chirag Singhal** ([@chirag127](https://github.com/chirag127))

## 🙏 Acknowledgments

-   Next.js team for the excellent framework
-   Tailwind CSS for the utility-first CSS framework
-   Lucide React for the beautiful icon set
-   The open-source community for inspiration and resources

---

**Last Updated**: July 12, 2025, 04:34:40 UTC

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
