# TFG

El proceso para poder ejecutar esta aplicación a nivel local es el siguinte:

# FRONTEND:

En la terminal, navegar hasta la carpeta "/frontend" y a ese nivel ejecutar la siguiente comanda:

**npm run start**


# BACKEND:

Este es el servidor y para que la aplicación funcione, el servidor deber estar ejecutando en todo momento. Para ello, se debe de runner la clase: "CisoDashboardApplication.class" que se puede encontrar bajo "/src/main/java/com.tfg.cisoDashboard"

# Bases de Datos:

Esta aplicación utiliza 2 bases de datos. PostgreSQL y Mongo DB. Las dos deben estar disponibles para que la aplicación funcione en su totalidad. Consultar el fichero **application.properties** bajo "src/main/resources" y la conexion a las bases de datos correspondientes debe ser estar configurada correctamente asi como el usuario, contraseña y el enlace a las bases de datos.
