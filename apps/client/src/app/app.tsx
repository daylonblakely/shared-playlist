import React, { useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks/storeHooks';
import { loginAsync } from './store/slices/authSlice';
import { Header } from './components/Header';

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

  return (
    <>
      <Header>
        <Routes>
          <Route
            path="/"
            element={
              <div style={{ backgroundColor: 'red' }}>
                This is the generated root route.{' '}
                <Link to="/page-2">Click here for page 2.</Link>
              </div>
            }
          />
          <Route
            path="/page-2"
            element={
              <div>
                <Link to="/">Click here to go back to root page.</Link>
              </div>
            }
          />
        </Routes>
        <div style={{ height: 2000 }}></div>
      </Header>

      {/* END: routes */}
    </>
  );
}

export default App;
