import passport from 'passport';
import { Strategy as GoogleStrategy } from "passport-google-oauth20";


interface User {
  id: string
}

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL as string
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile);
}));

passport.serializeUser((user: User, done) => {
  console.log(user);
  done(null, user); // or whatever unique identifier you have for the user
});

passport.deserializeUser((id, done) => {
  console.log(id)
  done(null, {id: '123'});
});

export default passport;


