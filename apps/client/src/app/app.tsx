import { Route, Routes, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSpotifyLoginMutation } from './store/services/auth';
import { login } from './store/slices/authSlice';

export function App() {
  const dispatch = useDispatch();
  const [spotifyLogin] = useSpotifyLoginMutation();

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
          <li>
            <button
              onClick={async () => {
                try {
                  const { displayName } = await spotifyLogin().unwrap();
                  dispatch(login(displayName));
                  // navigate('/');
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              login
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                fetch('http://localhost:5000/api/private', {
                  method: 'GET',
                  credentials: 'include',
                  // headers: {
                  //   // Accept: 'application/json',
                  //   // 'Content-Type': 'application/json',
                  //   'Access-Control-Allow-Credentials': 'true',
                  // },
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
