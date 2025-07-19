/**
 *
 * Authentication Container
 *
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ProfileForm from './ProfileForm';
import { initializeAuth } from './actions';

const Authentication = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);
  const location = useLocation();

  useEffect(() => {
    // Initialize authentication on app load
    dispatch(initializeAuth());
  }, [dispatch]);

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

export default Authentication;