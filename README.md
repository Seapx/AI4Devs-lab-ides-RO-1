# LTI - Sistema de Seguimiento de Talento

Este proyecto es una aplicación full-stack con un frontend en React y un backend en Express usando Prisma como ORM. El frontend se inicia con Create React App y el backend está escrito en TypeScript.

## Explicación de Directorios y Archivos

- `backend/`: Contiene el código del lado del servidor escrito en Node.js.
  - `src/`: Contiene el código fuente para el backend.
    - `index.ts`: El punto de entrada para el servidor backend.
  - `prisma/`: Contiene el archivo de esquema de Prisma para ORM.
  - `tsconfig.json`: Archivo de configuración de TypeScript.
  - `.env`: Contiene las variables de entorno.
- `frontend/`: Contiene el código del lado del cliente escrito en React.
  - `src/`: Contiene el código fuente para el frontend.
  - `public/`: Contiene archivos estáticos como el archivo HTML e imágenes.
  - `build/`: Contiene la construcción lista para producción del frontend.
- `docker-compose.yml`: Contiene la configuración de Docker Compose para gestionar los servicios de tu aplicación.
- `README.md`: Este archivo contiene información sobre el proyecto e instrucciones sobre cómo ejecutarlo.

## Estructura del Proyecto

El proyecto está dividido en dos directorios principales: `frontend` y `backend`.

### Frontend

El frontend es una aplicación React y sus archivos principales están ubicados en el directorio `src`. El directorio `public` contiene activos estáticos y el directorio `build` contiene la construcción de producción de la aplicación.

### Backend

El backend es una aplicación Express escrita en TypeScript.
- El directorio `src` contiene el código fuente
- El directorio `prisma` contiene el esquema de Prisma.

## Primeros Pasos

Para comenzar con este proyecto, sigue estos pasos:

1. Clona el repositorio.
2. Instala las dependencias para el frontend y el backend:
```sh
cd frontend
npm install

cd ../backend
npm install
```
3. Construye el servidor backend:
```
cd backend
npm run build
````
4. Inicia el servidor backend:
```
cd backend
npm run dev 
```

5. En una nueva ventana de terminal, construye el servidor frontend:
```
cd frontend
npm run build
```
6. Inicia el servidor frontend:
```
cd frontend
npm start
```

El servidor backend estará corriendo en http://localhost:3010 y el frontend estará disponible en http://localhost:3000.

## Docker y PostgreSQL

Este proyecto usa Docker para ejecutar una base de datos PostgreSQL. Así es cómo ponerlo en marcha:

Instala Docker en tu máquina si aún no lo has hecho. Puedes descargarlo desde aquí.
Navega al directorio raíz del proyecto en tu terminal.
Ejecuta el siguiente comando para iniciar el contenedor Docker:
```
docker-compose up -d
```
Esto iniciará una base de datos PostgreSQL en un contenedor Docker. La bandera -d corre el contenedor en modo separado, lo que significa que se ejecuta en segundo plano.

Para acceder a la base de datos PostgreSQL, puedes usar cualquier cliente PostgreSQL con los siguientes detalles de conexión:
 - Host: localhost
 - Port: 5432
 - User: postgres
 - Password: password
 - Database: mydatabase

Por favor, reemplaza User, Password y Database con el usuario, la contraseña y el nombre de la base de datos reales especificados en tu archivo .env.

Para detener el contenedor Docker, ejecuta el siguiente comando:
```
docker-compose down
```

## Instrucciones para configurar y ejecutar la aplicación

### Requisitos previos
- Node.js (v14 o superior)
- npm (v6 o superior)
- Docker y Docker Compose (para la base de datos PostgreSQL)
- Git

### Pasos para la configuración

#### 1. Iniciar la base de datos
```bash
docker-compose up -d
```
Este comando iniciará una instancia de PostgreSQL según la configuración en el archivo docker-compose.yml.

#### 2. Instalar dependencias
Desde el directorio raíz, ejecuta:
```bash
npm install
```
Esto instalará las dependencias tanto para el backend como para el frontend.

#### 3. Configurar el backend
```bash
cd backend
npx prisma migrate dev
```
Este comando creará las tablas necesarias en la base de datos PostgreSQL.

#### 4. Iniciar la aplicación
Desde el directorio raíz, ejecuta:
```bash
npm run dev
```
Esto iniciará tanto el servidor backend (http://localhost:3010) como el servidor de desarrollo del frontend (http://localhost:3000).

#### 6. Acceder a la aplicación
Abre tu navegador y navega a:
```
http://localhost:3000
```

### Funcionalidades disponibles
- Ver candidatos existentes en formato de tabla
- Añadir nuevos candidatos con la siguiente información:
  - Nombre y apellido
  - Dirección de correo electrónico
  - Número de teléfono (opcional)
  - Dirección (opcional)
  - Historial educativo (opcional)
  - Experiencia laboral (opcional)
  - Carga de currículum (formato PDF o DOCX)

### Solución de problemas
- Si encuentras problemas de conexión con la base de datos, verifica que el contenedor de PostgreSQL esté en ejecución: `docker ps`
- Si el frontend no puede conectarse al backend, asegúrate de que el backend esté funcionando en http://localhost:3010
