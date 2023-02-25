import React, { useState, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from '@react-hook/media-query';
import { Button, Container, Menu, Sidebar, Icon } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { logoutAsync } from '../store/slices/authSlice';

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

export function Header({ children }: Props) {
  const isMobile = useMediaQuery('(max-width: 767px)');
  //   const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 991px)');
  //   const isComputer = useMediaQuery('(min-width: 992px)');
  const location = useLocation();

  const dispatch = useAppDispatch();
  const {
    auth: { isAuthenticated, displayName },
  } = useAppSelector((state) => state);

  const [sidebarOpened, setSidebarOpened] = useState(false);

  const renderLinks = () => {
    return [
      <Menu.Item active={location.pathname === '/'} key={1}>
        <Link to="/">Home</Link>
      </Menu.Item>,
      isAuthenticated && (
        <Menu.Item active={location.pathname === '/page-2'} key={2}>
          <Link to="/page-2">Page 2</Link>
        </Menu.Item>
      ),
      <Menu.Item position={isMobile ? undefined : 'right'} key={3}>
        {isAuthenticated ? (
          <Button as="button" onClick={() => dispatch(logoutAsync())}>
            Log out
          </Button>
        ) : (
          <a href="http://localhost:5000/api/auth/spotify">
            <Button as="button" primary={true}>
              Log in
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

  const MobileNav = ({ children }: Props) => {
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
