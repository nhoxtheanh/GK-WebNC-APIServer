const mongoose = require('mongoose');

let dbURI = 'mongodb+srv://nhoxtheanh:12345@cluster0.w1jg8.mongodb.net/GK-WebNC?retryWrites=true&w=majority';

const connect = () => {
  setTimeout(() => mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }), 1000);
}
mongoose.connection.on('connected', () => {
  console.log('Connected to Database (nhoxtheanh - GK-WebNC)');
});

mongoose.connection.on('error', err => {
  console.log('error when connect to Database: ' + err);
  return connect();
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected to Database (nhoxtheanh - GK-WebNC)');
});



connect();

// require('./mongoose_schema');
