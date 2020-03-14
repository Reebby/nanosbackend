# nanosbackend uses express framework

### [Live Demo](http://68.183.59.209:3000/ "nanosbackend")

#### Dependencies used in this project

1. EXPRESS (4.16.4)
2. CORS (2.8.5)
3. MongoDB (3.1.13)
4. SWAGGER-JSDOC (3.5.0)
5. SWAGGER-UI-EXPRESS(4.1.3)
6. HELMET (3.15.0)
7. BODY-PARSER (1.18.3)

## Available Scripts To Run this code using NPM

Clone this repository [git clone https://github.com/Reebby/nanosbackend.git]

In the project directory, you can run:

### `npm install`

To Install dependencies needed to run this project.<br />

### `npm start`

This Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits due to the use of nodemon (https://www.npmjs.com/package/nodemon) .<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
For our test we make use of the jest and supertest librabry.See the section about [running tests with jest](https://jestjs.io/docs/en/getting-started) for more information.

## Using Docker

This project can be run in a container using docker.<br />
**NOTE: You must have docker-compose installed (https://docs.docker.com/compose/install/)**
In the project directory, you can run:

### `docker-compose up --build`

To Install dependencies needed to run this project and runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser..<br />

### `docker-compose up`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits due to the use of nodemon (https://www.npmjs.com/package/nodemon) .<br />
You will also see any lint errors in the console.

## Api Endpoints

You can access the api endpoint documentation here (http://68.183.59.209:3000/api-docs/). <br />

This was created using the swagger-ui-express package (https://www.npmjs.com/package/swagger-ui-express) <br />

and swagger-jsdoc (https://www.npmjs.com/package/swagger-jsdoc)

## Database Setup with mongodb atlas

To run this project locally on your computer, you'll need to create a mongodb atlas account <br />

and a cluster/database. This blog explains how to do so in details (https://codeforgeek.com/mongodb-atlas-node-js/).

**Take note of the connection string you get after setting up your mongodb account<br />
e.g mongodb+srv://USERNAME:PASSWORD@cluster0-1q7ty.mongodb.net/DBNAME**

Now you'll need to upload the json files in our local data folder to the mongodb database that you have created. <br />

You can do this by following these steps and commands:

-- cd into the project directory and into the data folder via your terminal and run these commands:

1. mongoimport --db dbName --collection data_adgroups --file data_adgroups.json --jsonArray

2. mongoimport --db dbName --collection data_ads --file data_ads.json --jsonArray

3. mongoimport --db dbName --collection data_campaigns --file data_campaigns.json --jsonArray

4. mongoimport --db dbName --collection data_stats --file data_stats.json --jsonArray

Create a .env file and set:

MONGODB_URI = mongodb+srv://USERNAME:PASSWORD@cluster0-1q7ty.mongodb.net/DBNAME

MONGODB_DATABASE = DBNAME

to have access to the database in this project.

### Deployment

CircleCI (https://circleci.com/) is used for CICD [continous integration and continous deployment] in this project.
