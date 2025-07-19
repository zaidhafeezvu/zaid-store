/**
 *
 * Homepage Container
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, CardBody } from 'reactstrap';

const Homepage = ({ isAuthenticated, user }) => {
  return (
    <div className="homepage">
      <Container>
        {/* Hero Section */}
        <Row className="py-5">
          <Col md={12} className="text-center">
            <h1 className="display-4 mb-4">Welcome to E-Commerce App</h1>
            <p className="lead mb-4">
              Discover amazing products and enjoy a seamless shopping experience
            </p>
            
            {!isAuthenticated ? (
              <div>
                <Link to="/register" className="btn btn-primary btn-lg me-3">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-outline-primary btn-lg">
                  Login
                </Link>
              </div>
            ) : (
              <div>
                <h3>Welcome back, {user?.name}!</h3>
                <Link to="/dashboard" className="btn btn-primary btn-lg">
                  Go to Dashboard
                </Link>
              </div>
            )}
          </Col>
        </Row>

        {/* Features Section */}
        <Row className="py-5">
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center">
              <CardBody>
                <i className="fa fa-shopping-cart fa-3x text-primary mb-3"></i>
                <h5>Easy Shopping</h5>
                <p>Browse and purchase products with just a few clicks</p>
              </CardBody>
            </Card>
          </Col>
          
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center">
              <CardBody>
                <i className="fa fa-shield fa-3x text-primary mb-3"></i>
                <h5>Secure Payments</h5>
                <p>Your payment information is always safe and secure</p>
              </CardBody>
            </Card>
          </Col>
          
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center">
              <CardBody>
                <i className="fa fa-truck fa-3x text-primary mb-3"></i>
                <h5>Fast Delivery</h5>
                <p>Get your orders delivered quickly to your doorstep</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authentication.isAuthenticated,
  user: state.authentication.user
});

export default connect(mapStateToProps)(Homepage);