import { useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks/storeHooks';
import { logout, loginAsync } from './store/slices/authSlice';

export function App() {
  const dispatch = useAppDispatch();

  const {
    auth: { isAuthenticated, displayName },
  } = useAppSelector((state) => state);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(loginAsync());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <>
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
          <li>
            <a href="http://localhost:5000/api/auth/spotify">log in</a>
          </li>
          <li>{isAuthenticated ? <span>{displayName}</span> : null}</li>
          <li>
            <button
              onClick={() => {
                fetch('http://localhost:5000/api/private', {
                  method: 'GET',
                  credentials: 'include',
                }).then((res) => console.log(res));
              }}
            >
              private
            </button>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
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
      {/* END: routes */}
    </>
  );
}

export default App;
