# SmartDash - Modern Dashboard Frontend

A modern, responsive dashboard frontend built with React and Vite, featuring sensor monitoring, data visualization, and real-time analytics.

## 🚀 Features

- **Modern Design**: Clean, professional UI with smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Sensor Monitoring**: Real-time sensor data cards with trend indicators
- **Data Visualization**: Interactive charts using Recharts library
- **Activity Feed**: Real-time activity monitoring and notifications
- **Dark/Light Theme**: Toggle between dark and light modes
- **Component Architecture**: Well-organized, reusable React components

## 🛠️ Tech Stack

- **React 18** - Modern React with functional components and hooks
- **Vite** - Fast build tool and development server
- **Recharts** - Beautiful, composable charts
- **Lucide React** - Modern icon library
- **CSS Modules** - Scoped styling with CSS variables
- **ES6+** - Modern JavaScript features

## 📁 Project Structure

```
src/
├── components/
│   ├── Cards/
│   │   ├── SensorCard.jsx      # Sensor data display cards
│   │   └── StatsCard.jsx       # Statistics cards
│   ├── Charts/
│   │   ├── LineChart.jsx       # Line chart component
│   │   └── PieChart.jsx        # Pie chart component
│   ├── Dashboard/
│   │   ├── Dashboard.jsx       # Main dashboard layout
│   │   └── ActivityFeed.jsx    # Activity feed component
│   └── Layout/
│       ├── Sidebar.jsx         # Navigation sidebar
│       └── TopBar.jsx          # Top navigation bar
├── data/
│   └── mockData.js             # Mock data for development
├── styles/
│   └── global.css              # Global styles and variables
└── App.jsx                     # Main application component
```

## 🎨 Dashboard Components

### Sensor Cards

- Temperature, Humidity, Pressure, Air Quality
- Real-time values with trend indicators
- Color-coded status indicators

### Charts & Analytics

- Line charts for temperature and humidity trends
- Pie chart for energy consumption breakdown
- Responsive design with hover interactions

### Activity Feed

- Real-time system notifications
- Categorized activity types (alerts, warnings, info)
- Scrollable feed with timestamps

### Navigation

- Collapsible sidebar with modern icons
- Top bar with search, notifications, and user menu
- Mobile-responsive hamburger menu

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd fronti
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:

- **Desktop** (1200px+): Full sidebar and multi-column layouts
- **Tablet** (768px - 1199px): Collapsed navigation and adjusted grids
- **Mobile** (< 768px): Stacked layouts and touch-friendly interfaces

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🔧 Customization

### Adding New Sensors

1. Update `src/data/mockData.js` with new sensor data
2. Add corresponding icons from Lucide React
3. Define color schemes in CSS variables

### Creating New Charts

1. Create new chart components in `src/components/Charts/`
2. Use Recharts components for consistency
3. Follow the existing styling patterns

### Theme Customization

- Modify CSS variables in `src/styles/global.css`
- Colors, shadows, and spacing are all customizable
- Dark mode variants included

## 🌟 Future Enhancements

- [ ] Real-time data integration with WebSocket
- [ ] Advanced filtering and search functionality
- [ ] Export functionality for charts and data
- [ ] User authentication and role management
- [ ] Mobile app version with React Native
- [ ] Advanced analytics and machine learning insights

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and questions, please open an issue in the GitHub repository.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
