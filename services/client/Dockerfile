FROM node:20 as Base
ARG PORT=3000
ENV PORT=${PORT}
ENV NEXT_TELEMETRY_DISABLED 1


FROM base AS deps
WORKDIR /app/client/
COPY /services/client/ ./
RUN npm install


FROM base AS development
ENV NODE_ENV=development
COPY --from=deps /app/client/ /app/client/
WORKDIR /app/client/
EXPOSE ${PORT}
ENTRYPOINT npm run dev


FROM base AS builder
COPY --from=deps /app/client/ /app/client/
WORKDIR /app/client
RUN npm run build


FROM base AS production
ENV NODE_ENV=production
COPY --from=deps /app/client/node_modules/ /app/client/node_modules/
WORKDIR /app/client/
COPY --from=builder /app/client/package.json ./
COPY --from=builder /app/client/.next/ ./.next/
EXPOSE ${PORT}
ENTRYPOINT npm run start
