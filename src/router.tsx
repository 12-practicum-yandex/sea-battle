import { Route, Routes } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import {
  SignUpPage,
  SignIn,
  Leaderboard,
  ProfilePage,
  Page404,
  Page500,
  Game,
  ForumPage,
  CreateTopicPage,
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
        <Route
          path={ROUTES.TOPIC_CREATE}
          element={
            <RequireAuth>
              <CreateTopicPage />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.FORUM_TOPIC}
          element={
            <RequireAuth>
              <ForumPage />
            </RequireAuth>
          }
        />
        <Route
          path={''}
          element={
            <SkipAuth>
              <SignIn />
            </SkipAuth>
          }
        />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
};
