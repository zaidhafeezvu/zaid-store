/**
 *
 * Dashboard Container
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardBody, 
  CardHeader,
  Button,
  Badge
} from 'reactstrap';

const Dashboard = ({ user, isAuthenticated }) => {
  if (!isAuthenticated) {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md={6} className="text-center py-5">
            <h3>Please log in to access your dashboard</h3>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <div className="dashboard">
      <Container>
        <Row className="py-4">
          <Col md={12}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2>Dashboard</h2>
                <p className="text-muted">Welcome back, {user?.name}!</p>
              </div>
              {user?.role === 'admin' && (
                <Badge color="warning" pill>
                  Administrator
                </Badge>
              )}
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={4} className="mb-4">
            <Card>
              <CardHeader>
                <h5 className="mb-0">
                  <i className="fa fa-user mr-2"></i>
                  Profile
                </h5>
              </CardHeader>
              <CardBody>
                <p>Manage your account information and preferences.</p>
                <Link to="/profile" className="btn btn-primary btn-sm">
                  Edit Profile
                </Link>
              </CardBody>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card>
              <CardHeader>
                <h5 className="mb-0">
                  <i className="fa fa-shopping-bag mr-2"></i>
                  Orders
                </h5>
              </CardHeader>
              <CardBody>
                <p>View your order history and track current orders.</p>
                <Link to="/orders" className="btn btn-primary btn-sm">
                  View Orders
                </Link>
              </CardBody>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card>
              <CardHeader>
                <h5 className="mb-0">
                  <i className="fa fa-heart mr-2"></i>
                  Wishlist
                </h5>
              </CardHeader>
              <CardBody>
                <p>Keep track of products you want to buy later.</p>
                <Link to="/wishlist" className="btn btn-primary btn-sm">
                  View Wishlist
                </Link>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {user?.role === 'admin' && (
          <Row>
            <Col md={12}>
              <Card className="border-warning">
                <CardHeader className="bg-warning text-dark">
                  <h5 className="mb-0">
                    <i className="fa fa-cog mr-2"></i>
                    Admin Panel
                  </h5>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md={3} className="mb-3">
                      <Link to="/admin/products" className="btn btn-outline-dark btn-block">
                        <i className="fa fa-box mr-2"></i>
                        Manage Products
                      </Link>
                    </Col>
                    <Col md={3} className="mb-3">
                      <Link to="/admin/orders" className="btn btn-outline-dark btn-block">
                        <i className="fa fa-list mr-2"></i>
                        Manage Orders
                      </Link>
                    </Col>
                    <Col md={3} className="mb-3">
                      <Link to="/admin/users" className="btn btn-outline-dark btn-block">
                        <i className="fa fa-users mr-2"></i>
                        Manage Users
                      </Link>
                    </Col>
                    <Col md={3} className="mb-3">
                      <Link to="/admin/analytics" className="btn btn-outline-dark btn-block">
                        <i className="fa fa-chart-bar mr-2"></i>
                        Analytics
                      </Link>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}

        <Row className="mt-4">
          <Col md={12}>
            <Card>
              <CardHeader>
                <h5 className="mb-0">Account Information</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={6}>
                    <p><strong>Name:</strong> {user?.name}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Role:</strong> {user?.role || 'Customer'}</p>
                  </Col>
                  <Col md={6}>
                    {user?.address && (
                      <div>
                        <p><strong>Address:</strong></p>
                        <p className="text-muted">
                          {user.address.street && `${user.address.street}, `}
                          {user.address.city && `${user.address.city}, `}
                          {user.address.state && `${user.address.state} `}
                          {user.address.zipCode}
                          {user.address.country && `, ${user.address.country}`}
                        </p>
                      </div>
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.authentication.user,
  isAuthenticated: state.authentication.isAuthenticated
});

export default connect(mapStateToProps)(Dashboard);