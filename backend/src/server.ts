import app from './app';
import environment from './config/environment';
import db from './db/mongoose';

const startServer = () =>
  app.listen(environment.port, () => {
    console.log(`App listening on http://localhost:${environment.port}`);
  });

db.connect(startServer);
