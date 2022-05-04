const { app } = require('./app');

// Utils
const { db } = require('./utils/database');

//Models
const { Repair } = require('./models/repairModel');
const { User } = require('./models/userModel');

// Establish models relations
User.hasMany(Repair);
Repair.belongsTo(User);

//Authenticate database credentials
db.authenticate()
  .then(() => console.log('Databese authenticate'))
  .catch(err => console.log(err));

// Sync sequelize models
db.sync()
  .then(() => console.log('Databese synced'))
  .catch(err => console.log(err));

//spin up Server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
