import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    searchUser: async (_, args) => {
      try {
        if (args.term.length > 2) {
          const user = await prisma.users({
            where: {
              OR: [
                { username_contains: args.term },
                { firstName_contains: args.term },
                { lastName_contains: args.term },
              ],
            },
          });
          return user;
        }
        return null;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
