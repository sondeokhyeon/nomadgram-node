import { prisma } from '../../../../generated/prisma-client';
import { generateToken } from '../../../utils';

export default {
  Mutation: {
    confirmSecret: async (_, args, { request }) => {
      try {
        const { email, secret } = args;
        const user = await prisma.user({ email });
        if (user.loginSecret === secret) {
          await prisma.updateUser({
            where: { id: user.id },
            data: {
              loginSecret: '',
            },
          });
          return generateToken(user.id);
        }
        throw Error('error!!');
      } catch (err) {
        console.log(err);
      }
    },
  },
};
