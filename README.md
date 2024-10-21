<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

2. Tener pnpm instalado
```
npm i -g pnpm
```

3. Versión de NodeJs usada
```
v20.12.2
```
4. Tener Docker instalado
- [Docker install](https://docs.docker.com/desktop/install/windows-install/)

5. Clonar el repositorio

6. Ejecutar
```
pnpm install
```

7. Levantar la base de datos
```
docker-compose up -d
```

8. Clonar el archivo ```.env.template``` y renombrar la copia a ```
.env```

9. Llenar las variables de entorno definidas en el ```.env``` y reemplar el DB_HOST ```optimalTechDb``` por ```localhost```

10. Ejecutar la aplicación en dev:
```
pnpm dev
```

11. Prueba listando la lista de productos
```
http://localhost:3002/api/products
```

# Inicio rapido con docker

1. Tener Docker instalado
- [Docker install](https://docs.docker.com/desktop/install/windows-install/)

2. Clonar el repositorio

3. Clonar el archivo ```.env.template``` y renombrar la copia a ```
.env```

4. Ejecuta el docker-compose
```
docker-compose -f docker-compose.prod.yaml up -d --build
```

5. Prueba listando la lista de productos
```
http://localhost:3002/api/products
```

## Stack usado
* Postgres
* Nest

# Production Build
1. Crear el archivo ```.env.prod```
2. Llenar las variables de entorno de prod
3. Crear la nueva imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

# Despliegue
Desplegar imagen en plataformas como:

[Render](https://render.com/)

[Digital Ocean](https://www.digitalocean.com/)

# Documentation api
Prueba la api con los diferentes endpoints:

[Documentación api](https://documenter.getpostman.com/view/11322676/2sAXxY38ey)

# Link de la api en produción
Puedes probar con la api ya desplegada:

https://optimaltech-api-0-1.onrender.com/api

# Nota
recuerda el prefijo ```api``` para poder hacer las peticiones

## Si prefieres ejecutar el proyecto completo revisa el orquestador

[Orquestador](https://github.com/Berserker04/product-registration_docker)
