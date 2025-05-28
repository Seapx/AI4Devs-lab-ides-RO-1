# Herramientas

WebStorm + Github Copilot Agent + Gemini 2.5 Pro (prompts) + Claude 3.7 Sonnet (código)

# Prompt inicial (meta prompt)

Tengo que desarrollar una historia de usuario en este proyecto y necesito que me generes los prompts necesarios para conseguirlo, creo que lo mejor sería separarlo en 3 (front, back y base de datos) pero lo dejo a tu criterio. Guarda en el archivo prompts-iniciales.md de la raíz del proyecto estos prompts que generes. Revisa el README del proyecto que tiene información adicional. Aplica buenas prácticas de prompting como por ejemplo asignar un rol adecuado para la tarea. La historia de usuario sería esta:

Añadir Candidato al Sistema

Como reclutador, quiero tener la capacidad de añadir candidatos al sistema ATS, Para que pueda gestionar sus datos y procesos de selección de manera eficiente.

Criterios de Aceptación:

1. Accesibilidad de la función: Debe haber un botón o enlace claramente visible para añadir un nuevo candidato desde la página principal del dashboard del reclutador.
2. Formulario de ingreso de datos: Al seleccionar la opción de añadir candidato, se debe presentar un formulario que incluya los campos necesarios para capturar la información del candidato como nombre, apellido, correo electrónico, teléfono, dirección, educación y experiencia laboral.
3. Validación de datos: El formulario debe validar los datos ingresados para asegurar que son completos y correctos. Por ejemplo, el correo electrónico debe tener un formato válido y los campos obligatorios no deben estar vacíos.
4. Carga de documentos: El reclutador debe tener la opción de cargar el CV del candidato en formato PDF o DOCX.
5. Confirmación de añadido: Una vez completado el formulario y enviada la información, debe aparecer un mensaje de confirmación indicando que el candidato ha sido añadido exitosamente al sistema.
6. Errores y manejo de excepciones: En caso de error (por ejemplo, fallo en la conexión con el servidor), el sistema debe mostrar un mensaje adecuado al usuario para informarle del problema.
7. Accesibilidad y compatibilidad: La funcionalidad debe ser accesible y compatible con diferentes dispositivos y navegadores web.

Notas:
- La interfaz debe ser intuitiva y fácil de usar para minimizar el tiempo de entrenamiento necesario para los nuevos reclutadores.
- Considerar la posibilidad de integrar funcionalidades de autocompletado para los campos de educación y experiencia laboral, basados en datos preexistentes en el sistema.

Tareas Técnicas:
- Implementar la interfaz de usuario para el formulario de añadir candidato.
- Desarrollar el backend necesario para procesar la información ingresada en el formulario.
- Asegurar la seguridad y privacidad de los datos del candidato.


# Respuesta

## Prompts para Desarrollar la Historia de Usuario: Añadir Candidato al Sistema

### 1. Prompt para el Desarrollo del Frontend (React con TypeScript)

**Rol:** Desarrollador Experto en React y TypeScript.

**Tarea:** Implementar la interfaz de usuario (UI) para añadir un nuevo candidato al sistema ATS, siguiendo las mejores prácticas de desarrollo frontend y asegurando una experiencia de usuario intuitiva y accesible.

**Contexto del Proyecto:**
El frontend es una aplicación React creada con Create React App y utiliza TypeScript. Los archivos fuente se encuentran en `frontend/src/`. Debes familiarizarte con la estructura existente y los componentes reutilizables si los hubiera.

**Requisitos Detallados:**

1.  **Acceso a la Funcionalidad:**
    *   Integrar un botón o enlace claramente visible (ej. "Añadir Nuevo Candidato") en la página principal del dashboard del reclutador para iniciar el proceso de añadir un candidato.
2.  **Formulario de Ingreso de Datos:**
    *   Desarrollar un componente de formulario que incluya los siguientes campos para capturar la información del candidato:
        *   Nombre (texto, obligatorio)
        *   Apellido (texto, obligatorio)
        *   Correo Electrónico (email, obligatorio, formato válido)
        *   Teléfono (texto, opcional)
        *   Dirección (texto, opcional)
        *   Educación (área de texto o campos estructurados, opcional)
        *   Experiencia Laboral (área de texto o campos estructurados, opcional)
