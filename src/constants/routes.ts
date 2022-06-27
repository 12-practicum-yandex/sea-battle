export const ROUTES = {
  SERVER_ERROR: '/500',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  INIT_GAME: '/init-game',
  GAME: '/game',
  PROFILE: '/profile',
  LEADERBOARD: '/leaderboard',
  FORUM: '/forum',
  TOPIC_CREATE: '/forum/create',
  FORUM_TOPIC: (id: string | number) => `/forum/${id}`,
};
