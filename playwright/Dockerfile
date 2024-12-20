FROM mcr.microsoft.com/playwright:v1.49.1-noble

COPY . /playwright

WORKDIR /playwright

RUN npm install

CMD [ "npx", "playwright", "test", "--reporter=list"]
