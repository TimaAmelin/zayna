FROM node:20 as Base


FROM base AS deps
WORKDIR /app/node_backend/
COPY /services/node_backend/ ./
RUN npm install


FROM base AS development
ENV NODE_ENV=development
COPY --from=deps /app/node_backend/ /app/node_backend/
WORKDIR /app/node_backend/
ENTRYPOINT npm run start
