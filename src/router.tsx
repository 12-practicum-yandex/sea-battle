import { Route, Routes } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import {
  SignUpPage,
  SignIn,
  InitGame,
  Leaderboard,
  ProfilePage,
  Page404,
  Page500,
  Game,
  ForumPage,
  Default,
} from '@pages';
import { RequireAuth, SkipAuth } from '@features/auth';

export const Router = () => {
  return (
    <>
      <Routes>
        <Route
          path={ROUTES.SIGN_IN}
          element={
            <SkipAuth>
              <SignIn />
            </SkipAuth>
          }
        />
        <Route
          path={ROUTES.SIGN_UP}
          element={
            <SkipAuth>
              <SignUpPage />
            </SkipAuth>
          }
        />
        <Route path={ROUTES.SERVER_ERROR} element={<Page500 />} />
        <Route
          path={ROUTES.INIT_GAME}
          element={
            <RequireAuth>
              <InitGame />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.GAME}
          element={
            <RequireAuth>
              <Game />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.PROFILE}
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.LEADERBOARD}
          element={
            <RequireAuth>
              <Leaderboard />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.FORUM}
          element={
            <RequireAuth>
              <ForumPage />
            </RequireAuth>
          }
        />
        <Route path={'/'} element={<Default />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
};
