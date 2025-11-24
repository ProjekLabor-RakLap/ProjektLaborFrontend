import React, { use } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PillNav from './PillNav';
import logo from '../../../logo.png';
import { useUserContext } from '../../../Context/userContext';

function PillNavFull() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUserContext();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  let baseItems = [
    { label: 'Home', href: '/' },
  ];

  if (user?.role == "Admin") {
    baseItems = [
      ...baseItems,
      { label: 'Warehouse', href: '/warehouse' },
      { label: 'Stock Change', href: '/stock-change' },
      { label: 'Products', href: '/products' },
      { label: 'Statistics', href: '/statistics' },
      { label: 'Admin', href: '/admin' },
      { label: 'Excel', href: '/excel' },
    ];
  }

  if (user?.role == "Manager") {
    baseItems = [
      ...baseItems,
      { label: 'Warehouse', href: '/warehouse' },
      { label: 'Stock Change', href: '/stock-change' },
      { label: 'Products', href: '/products' },
      { label: 'Stock', href: '/stock' },
      { label: 'Statistics', href: '/statistics' },
      { label: 'Excel', href: '/excel' },
    ];
  }

  if (user?.role == "Analyst") {
    baseItems = [
      ...baseItems,
      { label: 'Warehouse', href: '/warehouse' },
      { label: 'Stock Change', href: '/stock-change' },
      { label: 'Products', href: '/products' },
      { label: 'Statistics', href: '/statistics' },
    ];
  }

  const userItems = user
    ? [
        { label: 'Profile', href: '/profile' },
        { label: 'Log out', onClick: handleLogout },
      ]
    : [{ label: 'Login', href: '/login' }];

  return (
    <PillNav
      logo={logo}
      logoAlt="Company Logo"
      items={[...baseItems, ...userItems]}
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

export default PillNavFull;
