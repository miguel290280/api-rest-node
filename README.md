# Node.js y PostgreSQL, tarea Diplomado servicio Rest APIs - USIP

Servicios Rest Apis que pueden crear, recuperar, actualizar, eliminar y encontrar usuarios.

La siguiente tabla muestra una descripción general de los endpoint de las API Rest:

- GET     `api/usuarios`	               Obtiene todos los usuarios
- GET     `api/usuarios/:id`             Obtiene un usuario por su id
- POST    `api/usuarios`                 Adiciona o crea un usuario
- PUT     `api/usuarios/:id`             Actualiza un usuario por su id
- DELETE  `api/usuarios/:id`             Borra un usuario por su id
- GET     `api/usuarios/promedio-edad`   Devuelve el promedio de edad de los usuarios
- GET     `api/estado`                   Devuelve el estado de la aplicación

### Pruebas locales
Para ejecutar el servicio Rest Api ejecute el siguiente comando: 
```
node server.js

### Base de datos
- Debe crearse una base de datos llamada usip
```
CREATE DATABASE usip;
```

## Project setup
```
npm install
```

