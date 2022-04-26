import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

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
  CheckAuth,
} from '@pages';
import { RequireAuth, SkipAuth } from '@features/auth';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.CHECK_AUTH} element={<CheckAuth />} />
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
        <Route
          path={'/'}
          element={
            <div>
              <Link to={ROUTES.SIGN_IN}>Sign In</Link>
              <br />
              <Link to={ROUTES.SIGN_UP}>Sign UP</Link>
              <br />
              <Link to={ROUTES.SERVER_ERROR}>Server Error</Link>
              <br />
              <Link to={ROUTES.INIT_GAME}>Init game</Link>
              <br />
              <Link to={ROUTES.GAME}>Game</Link>
              <br />
              <Link to={ROUTES.PROFILE}>Profile</Link>
              <br />
              <Link to={ROUTES.LEADERBOARD}>leaderboard</Link>
              <br />
              <Link to={ROUTES.FORUM}>forum</Link>
            </div>
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};
