<p align="center">
  <img src="src/assets/logopetcare2.png" width="120" alt="Logo PetCare" />
</p>

<h1 align="center">🐾 PetCare — Libreta Sanitaria Online</h1>

<p align="center">
  Aplicación web para gestionar la libreta sanitaria de una mascota: turnos, vacunas y controles médicos, todo desde una cuenta personal.
</p>

<img width="1920" height="1080" alt="1920 X 1080" src="https://github.com/user-attachments/assets/d1577761-9dde-4755-9fbb-d0590911bfb3" />

## Sobre el proyecto

PetCare nació como trabajo práctico grupal. Esta versión fue reescrita para corregir errores que impedían que la aplicación React funcionara (imports rotos, páginas fuera del proyecto, dependencias faltantes) y para dejar una única app coherente y funcional, lista para desplegar y mostrar en un portfolio.

## Funcionalidades

- **Registro e inicio de sesión** con validación de formulario.
- **Panel de usuario** para agendar y gestionar tareas: turnos, vacunación y peluquería (marcar como hechas o eliminarlas).
- **Ficha sanitaria de la mascota**: datos básicos editables (nombre, especie, raza, edad, sexo) y registro de vacunas, atenciones y turnos.
- **Rutas protegidas**: el panel y la ficha solo son accesibles con sesión iniciada.

## Stack técnico

- [React 18](https://react.dev/) + [React Router](https://reactrouter.com/)
- [Vite](https://vitejs.dev/) como bundler y servidor de desarrollo
- Persistencia con `localStorage` del navegador (no requiere backend ni base de datos para funcionar)

IMPORTANTE!: Este proyecto es una demo de portfolio: los datos se guardan en el navegador de cada usuario, no en un servidor. No está pensado para almacenar información sensible real.

## Estructura del proyecto

```
src/
├── assets/         # Imágenes usadas por la app
├── components/     # Componentes compartidos (rutas protegidas)
├── pages/          # Login, Registro, Panel, FichaAnimal
├── styles/         # CSS por sección
├── utils/storage.js  # Helpers de persistencia en localStorage
├── App.jsx         # Definición de rutas
└── main.jsx         # Punto de entrada
```
## PROBAR USUARIO:
usuario: porotito contraseña: po123456
correo: porotito@gmail.com
