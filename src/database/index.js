const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
  useCreateIndex: true,
  promiseLibrary: global.Promise,
  useNewUrlParser: true
});
//
// mongoose.Promise = global.Promise;

module.exports = mongoose;