import path from 'path';
import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import passport from 'passport';
import schema from './schema';
import './passport';

require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const { PORT } = process.env;
const server = new GraphQLServer({ schema });

server.express.use(logger('dev'));
// server.express.use(passport.authenticate('jwt'));

server.start(
  {
    port: PORT,
  },
  () => console.log(`Server Running on port http://localhost:${PORT}`),
);
