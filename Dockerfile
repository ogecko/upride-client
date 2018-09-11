FROM node:alpine

WORKDIR /opt/upride
RUN mkdir logs
COPY src-api/README.md README.md
COPY src-api/package.json package.json
COPY src-api/config/ config/
COPY src-api/src/ src/
COPY dist/spa-ios/ public/

ENV LETSENCRYPT_HOST 'up.ogecko.com'
ENV LETSENCRYPT_EMAIL 'admin@ogecko.com'
ENV VIRTUAL_HOST 'up.ogecko.com'
ENV VIRTUAL_PORT '8080'
ENV PORT '8080'
ENV NODE_ENV 'production'
RUN npm install --production
CMD ["node", "src/index.js"]