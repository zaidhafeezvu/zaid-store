/**
 *
 * AuthStatus Component
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Badge
} from 'reactstrap';

import { logoutUser } from './actions';

const AuthStatus = ({ 
  isAuthenticated, 
  user, 
  logoutUser,
  className = '' 
}) => {
  const handleLogout = () => {
    logoutUser();
  };

  if (!isAuthenticated) {
    return (
      <div className={`auth-status ${className}`}>
        <Link to="/login" className="btn btn-outline-primary btn-sm mr-2">
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
            <div className="user-avatar mr-2">
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
        
        <DropdownMenu right>
          <DropdownItem header>
            {user?.email}
          </DropdownItem>
          <DropdownItem divider />
          
          <DropdownItem tag={Link} to="/profile">
            <i className="fa fa-user mr-2"></i>
            My Profile
          </DropdownItem>
          
          <DropdownItem tag={Link} to="/dashboard">
            <i className="fa fa-dashboard mr-2"></i>
            Dashboard
          </DropdownItem>
          
          <DropdownItem tag={Link} to="/orders">
            <i className="fa fa-shopping-bag mr-2"></i>
            My Orders
          </DropdownItem>
          
          {user?.role === 'admin' && (
            <>
              <DropdownItem divider />
              <DropdownItem tag={Link} to="/admin">
                <i className="fa fa-cog mr-2"></i>
                Admin Panel
              </DropdownItem>
            </>
          )}
          
          <DropdownItem divider />
          
          <DropdownItem onClick={handleLogout}>
            <i className="fa fa-sign-out mr-2"></i>
            Logout
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authentication.isAuthenticated,
  user: state.authentication.user
});

const mapDispatchToProps = {
  logoutUser
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthStatus);