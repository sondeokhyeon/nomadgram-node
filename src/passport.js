import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import path from 'path';
import { prisma } from '../generated/prisma-client';

require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });
    if (user !== null) {
      return done(null, user);
    }
    return done(null, false);
  } catch (err) {
    console.log(err);
    return done(err, false);
  }
};

passport.use(new Strategy(jwtOptions, verifyUser));