3.  **Validación de Datos (Cliente):**
    *   Implementar validaciones en tiempo real para los campos del formulario:
        *   Campos obligatorios no deben estar vacíos.
        *   El correo electrónico debe tener un formato válido (ej. `usuario@dominio.com`).
        *   Considerar validaciones de longitud o formato específico si aplican.
4.  **Carga de Documentos:**
    *   Incluir una funcionalidad para que el reclutador pueda cargar el CV del candidato.
    *   Permitir formatos de archivo PDF y DOCX.
    *   Mostrar el nombre del archivo seleccionado y permitir cambiarlo o eliminarlo antes de enviar.
5.  **Confirmación y Retroalimentación:**
    *   Al enviar el formulario exitosamente, mostrar un mensaje de confirmación claro (ej. "Candidato añadido exitosamente").
    *   En caso de error durante el envío (ej. fallo de conexión, error del servidor), mostrar un mensaje de error descriptivo al usuario.
6.  **Accesibilidad y Compatibilidad:**
    *   Asegurar que el formulario y la funcionalidad sean accesibles (WCAG AA).
    *   Garantizar la compatibilidad con los principales navegadores web (Chrome, Firefox, Safari, Edge) y un diseño responsivo para diferentes tamaños de pantalla (escritorio, tableta, móvil).
7.  **Interfaz Intuitiva:**
    *   Diseñar la interfaz de manera que sea fácil de usar y entender, minimizando la curva de aprendizaje para los reclutadores.
8.  **Consideraciones Adicionales (Opcional/Futuro):**
    *   Explorar la viabilidad de integrar funcionalidades de autocompletado para los campos de "Educación" y "Experiencia Laboral", basándose en datos preexistentes (esto dependerá de la disponibilidad de APIs del backend).

**Entregables Esperados:**
*   Código fuente de los nuevos componentes React/TypeScript.
*   Actualizaciones a componentes existentes si es necesario (ej. dashboard).
*   Pruebas unitarias para los nuevos componentes y lógica de validación.

---

### 2. Prompt para el Desarrollo del Backend (Node.js con Express, TypeScript y Prisma)

**Rol:** Ingeniero de Backend Senior con experiencia en Node.js, Express, TypeScript y Prisma ORM.

**Tarea:** Desarrollar la lógica de negocio y los endpoints de API necesarios para procesar y almacenar la información de los nuevos candidatos, asegurando la integridad y seguridad de los datos.

**Contexto del Proyecto:**
El backend está construido con Express sobre Node.js, utilizando TypeScript y Prisma como ORM para la interacción con una base de datos PostgreSQL. El código fuente principal se encuentra en `backend/src/` y el esquema de Prisma en `backend/prisma/schema.prisma`.

**Requisitos Detallados:**

1.  **Endpoint de API:**
    *   Crear un nuevo endpoint `POST /api/candidates` para recibir los datos del formulario de añadir candidato.
    *   El endpoint debe ser capaz de manejar `multipart/form-data` para la subida del CV.
2.  **Procesamiento de Datos:**
    *   Recibir y procesar los siguientes datos del candidato:
        *   Nombre
        *   Apellido
        *   Correo Electrónico
        *   Teléfono
        *   Dirección
        *   Educación
        *   Experiencia Laboral
        *   Archivo CV (PDF o DOCX)
3.  **Validación de Datos (Servidor):**
    *   Implementar validaciones robustas en el lado del servidor para todos los datos recibidos:
        *   Campos obligatorios (nombre, apellido, email) no deben estar vacíos.
        *   El correo electrónico debe tener un formato válido y ser único en el sistema.
        *   Validar el tipo y tamaño del archivo CV.
4.  **Manejo de Archivos (CV):**
    *   Gestionar la carga del archivo CV.
    *   Almacenar el archivo en una ubicación segura y persistente (ej. un directorio en el servidor como `/uploads/cvs/` o un servicio de almacenamiento en la nube si está configurado).
    *   Guardar la ruta o un identificador del archivo en la base de datos.
5.  **Persistencia de Datos:**
    *   Utilizar Prisma ORM para guardar la información del candidato en la tabla `Candidate` de la base de datos PostgreSQL.
    *   Asegurar que el modelo `Candidate` en `schema.prisma` esté correctamente definido (ver prompt de base de datos).
