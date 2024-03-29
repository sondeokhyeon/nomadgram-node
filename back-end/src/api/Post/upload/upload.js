import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    upload: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { caption, files } = args;
      const post = await prisma.createPost({
        caption,
        user: { connect: { id: user.id } },
      });
      files.forEach(
        // eslint-disable-next-line no-return-await
        async (file) => await prisma.createFile({
          url: file,
          post: {
            connect: {
              id: post.id,
            },
          },
        }),
      );
      return post;
    },
  },
};
