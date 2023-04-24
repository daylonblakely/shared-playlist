import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from './hooks/storeHooks';
import { useLoginQuery } from './services/api';
import { Header, NavRoutes } from './features/ui/Header';
import RequireAuth from './features/auth/RequireAuth';
import PlaylistsHome from './features/playlists/PlaylistsHome';
import NewPlaylist from './features/playlists/NewPlaylist';
import PlaylistDetail from './features/playlists/PlaylistDetail';

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
      element: <PlaylistsHome />,
    },
    {
      path: '/createPlaylist',
      title: 'Create Playlist',
      requireAuth: true,
      element: <NewPlaylist />,
    },
  ];

  const nonNavRoutes = [
    {
      path: '/playlist/:id',
      title: 'Playlist Detail',
      requireAuth: true,
      element: <PlaylistDetail />,
    },
  ];

  return (
    <>
      <Header routes={routes}>
        <Routes>
          {routes
            .concat(nonNavRoutes)
            .map(({ path, requireAuth, element }, i) => (
              <Route
                path={path}
                element={
                  requireAuth
                    ? RequireAuth({
                        fallback: <div>Please sign in to view this page</div>,
                        children: element,
                      })
                    : element
                }
                key={i}
              />
            ))}
        </Routes>
      </Header>

      {/* END: routes */}
    </>
  );
}

export default App;
