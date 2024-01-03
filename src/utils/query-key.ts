export const UserKeys = {
  FEED: ['users', 'feed'] as const,
  USER: (userId: string) => ['users', userId] as const,
  USERS: (userId: string) => ['users', userId] as const,
  POSTS: (userId: string) => ['users', userId, 'posts'] as const,
  SEARCH: (searchKeyword: string) =>
    ['search', 'users', searchKeyword] as const,
}

export const PostKeys = {
  POST: (postId: string) => ['posts', postId] as const,
  COMMENTS: (postId: string) => ['posts', postId, 'comments'] as const,
}

// EXAMPLE:
// const todoKeys = {
//   all: ['todos'] as const,
//   lists: () => [...todoKeys.all, 'list'] as const,
//   list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
//   details: () => [...todoKeys.all, 'detail'] as const,
//   detail: (id: number) => [...todoKeys.details(), id] as const,
// }
