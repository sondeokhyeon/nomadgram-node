/* eslint-disable import/prefer-default-export */
export const COMMENT_FRAGMENT = `
    fragment CommentParts on User {
        id
        text
        user {
            username
        }
    }
`;
