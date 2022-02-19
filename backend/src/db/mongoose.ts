import mongoose from 'mongoose';
import environment from '../config/environment';

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

export default {
  connect: (callback) =>
    mongoose
      .connect(environment.mongodb.uri, dbOptions)
      .then(() => {
        console.log('Database successfully connected.');
        if (callback) callback();
      })
      .catch(() => console.log('The connection with the database could not be established.', environment.mongodb.uri)),
  close: mongoose.connection.close()
};
