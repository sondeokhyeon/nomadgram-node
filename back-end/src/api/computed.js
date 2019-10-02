import { prisma } from '../../generated/prisma-client';

export default {
  User: {
    fullName: (parent) => `${parent.firstName} ${parent.lastName}`,
    isFollowing: async (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      try {
        return prisma.$exists.user({
          AND: [
            { id: user.id },
            { followers_some: { id: parentId } },
          ],
        });
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    itSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    },
  },
};