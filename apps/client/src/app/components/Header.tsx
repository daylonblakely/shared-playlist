import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { logoutAsync } from '../store/slices/authSlice';

export function Header() {
  const dispatch = useAppDispatch();
  const {
    auth: { isAuthenticated, displayName },
  } = useAppSelector((state) => state);

  const renderLinks = () => {
    return isAuthenticated ? (
      [
        <li key="1">
          <Link to="/page-2">Page 2</Link>
        </li>,
        <li key="2">
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
        </li>,
        <li key="3">
          <button onClick={() => dispatch(logoutAsync())}>logout</button>
        </li>,
      ]
    ) : (
      <li>
        <a href="http://localhost:5000/api/auth/spotify">log in</a>
      </li>
    );
  };

  return (
    <div role="navigation">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {renderLinks()}
      </ul>
      {isAuthenticated ? <span>{displayName}</span> : null}
    </div>
  );
}
