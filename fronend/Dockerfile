FROM node:18 as build

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM nginx:alpine

# Copy the built React app
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom Nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
