export const serverConfig = {
  baseUrl: `https://norma.nomoreparties.space/api`,
  headers: {
    authorization: '',
    'Content-Type': 'application/json',
  },
};

export const wssAll = 'wss://norma.nomoreparties.space/orders/all';
export const wssProfile = 'wss://norma.nomoreparties.space/orders';

export const PATH = {
  FEED: '/feed',
  FEED_ORDER: '/feed/:id',
  FORGOT_PASSWORD: '/forgot-password',
  HOME: '/',
  INGREDIENT: '/ingredients/:id',
  LOGIN: '/login',
  LOGOUT: '/auth/logout',
  ORDER: '/profile/orders/:id',
  ORDERS: '/profile/orders',
  PROFILE: '/profile',
  REGISTER: '/register',
  RESET_PASSWORD: '/reset-password',
};
