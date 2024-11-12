import { Server } from 'http';
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`this is  app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
//  this is for asynchronous
process.on('unhandledRejection', () => {
  //   this process is called server restfully off
  console.log('unhandledRejection is find , shutting down the server ');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
//  this is for synchronous
process.on('uncaughtException', () => {
  console.log('uncaughtException is find , shutting down the server ');

  process.exit(1);
});
