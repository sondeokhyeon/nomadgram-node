import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    togglefollow: async (_, args, { request }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      try {
        const exstingFollow = await prisma.$exists.user({
          AND: [
            { id: user.id },
            { followers_some: { id } },
          ],
        });
        if (exstingFollow) {
          await prisma.updateUser({
            where: { id: user.id },
            data: {
              following: { disconnect: { id } },
            },
          });
        } else {
          await prisma.updateUser({
            where: { id: user.id },
            data: {
              following: { connect: { id } },
            },
          });
        }
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
