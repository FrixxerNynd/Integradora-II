# NeoDev Mobile - Dashboard IoT

Aplicación móvil React Native para el monitoreo y control de sensores IoT.

## 🚀 Características

### 📱 Pantallas Principales

- **Login**: Autenticación con diseño minimalista y elegante
- **Dashboard**: Vista general de todos los sensores con tarjetas interactivas
- **Temperatura**: Monitoreo detallado con gráficas y controles
- **Humedad**: Seguimiento de humedad relativa con guías visuales
- **Movimiento**: Detección de actividad con zonas y timeline

### 🎨 Diseño

- **UI Moderna**: Colores neutros, sombras suaves y tipografía limpia
- **Responsive**: Optimizado para diferentes tamaños de pantalla
- **Animaciones**: Transiciones fluidas y toggles animados
- **Accesibilidad**: Contraste adecuado y elementos táctiles grandes

### 🔧 Tecnologías

- **React Native**: Framework principal
- **Expo**: Plataforma de desarrollo
- **React Navigation**: Navegación entre pantallas
- **Victory Native**: Gráficas y visualizaciones
- **AsyncStorage**: Persistencia local de datos
- **Expo Linear Gradient**: Fondos degradados

## 📦 Instalación

### Prerrequisitos

- Node.js 16+
- Expo CLI
- Git

### Configuración del Proyecto

```bash
# Clonar el repositorio
git clone <repository-url>
cd movilI

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm start
```

### Desarrollo

```bash
# Para Android
npm run android

# Para iOS
npm run ios

# Para Web
npm run web
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── LineChart.js     # Gráfica de líneas
│   └── SensorToggle.js  # Control toggle personalizado
├── contexts/            # Contextos de React
│   └── AuthContext.js   # Manejo de autenticación
├── data/               # Datos mock y constantes
│   └── mockData.js     # Datos simulados de sensores
├── navigation/         # Configuración de navegación
│   └── AppNavigator.js # Navigator principal
├── screens/           # Pantallas de la aplicación
│   ├── LoginScreen.js
│   ├── DashboardScreen.js
│   ├── TemperatureScreen.js
│   ├── HumidityScreen.js
│   └── MovementScreen.js
└── styles/           # Estilos globales
    └── theme.js      # Colores, tipografía y espaciado
```

## 🎯 Funcionalidades

### 🔐 Autenticación

- Login con usuario/contraseña
- Persistencia de sesión con AsyncStorage
- Logout seguro
- Credenciales demo: `admin` / `admin`

### 📊 Dashboard

- Vista general de 4 sensores principales
- Tarjetas interactivas con valores en tiempo real
- Feed de actividad reciente
- Estadísticas del sistema
- Navegación a pantallas específicas

### 🌡️ Sensores Individuales

- **Temperatura**: Control, gráficas, estadísticas y alertas
- **Humedad**: Niveles óptimos, guías visuales y configuración
- **Movimiento**: Zonas de detección, timeline y eventos

### 🎛️ Controles

- Toggles animados para activar/desactivar sensores
- Estados visuales claros (activo/inactivo)
- Retroalimentación táctil

## 🎨 Tema y Estilos

### Paleta de Colores

- **Primario**: `#3b82f6` (Azul)
- **Secundario**: `#10b981` (Verde)
- **Accent**: `#8b5cf6` (Púrpura)
- **Warning**: `#f59e0b` (Naranja)
- **Temperatura**: `#3b82f6`
- **Humedad**: `#10b981`
- **Movimiento**: `#8b5cf6`

### Tipografía

- **H1**: 32px, Bold
- **H2**: 24px, SemiBold
- **H3**: 20px, SemiBold
- **Body**: 16px, Regular
- **Caption**: 12px, Regular

## 📱 Pantallas

### Login

- Fondo degradado con formas decorativas
- Campos de entrada con iconos
- Toggle de visibilidad de contraseña
- Botón de carga animado
- Credenciales demo visibles

### Dashboard

- Header con saludo personalizado y logout
- Grid de sensores (2x2)
- Feed de actividad reciente
- Estadísticas rápidas del sistema

### Sensores (Temperatura/Humedad/Movimiento)

- Header con navegación de retorno
- Tarjeta de valor actual con toggle
- Gráfica de historial (24 horas)
- Estadísticas (min/max/promedio)
- Información contextual específica

## 🔄 Estados de Datos

### Mock Data

- Datos simulados para desarrollo
- Valores realistas de sensores
- Historial de 24 horas
- Estados de actividad
- Feed de eventos

### Persistencia

- Autenticación guardada localmente
- Estados de sensores persistentes
- Configuraciones de usuario

## 🚀 Deployment

### Build para Producción

```bash
# Build para Android
expo build:android

# Build para iOS
expo build:ios

# Publicar en Expo
expo publish
```

### Configuración de Producción

- Actualizar `app.json` con información de la app
- Configurar iconos y splash screen
- Establecer permisos necesarios
- Configurar notificaciones push (opcional)

## 🤝 Contribución

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver [LICENSE.md](LICENSE.md) para detalles.

## 👥 Equipo

- **Desarrollo**: NeoDev Team
- **Diseño UI/UX**: Mobile First Approach
- **Testing**: Cross-platform Testing

---

Desarrollado con ❤️ usando React Native y Expo
