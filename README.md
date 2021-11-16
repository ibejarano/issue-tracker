# Issue Tracker

> App full stack para hacer el seguimiento de las tareas o problemas de un proyecto

## Contenido

- [Instalacion](#installation)
- [Features](#features)
- [Equipo](#team)

---

## Features
- Creacion de cuentas y Login
- Tablas dinamicas
- Roles de usuarios
- Panel de control de administrador
- Registro de actividades de cada usuario

---

## Installation

Software necesario:
- node
- npm
- git

### Clonar

- Clonar este repositorio `https://github.com/ibejarano/issue-tracker`

### Setup

```shell
$ npm install
```

> Crear un archivo .env en la carpeta raiz y agregar API KEY de mongo DB

Iniciar en modo development

```shell
$ npm run start
```

Asociar a una cuenta de MongoDb Atlas y colocar la URI en un archivo `.env` en la carpeta raiz
```
ATLAS_URI=
```

Y una clave JWT
```
JWT_KEY=
```

Y la direccion del servidor debe ser configurada como:
```
REACT_APP_SERVER_URL=
```

---

## Equipo
| <a href="http://url-pendiente.com" target="_blank">*Ignacio Bejarano</a> |
| <a href="http://github.com/ibejarano" target="_blank">`github.com/ibejarano`</a>
