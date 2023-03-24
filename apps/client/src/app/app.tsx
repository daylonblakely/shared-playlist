import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { useAppSelector } from './hooks/storeHooks';
import { useLoginQuery } from './services/api';
import { Header, NavRoutes } from './components/Header';

export function App() {
  const {
    auth: { isAuthenticated },
  } = useAppSelector((state) => state);

  useLoginQuery(undefined, { skip: isAuthenticated });

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
