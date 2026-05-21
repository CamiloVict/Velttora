FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package.json ./
RUN npm install --omit=dev

COPY index.js mailer.js templates.js logger.js constants.js ./

EXPOSE 8080

CMD ["node", "index.js"]
