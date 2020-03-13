const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const collectionRoutes = require('./routes/collection.routes');
const app = express();
// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// secure apps by setting various HTTP headers
app.use(helmet());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: 'nanosbackend',
			description: 'Nanos backend api endpoints',
			contacts: {
				name: 'Rebecca',
			},
			servers: ['http://localhost:3000', 'http://68.183.59.209:3000/'],
		},
	},
	basePath: '/',
	apis: ['./routes/**/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/', collectionRoutes);
app.get('/', (req, res) => {
	res.send('Server is up and running at port 3000');
});

module.exports = app;
