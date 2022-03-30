import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { SignIn } from '/src/pages/sign-in';
import { ROUTES } from '/src/constants/routes';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
      <Route path={ROUTES.SIGN_UP} element={<>SignUp</>} />
      <Route path={ROUTES.NOT_FOUND} element={<>404</>} />
      <Route path={ROUTES.SERVER_ERROR} element={<>500</>} />
      <Route path={ROUTES.GAME} element={<>Game</>} />
      <Route path={ROUTES.PROFILE} element={<>Profile</>} />
      <Route path={ROUTES.LEADERBOARD} element={<>LEADERBOARD</>} />
      <Route path={ROUTES.FORUM} element={<>FORUM</>} />
      <Route
        path={'/'}
        element={
          <div>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            <br />
            <Link to={ROUTES.SIGN_UP}>Sign UP</Link>
            <br />
            <Link to={ROUTES.NOT_FOUND}>Not found</Link>
            <br />
            <Link to={ROUTES.SERVER_ERROR}>Server Error</Link>
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
    </Routes>
  </BrowserRouter>
);
