FROM node:20.18-alpine AS builder
WORKDIR app
COPY . .
RUN npm ci
RUN npm run build

FROM node:20.18-alpine AS runner
WORKDIR app
COPY --from=builder /app/build/ build/
COPY --from=builder /app/node_modules node_modules/
COPY --from=builder /app/package.json .

ENV BACKEND_BASE_URL http://localhost:8080
ENV NODE_ENV=production

EXPOSE 3000

USER node

CMD ["node","build"]