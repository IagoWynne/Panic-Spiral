FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf
COPY fullchain.pem /etc/nginx/ssl/fullchain.pem
COPY privkey.pem /etc/nginx/ssl/privkey.pem

EXPOSE 80
EXPOSE 443