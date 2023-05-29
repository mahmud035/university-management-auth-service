import mongoose from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Color } from 'colors';
import config from './config/index';
import app from './app';
require('colors');

//* Database Connection
const dbConnect = async () => {
  try {
    await mongoose.connect(config.database_url as string);

    console.log(`Database Connected`.yellow.italic);

    app.listen(config.port, () => {
      console.log(`Server Up and Running`.cyan.bold);
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error.name.bgRed, error.message.bold, error.stack);
  }
};

dbConnect();
