/**
 *
 * Login Container
 *
 */

import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import LoginForm from '../Authentication/LoginForm';

const Login = () => {
  return (
    <div className="login-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <div className="login-wrapper py-5">
              <LoginForm />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;