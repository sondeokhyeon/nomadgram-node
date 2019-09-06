import { prisma } from '../../../../generated/prisma-client';
import { generateToken } from '../../../utils';

export default {
  Mutation: {
    confirmSecret: async (_, args, { request }) => {
      console.log(request);
      try {
        const { email, secret } = args;
        const user = await prisma.user({ email });
        if (user.loginSecret === secret) {
          return generateToken(user.id);
        }
        throw Error('error!!');
      } catch (err) {
        console.log(err);
      }
    },
  },
};
