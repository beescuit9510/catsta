export const UserKeys = {
  FEED: ['users', 'feed'] as const,
  USER: (userId: string) => ['users', userId] as const,
  POSTS: (userId: string) => ['users', userId, 'posts'] as const,
  LIKES: (userId: string) => ['users', userId, 'likes'] as const,
  SEARCH: (searchKeyword: string) =>
    ['search', 'users', searchKeyword] as const,
  FOLLOWINGS: (userId: string) => ['users', userId, 'followings'] as const,
  FOLLOWERS: (userId: string) => ['users', userId, 'followers'] as const,
  SUGGESTED_USERS: (userId: string) => ['users', userId, 'suggested'] as const,
}

export const PostKeys = {
  POST: (postId: string) => ['posts', postId] as const,
  COMMENTS: (postId: string) => ['posts', postId, 'comments'] as const,
}

// EXAMPLE:
// https://tkdodo.eu/blog/effective-react-query-keys
// const todoKeys = {
//   all: ['todos'] as const,
//   lists: () => [...todoKeys.all, 'list'] as const,
//   list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
//   details: () => [...todoKeys.all, 'detail'] as const,
//   detail: (id: number) => [...todoKeys.details(), id] as const,
// }
