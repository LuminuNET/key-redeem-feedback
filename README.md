# Beta Key Redeem

## Side note

-   Use NodeJS version 12+, or otherwise you will automatically modify the lockfile during the installation.

## Setup

### Development

-   import `./sqldump/development.sql.zip` into your local database (Only required once)
-   Enter .env variables according to `./packages/service/.sample-env` and use NODE_ENV=DEV
-   npm login --scope=@luminu --registry=http://repo.luminu.net/repository/luminu-node/
-   npm install
-   npm build:pre
-   npm start

### Production

-   import `./sqldump/production.sql.zip` into the production database (Only required once | If there are any errors, create the database `luminu_web` | This will only import the db structure)
-   Enter .env variables according to `./packages/service/.sample-env` and use NODE_ENV=PROD
-   npm login --scope=@luminu --registry=http://repo.luminu.net/repository/luminu-node/
-   npm install
-   npm build:pre
-   npm build
-   npm deploy
