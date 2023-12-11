require('dotenv').config();
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from './passport-setup';
import indexRouter from './routes/index'; // Import the index route
import authRouter from './routes/auth';   // Import the auth route
import userRouter from './routes/user-account';
import mongoose  from 'mongoose';
const app = express();
const port = 3000;

mongoose.connect(process.env.MONGO_URL as string)
  .then(() => console.log('MongoDB connected…'))
  .catch(err => console.log(err));

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

// Use the routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/userAccounts', userRouter)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
