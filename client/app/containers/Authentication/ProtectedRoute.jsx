/**
 *
 * ProtectedRoute Component
 *
 */

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { Alert, Container, Row, Col } from 'reactstrap';

const ProtectedRoute = ({ 
  children, 
  redirectTo = '/login',
  adminOnly = false
}) => {
  const location = useLocation();
  const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);
  const loading = useSelector(state => state.authentication.loading);
  const user = useSelector(state => state.authentication.user);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md={6} className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Checking authentication...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check admin access if required
  if (adminOnly && user?.role !== 'admin') {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <Alert color="danger" className="mt-5">
              <h4>Access Denied</h4>
              <p>You don&apos;t have permission to access this page. Admin privileges are required.</p>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  // Render the protected component
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string,
  adminOnly: PropTypes.bool
};

export default ProtectedRoute;