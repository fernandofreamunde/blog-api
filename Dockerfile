FROM node

ENV NODE_ENV=prod
ENV APP_PORT=3000
ENV APP_SECRET=c7piCMKjycoHTEMAcXtgCRH3XmEpxa
ENV DATABASE_URL='postgresql://user:secret@postgres:5432/blog?serverVersion=13&charset=utf8'

# ENV JWT_ID='someStringId' -- see if I need this
# ENV JWT_PASSPHRASE='super-secret-sauce' -- see if I need this
# ENV FRONTEND_URL='https://example.com' -- see if I need this

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

# we can on deployment set up things so that there is a condition here
# running the correct command for the environment it is deployed. 
CMD [ "npm", "run", "serve" ]

# now on the docker compose we set the environment to prod in prod
# and pass all the other env varls that way too.
# This way we can then in code make an if and if it is dev we work with
# the .env file overriding the other ENV values
