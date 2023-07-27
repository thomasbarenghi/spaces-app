# Spaces App - README

## Descripción

Spaces es una aplicación tipo Trello que permite a los usuarios colaborar en la organización de proyectos, tareas y actividades en un entorno compartido. Los usuarios pueden crear espacios, dentro de los cuales pueden crear rooms y asignar tareas a estos rooms. Cada espacio puede tener múltiples miembros con diferentes roles: admin, dueño y miembro. Esta aplicación está diseñada para mejorar la gestión de proyectos y tareas en equipos colaborativos.

## Integrantes

- [Thomas Barenghi (Fullstack)](https://github.com/thomasbarenghi)
- [Jaime Velasquez (Project Manager)](https://www.linkedin.com/in/jaivelas/)
- [José Rojas (Frontend)](https://github.com/rocnail23)

## Roles

- Admin: Los administradores tienen el control administrativo sobre un espacio. Pueden crear, editar y eliminar rooms, asignar tareas y gestionar miembros.
- Dueño: El dueño de un espacio tiene permisos para administrar el espacio, sus miembros, las rooms, etc.
- Miembro: Los miembros pueden acceder a un espacio y participar en las tareas asignadas, pero no tienen permisos de administración.

## Stack Tecnológico

Frontend:
- Next.js
- Redux Toolkit
- Tailwind CSS
- Sass
- TypeScript

Backend:
- Spring (Java)
- GraphQL
- Cloudinary (almacenamiento de archivos)
- MongoDB (base de datos)

## Link de Deploy

Enlace para acceder a la aplicación desplegada: [Link de Deploy](https://nocountry-c12-13.onrender.com/)

## Instrucciones para correr la app

Para ejecutar la aplicación localmente, asegúrate de cumplir con los siguientes requisitos:

1. **Frontend:**

   - Tener Node.js instalado en tu sistema.
   - Ejecutar el siguiente comando en el directorio raíz del frontend para instalar las dependencias:

     ```bash
     npm install
     ```

   - Luego, para iniciar la aplicación de frontend, ejecuta:

     ```bash
     npm run dev
     ```

   - La aplicación estará disponible en `http://localhost:3000`.

2. **Backend:**

   - Tener Java y Maven instalados en tu sistema.
   - Ejecutar los comandos necesarios para compilar y ejecutar el backend de Spring (se requerirá más información sobre el backend específico para proporcionar instrucciones detalladas).

3. **Base de Datos:**

   - Tener una instancia de MongoDB en funcionamiento.
   - Establecer las conexiones necesarias para que la aplicación se conecte a la base de datos. (Más información sobre cómo hacerlo se proporcionará según la configuración específica de tu base de datos).

Una vez que hayas configurado y ejecutado tanto el frontend como el backend correctamente, podrás acceder a la aplicación a través del enlace proporcionado en el apartado "Link de Deploy".

**Nota:** Si tienes algún problema con la instalación o ejecución de la aplicación, asegúrate de revisar las dependencias y configuraciones necesarias para cada componente del stack tecnológico mencionado en este README.
