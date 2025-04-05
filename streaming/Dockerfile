# Usa una imagen liviana de Node.js para construir la app
FROM node:18-alpine AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar y descargar las dependencias antes de copiar el código fuente
COPY package.json package-lock.json ./
RUN npm install

# Copiar todo el código fuente de la aplicación al contenedor
COPY . .

# Construir la aplicación
RUN npm run build

# Verificar la estructura de archivos generada
RUN echo "Contenido de /app/dist/streaming:" && ls -l /app/dist/streaming
RUN echo "Contenido de /app/dist/streaming/browser:" && ls -l /app/dist/streaming/browser

# Usa una imagen ligera de Nginx para servir la app
FROM nginx:alpine

# Copiar la configuración personalizada de Nginx (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Establecer el directorio de trabajo en Nginx
WORKDIR /usr/share/nginx/html

# Copiar los archivos construidos desde la etapa anterior
COPY --from=build /app/dist/streaming/browser/ .

# Exponer el puerto 80 para Nginx
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]