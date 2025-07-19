/**
 *
 * Authentication Container
 *
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
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
              <Switch>
                <Route path="/login" component={LoginForm} />
                <Route path="/register" component={RegisterForm} />
                <Route path="/profile" component={ProfileForm} />
                <Route path="/auth" render={renderAuthForm} />
              </Switch>
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