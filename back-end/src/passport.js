/* eslint-disable import/prefer-default-export */
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { prisma } from '../generated/prisma-client';
import './env';

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

export const authenticateJwt = (req, res, next) => passport.authenticate('jwt', { sessions: false }, (_error, user) => {
  if (user) {
    req.user = user;
  }
  next();
})(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
