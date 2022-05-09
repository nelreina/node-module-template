FROM node:14-slim
ENV NODE_ENV=prodcution
EXPOSE 5050

RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package.json package-lock*.json ./
RUN npm ci && npm cache clean --force
COPY --chown=node:node . .
CMD ["node", "src/index.js"]