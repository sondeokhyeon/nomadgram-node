
import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import schema from './schema';
import { authenticateJwt } from './passport';
import './env';
import { isAuthenticated } from './middlewares';

const { PORT } = process.env;
const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated }),
});

server.express.use(logger('dev'));
server.express.use(authenticateJwt);

server.start(
  {
    port: PORT,
  },
  () => console.log(`Server Running on port http://localhost:${PORT}`),
);
