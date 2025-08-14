# NeoDev Mobile - Copilot Instructions

## Proyecto

Esta es una aplicación móvil React Native desarrollada con Expo que replica el dashboard web de sensores IoT. La app permite monitorear y controlar sensores de temperatura, humedad y movimiento con una interfaz moderna y responsive.

## Tecnologías Principales

- **React Native**: Framework principal para desarrollo móvil
- **Expo SDK 53**: Plataforma de desarrollo y herramientas
- **React Navigation**: Navegación entre pantallas (Stack Navigator)
- **Victory Native**: Gráficas y visualizaciones de datos
- **AsyncStorage**: Persistencia local de datos
- **Expo Linear Gradient**: Fondos degradados
- **React Hooks**: Manejo de estado y efectos

## Estructura del Proyecto

### Componentes Principales

- `src/components/LineChart.js`: Gráfica de líneas reutilizable usando Victory Native
- `src/components/SensorToggle.js`: Toggle animado para control de sensores

### Pantallas (src/screens/)

- `LoginScreen.js`: Autenticación con diseño minimalista
- `DashboardScreen.js`: Vista principal con resumen de sensores
- `TemperatureScreen.js`: Monitoreo detallado de temperatura
- `HumidityScreen.js`: Control de humedad con guías visuales
- `MovementScreen.js`: Detección de movimiento con zonas

### Navegación y Estado

- `src/navigation/AppNavigator.js`: Configuración de navegación
- `src/contexts/AuthContext.js`: Manejo de autenticación con AsyncStorage
- `src/data/mockData.js`: Datos simulados para sensores

### Estilos

- `src/styles/theme.js`: Colores, tipografía, espaciado y sombras globales

## Características de Implementación

### Sistema de Autenticación

- Login con credenciales: admin/admin
- Persistencia de sesión con AsyncStorage
- Context API para manejo global del estado de autenticación
- Logout con limpieza de datos locales

### Dashboard Interactivo

- Grid de tarjetas de sensores (2x2)
- Navegación a pantallas específicas al tocar las tarjetas
- Feed de actividad reciente
- Estadísticas rápidas del sistema
- Header con saludo personalizado y botón de logout

### Pantallas de Sensores

- Header con navegación de retorno
- Tarjeta de valor actual con icono y estado
- Toggle para activar/desactivar sensor
- Gráfica de historial de 24 horas
- Estadísticas (mínimo, máximo, promedio)
- Información contextual específica para cada sensor

### Controles y Animaciones

- Toggle Switch animado con Animated API
- Transiciones fluidas entre pantallas
- Sombras y efectos visuales modernos
- Retroalimentación visual en interacciones

## Datos Mock

Los datos simulados incluyen:

- Valores de sensores con tendencias
- Historial de 24 horas para gráficas
- Estados de actividad y eventos
- Feed de actividad reciente
- Configuraciones de alertas

## Patrones de Diseño

### Colores del Tema

- Temperatura: `#3b82f6` (azul)
- Humedad: `#10b981` (verde)
- Movimiento: `#8b5cf6` (púrpura)
- Advertencia: `#f59e0b` (naranja)
- Peligro: `#ef4444` (rojo)

### Tipografía

- Headings: System font con pesos 500-700
- Body text: System font regular
- Captions: System font 12px

### Espaciado

- xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48

## Comandos Principales

- `npm start`: Iniciar servidor de desarrollo Expo
- `npm run android`: Ejecutar en emulador Android
- `npm run ios`: Ejecutar en emulador iOS
- `npm run web`: Ejecutar en navegador web

## Consideraciones Técnicas

- Uso de SafeAreaView para compatibilidad con diferentes dispositivos
- KeyboardAvoidingView en formularios
- ScrollView para contenido desplazable
- Dimensiones responsivas usando Dimensions.get('window')
- Manejo de errores en operaciones asíncronas

## Funcionalidades Implementadas

✅ Sistema de login con validación
✅ Dashboard principal con tarjetas interactivas
✅ Navegación entre pantallas
✅ Pantallas específicas para cada sensor
✅ Gráficas interactivas con Victory Native
✅ Controles toggle animados
✅ Persistencia de autenticación
✅ Tema global con colores y estilos
✅ Datos mock para desarrollo
✅ Estructura de carpetas organizada

## Próximos Pasos Sugeridos

- Implementar notificaciones push
- Añadir más tipos de gráficas
- Integrar con API real
- Añadir configuración de alertas
- Implementar modo oscuro
- Añadir tests unitarios
- Optimizar rendimiento con React.memo
- Añadir animaciones de carga
