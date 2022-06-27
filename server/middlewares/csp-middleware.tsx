import { expressCspHeader, SELF, NONE, INLINE, DATA } from 'express-csp-header';

export const cspMiddleware = () =>
  expressCspHeader({
    directives: {
      'default-src': [SELF, 'https://ya-praktikum.tech'],
      'object-src': [NONE],
      'script-src': [SELF, INLINE],
      'font-src': [SELF, DATA, 'https://fonts.gstatic.com'],
      'media-src': [SELF],
      'style-src': [SELF, INLINE, DATA, 'https://fonts.googleapis.com'],
      'connect-src': [SELF, 'https://ya-praktikum.tech'],
      'img-src': [SELF, INLINE, DATA, 'https://ya-praktikum.tech'],
      'frame-ancestors': [SELF],
      'worker-src': [SELF],
    },
  });
