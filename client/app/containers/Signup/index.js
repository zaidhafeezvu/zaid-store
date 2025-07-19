/**
 *
 * Signup Container
 *
 */

import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import RegisterForm from '../Authentication/RegisterForm';

const Signup = () => {
  return (
    <div className="signup-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <div className="signup-wrapper py-5">
              <RegisterForm />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;