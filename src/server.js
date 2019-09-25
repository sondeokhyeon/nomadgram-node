
import { GraphQLServer } from 'graphql-yoga';
import helmet from 'helmet';
import logger from 'morgan';
import schema from './schema';
import { authenticateJwt } from './passport';
import './env';
import { isAuthenticated } from './middlewares';
import { prisma } from '../generated/prisma-client';

const { PORT } = process.env;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({
    request,
    isAuthenticated,
    prisma,
  }),
});

server.express.use(helmet());
server.express.use(logger('dev'));
server.express.use(authenticateJwt);

server.start(
  {
    port: PORT,
  },
  () => console.log(`Server Running on port http://localhost:${PORT}`),
);
