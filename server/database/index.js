const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose
  .connect(
    process.env.DB_CONNECTION_STRING,
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  )
  .then(
    () => {
      console.log('* DB CONNECTED *');
    },
    err => {
      console.log('error connecting to DB: ');
      console.log(err);
    }
  );

module.exports = mongoose.connection;
