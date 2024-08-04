FROM node:20 as Base
ARG PORT=3000
ENV PORT=${PORT}
ENV NEXT_TELEMETRY_DISABLED 1


FROM base AS deps
WORKDIR /app/client/
COPY /services/client/ ./
RUN ls
RUN npm install
RUN ls
RUN cd node_modules && ls


FROM base AS development
ENV NODE_ENV=development
COPY --from=deps /app/client/ /app/client/
WORKDIR /app/client/
RUN ls
RUN cd node_modules && ls
EXPOSE ${PORT}
ENTRYPOINT npm run dev


FROM base AS builder
COPY --from=deps /app/client/ /app/client/
WORKDIR /app/
RUN npm run build


FROM base AS production
ENV NODE_ENV=production
COPY --from=deps /app/client/node_modules/ /app/client/node_modules/
WORKDIR /app/client/
COPY --from=builder /app/client/package.json ./
COPY --from=builder /app/.next/ ./.next/
COPY --from=builder /app/public/ ./public/
EXPOSE ${PORT}
ENTRYPOINT npm run start
