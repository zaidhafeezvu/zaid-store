/**
 *
 * AuthStatus Component
 *
 */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Badge
} from 'reactstrap';

import { logoutUser } from './actions';

const AuthStatus = ({ className = '' }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);
  const user = useSelector(state => state.authentication.user);
  
  const handleLogout = () => {
    dispatch(logoutUser(navigate));
  };

  if (!isAuthenticated) {
    return (
      <div className={`auth-status ${className}`}>
        <Link to="/login" className="btn btn-outline-primary btn-sm me-2">
          Login
        </Link>
        <Link to="/register" className="btn btn-primary btn-sm">
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className={`auth-status ${className}`}>
      <UncontrolledDropdown>
        <DropdownToggle 
          caret 
          color="link" 
          className="text-decoration-none p-0"
        >
          <div className="d-flex align-items-center">
            <div className="user-avatar me-2">
              <div className="avatar-circle">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
            <div className="user-info">
              <div className="user-name">
                {user?.name || 'User'}
              </div>
              {user?.role === 'admin' && (
                <Badge color="warning" size="sm">
                  Admin
                </Badge>
              )}
            </div>
          </div>
        </DropdownToggle>
        
        <DropdownMenu end>
          <DropdownItem header>
            {user?.email}
          </DropdownItem>
          <DropdownItem divider />
          
          <DropdownItem tag={Link} to="/profile">
            <i className="fa fa-user me-2"></i>
            My Profile
          </DropdownItem>
          
          <DropdownItem tag={Link} to="/dashboard">
            <i className="fa fa-dashboard me-2"></i>
            Dashboard
          </DropdownItem>
          
          <DropdownItem tag={Link} to="/orders">
            <i className="fa fa-shopping-bag me-2"></i>
            My Orders
          </DropdownItem>
          
          {user?.role === 'admin' && (
            <>
              <DropdownItem divider />
              <DropdownItem tag={Link} to="/admin">
                <i className="fa fa-cog me-2"></i>
                Admin Panel
              </DropdownItem>
            </>
          )}
          
          <DropdownItem divider />
          
          <DropdownItem onClick={handleLogout}>
            <i className="fa fa-sign-out me-2"></i>
            Logout
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default AuthStatus;