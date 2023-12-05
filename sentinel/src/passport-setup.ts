import passport from 'passport';
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User, IUser } from './models/User';


interface User {
  id: string
}

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL as string
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await User.create({ googleId: profile.id, displayName: profile.displayName });
    }
    done(null, user as User);
  } catch (error) {
    done(error as Error);
  }
}));

passport.serializeUser((user: User, done) => {
  done(null, (user as any).googleId); // or whatever unique identifier you have for the user
});

passport.deserializeUser(async (googleId: string, done) => {
  try {
    const user = await User.findOne({ googleId: googleId }) as User | null;
    done(null, user);
  } catch (error) {
    done(error as Error);
  }
});


export default passport;