6.  **Respuesta de la API:**
    *   En caso de éxito, responder con un código de estado `201 Created` y el objeto del candidato creado.
    *   En caso de errores de validación, responder con `400 Bad Request` y mensajes de error claros.
    *   En caso de errores internos del servidor, responder con `500 Internal Server Error`.
7.  **Seguridad y Privacidad:**
    *   Asegurar que el manejo de datos personales cumpla con las normativas de privacidad.
    *   Proteger el endpoint contra vulnerabilidades comunes (ej. XSS, CSRF si aplica).
8.  **Manejo de Errores y Excepciones:**
    *   Implementar un manejo de errores robusto para capturar y registrar excepciones inesperadas.

**Entregables Esperados:**
*   Código TypeScript para el nuevo controlador, servicio y ruta del API.
*   Actualizaciones al `schema.prisma` si son necesarias para el manejo de datos (aunque el grueso del esquema lo define el prompt de BD).
*   Pruebas de integración para el nuevo endpoint.
*   Documentación del endpoint (ej. usando Swagger/OpenAPI si el proyecto lo utiliza).

---

### 3. Prompt para el Diseño y Actualización de la Base de Datos (PostgreSQL con Prisma)

**Rol:** Administrador de Base de Datos (DBA) / Desarrollador con experiencia en PostgreSQL y Prisma ORM.

**Tarea:** Definir y actualizar el esquema de la base de datos PostgreSQL para almacenar la información de los candidatos, utilizando Prisma como herramienta de migración y ORM.

**Contexto del Proyecto:**
El proyecto utiliza PostgreSQL como sistema de gestión de bases de datos y Prisma ORM. El archivo de esquema principal es `backend/prisma/schema.prisma`.

**Requisitos Detallados:**

1.  **Modelo de Datos `Candidate`:**
    *   Definir un nuevo modelo llamado `Candidate` en el archivo `schema.prisma`.
    *   El modelo `Candidate` debe incluir, como mínimo, los siguientes campos con sus tipos de datos apropiados:
        *   `id`: `String @id @default(uuid())` o `Int @id @default(autoincrement())` (elegir según la convención del proyecto).
        *   `nombre`: `String`
        *   `apellido`: `String`
        *   `email`: `String @unique`
        *   `telefono`: `String?` (opcional)
        *   `direccion`: `String?` (opcional)
        *   `educacion`: `String?` (o `Json?` si se requiere estructura más compleja y el equipo está de acuerdo).
        *   `experienciaLaboral`: `String?` (o `Json?` para estructura compleja).
        *   `cvPath`: `String?` (ruta al archivo CV almacenado).
        *   `createdAt`: `DateTime @default(now())`
        *   `updatedAt`: `DateTime @updatedAt`
    *   Considerar si se necesitan relaciones con otros modelos (ej. `User` para el reclutador que lo añadió, `JobApplication` si se extiende la funcionalidad). Por ahora, centrarse en los campos del candidato.
2.  **Índices:**
    *   Asegurar que el campo `email` tenga un índice único para búsquedas rápidas y evitar duplicados.
    *   Considerar otros índices que puedan ser necesarios para consultas frecuentes (ej. por nombre y apellido).
3.  **Migraciones de Base de Datos:**
    *   Una vez definido el modelo en `schema.prisma`, generar el archivo de migración utilizando los comandos de Prisma CLI.
        *   Ejemplo: `npx prisma migrate dev --name add_candidate_model`
    *   Revisar el SQL generado por la migración para asegurar que es correcto antes de aplicarlo.
4.  **Integridad de Datos:**
    *   Asegurar que las restricciones de la base de datos (ej. `NOT NULL` para campos obligatorios, unicidad para `email`) se reflejen correctamente a partir del esquema Prisma.

**Entregables Esperados:**
*   Archivo `schema.prisma` actualizado con la definición del modelo `Candidate`.
*   Archivos de migración generados por Prisma.
*   Confirmación de que la migración se ha aplicado correctamente a la base de datos de desarrollo.

---
Estos prompts deberían proporcionar una base sólida para que los equipos de frontend, backend y base de datos comiencen a trabajar en la historia de usuario.


