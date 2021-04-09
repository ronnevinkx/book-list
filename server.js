const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(cors());
app.use(express.json());

// fetch graphql requests
app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true
	})
);

// connect to db
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const connection = mongoose.connection;
connection
	.once('open', () => {
		console.log('MongoDB database connection established successfully');
	})
	.on('error', (error) => {
		console.log('MongoDB connection error:', error);
	});

// start server
app.listen(PORT, () =>
	console.log(`Server is running in ${NODE_ENV} mode on port ${PORT}`)
);
