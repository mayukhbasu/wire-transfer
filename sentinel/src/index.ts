// src/app.ts

require('dotenv').config();
import express from 'express';
import passport from './passport-setup';  // Import the configured passport
import session from 'express-session';
import MongoStore from 'connect-mongo';



const app = express();
const port = 3000;

app.use(session({
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL as string }),
  secret:  process.env.SESSION_SECRET as string, // Choose a strong secret for session encryption
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS, important for production
    httpOnly: true // Helps mitigate the risk of client side script accessing the protected cookie
  }
}));

app.use(passport.initialize());
app.use(passport.session());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: '/login' }),
(req, res) => {
  console.log("test user")
  // Successful authentication, redirect home.
  res.redirect('http://localhost:3000/');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
