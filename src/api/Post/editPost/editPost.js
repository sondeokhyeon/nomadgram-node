
const EDIT = 'EDIT';
const DELETE = 'DELETE';

export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const {
        id, capation, location, actions,
      } = args;
      const { user } = request;
      const post = await prisma.$exists.post({ id, user: { id: user.id } });
      if (post) {
        if (actions === EDIT) {
          return prisma.updatePost(
            {
              data: { capation, location },
              where: { id },
            },
          );
        } if (actions === DELETE) {
          return prisma.deletePost({ id });
        }
      }
      throw Error("You can't do that");
    },
  },
};
