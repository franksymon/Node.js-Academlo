const express = require('express');

//Inint express app
const app = express();

//Routers
const { usersRouter } = require('./routes/userRouter');
const { repairsRouter } = require('./routes/repairsRouter');

//Controllers
const { globalErrorHandler } = require('./controllers/errosController');

// Enable incoming JSON data
app.use(express.json());

//Endponits
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);

// Global Error Handler
app.use('*', globalErrorHandler);

module.exports = { app };
