import { AxiosRequestHeaders, AxiosResponseHeaders } from 'axios';
import { Response, CookieOptions } from 'express';
import setCookie, { Cookie, CookieMap } from 'set-cookie-parser';

const parseResponseCookies = (headers: AxiosResponseHeaders) =>
  setCookie(headers['set-cookie'] || [], {
    map: true,
  });

const setAuthCookies = (authCookie: string, uuid: string): AxiosRequestHeaders => ({
  cookie: `authCookie=${authCookie}; uuid=${uuid}`,
});

const getCookiesOptions = (cookie: Cookie): CookieOptions => ({
  expires: cookie.expires,
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  path: cookie.path,
  domain: process.env.COOKIE_DOMAIN,
});

export const setResAuthCookies = (res: Response, cookies: CookieMap) => {
  const { uuid, authCookie } = cookies;

  res.cookie(uuid.name, uuid.value, getCookiesOptions(uuid));
  res.cookie(authCookie.name, authCookie.value, getCookiesOptions(authCookie));
};

export const serverHelpers = {
  parseResponseCookies,
  setAuthCookies,
  setResAuthCookies,
};
