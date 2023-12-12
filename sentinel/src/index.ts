require('dotenv').config();
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose  from 'mongoose';
import bodyParser from 'body-parser';


import passport from './passport-setup';
import indexRouter from './routes/index'; // Import the index route
import authRouter from './routes/auth';   // Import the auth route
import userRouter from './routes/user-account';
import transactionRouter from './routes/transaction';
import consumer from './utils/queueConsumer';

const app = express();
const port = 3000;

mongoose.connect(process.env.MONGO_URL as string)
  .then(() => console.log('MongoDB connected…'))
  .catch(err => console.log(err));

consumer.connect().catch((error) => {
  console.error('Failed to connect to RabbitMQ for consuming:', error);
});

app.use(session({
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL as string }),
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true
  }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use the routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/userAccounts', userRouter)
app.use('/transaction', transactionRouter); 

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

process.on('SIGINT', () => {
  consumer.close().finally(() => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  consumer.close().finally(() => {
    process.exit(0);
  });
});
