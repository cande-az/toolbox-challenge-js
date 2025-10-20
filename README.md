# 📁 Toolbox Challenge - Full Stack JavaScript

Una aplicación full stack desarrollada con Node.js y React que permite visualizar y filtrar datos de archivos CSV obtenidos desde una API externa.

## 🎯 Descripción General

Este proyecto consiste en dos aplicaciones principales:

- **API Backend**: Servidor Express que consume datos de una API externa y los procesa
- **Frontend React**: Interfaz de usuario para visualizar y filtrar los datos CSV

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js 14+** (para el API)
- **Node.js 16+** (para el Frontend)
- **npm** o **yarn**

### Verificar versiones

```bash
node --version
npm --version
```

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd toolbox-challenge-js
```

### 2. Configurar el API (Backend)

```bash
# Navegar a la carpeta del API
cd files-api

# Instalar dependencias
npm install

# Iniciar el servidor (puerto 3001)
npm start
```

**Comandos adicionales para el API:**

```bash
# Ejecutar tests
npm test

# Acceder a la documentación Swagger
# Abrir en el navegador: http://localhost:3001/api-docs
```

### 3. Configurar el Frontend

```bash
# Navegar a la carpeta del Frontend
cd files-ui

# Instalar dependencias
npm install

# Iniciar la aplicación (puerto 3000)
npm start
```

**Comandos adicionales para el Frontend:**

```bash
# Ejecutar tests
npm test

# Ejecutar linter
npm run lint

# Corregir errores de linting automáticamente
npm run lint:fix
```

## ⚡ Orden de Ejecución

**IMPORTANTE**: Para que la aplicación funcione correctamente:

1. **Primero** levantar el API:

   ```bash
   cd files-api
   npm start
   ```

   El API estará disponible en `http://localhost:3001`

2. **Después** levantar el Frontend:

   ```bash
   cd files-ui
   npm start
   ```

   El Frontend estará disponible en `http://localhost:3000`

3. El frontend se conecta automáticamente al API en `localhost:3001`

## 🏗️ Arquitectura del Proyecto

```
toolbox-challenge-js/
├── files-api/                 # Backend API
│   ├── src/
│   │   ├── config/           # Configuración (envs, swagger)
│   │   ├── controllers/      # Controladores de rutas
│   │   ├── routes/           # Definición de rutas
│   │   ├── services/         # Lógica de negocio
│   │   └── utils/            # Utilidades (CSV parser)
│   ├── test/                 # Tests del API
│   └── package.json
├── files-ui/                 # Frontend React
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   ├── config/           # Configuración
│   │   ├── hooks/            # Custom hooks
│   │   ├── services/         # Servicios HTTP
│   │   ├── store/            # Redux store
│   │   └── styles/           # Estilos CSS
│   └── package.json
└── README.md
```

## 🔧 Resumen Técnico

### 📡 API (files-api)

**Tecnologías:**

- **Node.js 14** - Runtime de JavaScript
- **Express 5** - Framework web
- **JavaScript ES6+** - Lenguaje de programación
- **Axios** - Cliente HTTP para llamadas a API externa
- **csv-parser** - Procesamiento de archivos CSV
- **Mocha + Chai** - Framework de testing
- **Swagger UI** - Documentación interactiva de API
- **CORS** - Habilitado para comunicación cross-origin

**Características:**

- API REST que consume datos de API externa
- Procesamiento y formateo de archivos CSV
- Documentación automática con Swagger
- Tests unitarios completos
- Manejo de errores robusto

### 🎨 Frontend (files-ui)

**Tecnologías:**

- **Node.js 16** - Runtime de JavaScript
- **React 19** - Biblioteca de UI con Hooks (programación funcional)
- **JavaScript ES6+** - Lenguaje de programación
- **React Bootstrap 2** - Framework de UI responsive
- **Redux 5** - Manejo de estado global
- **Jest + React Testing Library** - Framework de testing
- **StandardJS** - Linter y formateador de código
- **Axios** - Cliente HTTP para comunicación con API

**Características:**

- Interfaz responsive y moderna
- Filtrado dinámico de datos
- Visualización en tabla y tarjetas
- Manejo de estados de carga y errores
- Tests unitarios para todos los componentes
- Integración con Redux para estado global

## 🌐 Endpoints Disponibles (API)

| Método | Endpoint                      | Descripción                                        |
| ------ | ----------------------------- | -------------------------------------------------- |
| `GET`  | `/files/list`                 | Obtiene la lista de archivos disponibles           |
| `GET`  | `/files/data`                 | Obtiene todos los datos procesados de archivos CSV |
| `GET`  | `/files/data?fileName=<name>` | Obtiene datos de un archivo específico             |
| `GET`  | `/api-docs`                   | Documentación interactiva de la API (Swagger)      |

## ✨ Funcionalidades (Frontend)

- **📊 Visualización de datos**: Tabla y vista de tarjetas para datos CSV
- **🔍 Filtrado**: Dropdown para filtrar por archivo específico
- **📈 Contador de resultados**: Muestra cantidad de registros encontrados
- **⚠️ Manejo de errores**: Alertas informativas con opción de reintento
- **⏳ Estados de carga**: Spinner durante la carga de datos
- **📱 Diseño responsive**: Adaptable a diferentes tamaños de pantalla
- **🔄 Actualización automática**: Sincronización con parámetros de URL

## 🧪 Testing

### API Tests

```bash
cd files-api
npm test
```

- Tests de controladores
- Tests de servicios
- Tests de utilidades (CSV parser)
- Tests de servidor

### Frontend Tests

```bash
cd files-ui
npm test
```

- Tests de todos los componentes React
- Tests de integración con Redux
- Tests de hooks personalizados
- Tests de servicios HTTP

## 📚 Documentación Adicional

- **API Documentation**: `http://localhost:3001/api-docs` (cuando el API esté ejecutándose)
- **Swagger External API**: https://echo-serv.tbxnet.com/explorer/#/Secret

## 📝 Notas de Desarrollo

- El proyecto sigue las mejores prácticas de JavaScript ES6+
- Todos los componentes React utilizan programación funcional con Hooks
- El código está formateado con StandardJS
- Los tests cubren funcionalidad crítica de ambos proyectos
- La API externa requiere autenticación con Bearer token

---