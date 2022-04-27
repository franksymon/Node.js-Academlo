const express = require('express');

//Inint express app
const app = express();

const { db } = require('./utils/database');

//Routers
const { usersRouter } = require('./routes/userRouter');
const { repairsRouter } = require('./routes/repairsRouter');

// Enable incoming JSON data
app.use(express.json());

//Endponits
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);

db.authenticate()
  .then(() => console.log('Databese authenticate'))
  .catch(err => console.log(err));

db.sync()
  .then(() => console.log('Databese synced'))
  .catch(err => console.log(err));

//spin up Server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
