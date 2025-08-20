FROM node:24-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run prebuild
RUN npm run build

FROM node:24-alpine AS release
WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/public ./public
COPY --from=base /app/.next ./.next

EXPOSE 3000
CMD ["npm", "run", "start"]