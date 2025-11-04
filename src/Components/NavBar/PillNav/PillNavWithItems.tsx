import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PillNav from './PillNav';
import logo from '../../../logo.png';
import { useUserContext } from '../../../Context/userContext';

function PillNavFull() {
  const location = useLocation(); // <- ez adja az aktuális URL-t, pl. "/warehouse"
  const navigate = useNavigate();

  const { user, logout } = useUserContext();
   const handleLogout = () => {
    logout();
    navigate("/")
  };

  if (user === null) {
    return (
      <PillNav
        logo={logo}
        logoAlt="Company Logo"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Warehouse', href: '/warehouse' },
          { label: 'Stock Change', href: '/stock-change' },
          { label: 'Products', href: '/products' },
          { label: 'Statistics', href: '/statistics' },
          { label: 'Admin', href: '/admin' },
          { label: 'Profile', href: '/profile' },
          { label: 'Login', href: '/login' }
        ]}
        activeHref={location.pathname} // <- dinamikusan az aktuális útvonal
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
      />
    );
  } else {
    return (
      <PillNav
        logo={logo}
        logoAlt="Company Logo"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Warehouse', href: '/warehouse' },
          { label: 'Stock Change', href: '/stock-change' },
          { label: 'Products', href: '/products' },
          { label: 'Statistics', href: '/statistics' },
          { label: 'Admin', href: '/admin' },
          { label: 'Profile', href: '/profile' },
          {
            label: 'Log out', onClick: handleLogout,
          }
        ]}
        activeHref={location.pathname}
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
      />
    );
  }
}

export default PillNavFull;
