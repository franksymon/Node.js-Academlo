const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

//Routers
const { usersRouter } = require('./routes/userRouter');
const { repairsRouter } = require('./routes/repairsRouter');

//Controllers
const { globalErrorHandler } = require('./controllers/errosController');

//Inint express app
const app = express();

// Enable incoming JSON data
app.use(express.json());

// Add security headers
app.use(helmet());

// Compress responses
app.use(compression());

// Log incoming requests
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else app.use(morgan('combined'));

// Limit IP requests
const limiter = rateLimit({
  max: 10000,
  windowMs: 1 * 60 * 60 * 1000, // 1 hr
  message: 'Too many requests from this IP',
});

app.use(limiter);

//Endponits
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);

// Global Error Handler
app.use('*', globalErrorHandler);

module.exports = { app };
