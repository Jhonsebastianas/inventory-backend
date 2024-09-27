# Paso 1: Establecer la imagen base
FROM node:16-alpine

# Paso 2: Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Paso 3: Copiar los archivos de configuración del proyecto al directorio de trabajo
COPY package*.json ./

# Paso 4: Instalar las dependencias del proyecto
RUN npm install

# Paso 5: Copiar todos los archivos de fuente local al contenedor
COPY . .

# Paso 6: Compilar la aplicación (si es necesario)
RUN npm run build

# Paso 7: Exponer el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Paso 8: Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]
