/**
 *
 * Authentication Container
 *
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ProfileForm from './ProfileForm';
import { initializeAuth } from './actions';

const Authentication = ({ initializeAuth, isAuthenticated }) => {
  const location = useLocation();

  useEffect(() => {
    // Initialize authentication on app load
    initializeAuth();
  }, [initializeAuth]);

  const renderAuthForm = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/login':
        return <LoginForm />;
      case '/register':
        return <RegisterForm />;
      case '/profile':
        return <ProfileForm />;
      default:
        return <LoginForm />;
    }
  };

  return (
    <div className="authentication-container">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <div className="auth-wrapper">
              <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/profile" element={<ProfileForm />} />
                <Route path="/auth" element={renderAuthForm()} />
              </Routes>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authentication.isAuthenticated
});

const mapDispatchToProps = {
  initializeAuth
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);