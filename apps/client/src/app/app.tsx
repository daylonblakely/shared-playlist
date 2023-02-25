import React, { useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks/storeHooks';
import { loginAsync } from './store/slices/authSlice';
import { Header, NavRoutes } from './components/Header';

export function App() {
  const dispatch = useAppDispatch();

  const {
    auth: { isAuthenticated },
  } = useAppSelector((state) => state);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(loginAsync());
    }
  }, [isAuthenticated, dispatch]);

  const routes: Array<NavRoutes> = [
    {
      path: '/',
      title: 'Home',
      requireAuth: false,
      element: (
        <div style={{ backgroundColor: 'red' }}>
          This is the generated root route.{' '}
          <Link to="/page-2">Click here for page 2.</Link>
        </div>
      ),
    },
    {
      path: '/page-2',
      title: 'Page 2',
      requireAuth: true,
      element: (
        <div>
          <Link to="/">Click here to go back to root page.</Link>
        </div>
      ),
    },
  ];

  return (
    <>
      <Header routes={routes}>
        <Routes>
          {routes.map(({ path, element }, i) => (
            <Route path={path} element={element} key={i} />
          ))}
        </Routes>
        <div style={{ height: 2000 }}></div>
      </Header>

      {/* END: routes */}
    </>
  );
}

export default App;
