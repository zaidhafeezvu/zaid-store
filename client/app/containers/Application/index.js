/**
 *
 * Application Container
 *
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import Notifications from 'react-notification-system-redux';

// Import containers
import Authentication from '../Authentication';
import Login from '../Login';
import Signup from '../Signup';
import Homepage from '../Homepage';
import Dashboard from '../Dashboard';
import ProtectedRoute from '../Authentication/ProtectedRoute';
import AuthStatus from '../Authentication/AuthStatus';

// Import actions
import { initializeAuth } from '../Authentication/actions';

const Application = ({ initializeAuth, notifications }) => {
  useEffect(() => {
    // Initialize authentication on app load
    initializeAuth();
  }, [initializeAuth]);

  return (
    <div className="application">
      {/* Notifications */}
      <Notifications
        notifications={notifications}
        style={{
          NotificationItem: {
            DefaultStyle: {
              margin: '10px 5px 2px 1px'
            }
          }
        }}
      />

      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Container>
          <a className="navbar-brand" href="/">
            E-Commerce App
          </a>
          
          <div className="navbar-nav ml-auto">
            <AuthStatus />
          </div>
        </Container>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/auth" element={<Authentication />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Container>
                  <div className="py-5">
                    <Authentication />
                  </div>
                </Container>
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all route */}
          <Route path="*" element={
            <Container>
              <div className="text-center py-5">
                <h2>Page Not Found</h2>
                <p>The page you're looking for doesn't exist.</p>
              </div>
            </Container>
          } />
        </Routes>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  notifications: state.notifications
});

const mapDispatchToProps = {
  initializeAuth
};

export default connect(mapStateToProps, mapDispatchToProps)(Application);