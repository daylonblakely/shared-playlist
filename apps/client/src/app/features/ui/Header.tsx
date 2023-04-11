import React, { useState, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from '@react-hook/media-query';
import { Button, Container, Menu, Sidebar, Icon } from 'semantic-ui-react';
import { useAppSelector } from '../../hooks/storeHooks';
import { useLogoutMutation } from '../../services/api';

export interface NavRoutes {
  path: string;
  title: string;
  requireAuth: boolean;
  element: ReactNode;
}
interface Props {
  children?: ReactNode;
  // any props that come into the component
  routes: Array<NavRoutes>;
}

export function Header({ children, routes }: Props) {
  const isMobile = useMediaQuery('(max-width: 767px)');
  //   const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 991px)');
  //   const isComputer = useMediaQuery('(min-width: 992px)');
  const location = useLocation();

  const {
    auth: { isAuthenticated },
  } = useAppSelector((state) => state);

  const [logout] = useLogoutMutation();

  const [sidebarOpened, setSidebarOpened] = useState(false);

  const renderLinks = () => {
    return [
      ...routes.map(({ path, title, requireAuth }, i) =>
        !requireAuth || isAuthenticated ? (
          <Menu.Item active={location.pathname === path} key={i}>
            <Link to={path}>{title}</Link>
          </Menu.Item>
        ) : null
      ),
      <Menu.Item position={isMobile ? undefined : 'right'} key={999}>
        {isAuthenticated ? (
          <Button as="button" onClick={() => logout()}>
            Log out
          </Button>
        ) : (
          <a href="http://localhost:5000/api/auth/spotify">
            <Button as="button" primary={true}>
              Login with Spotify
            </Button>
          </a>
        )}
      </Menu.Item>,
    ];
  };

  const NavBar = () => {
    return (
      <Menu
        fixed={'top'}
        size="large"
        style={{ position: 'sticky', height: '60px' }}
      >
        <Container>
          {isMobile ? (
            <Menu.Item onClick={() => setSidebarOpened(!sidebarOpened)}>
              <Icon name="sidebar" />
            </Menu.Item>
          ) : (
            renderLinks()
          )}
        </Container>
      </Menu>
    );
  };

  const MobileNav = ({ children }: { children: ReactNode }) => {
    return (
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation="overlay"
          //   inverted
          onHide={() => setSidebarOpened(false)}
          vertical
          visible={sidebarOpened}
        >
          {renderLinks()}
        </Sidebar>
        <Sidebar.Pusher dimmed={sidebarOpened}>{children}</Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  };

  return isMobile ? (
    <MobileNav>
      <NavBar />
      {children}
    </MobileNav>
  ) : (
    <>
      <NavBar />
      {children}
    </>
  );
}
