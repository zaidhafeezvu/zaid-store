/**
 *
 * ProfileForm Component
 *
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
  Card,
  CardBody,
  CardHeader,
  Spinner,
  Row,
  Col
} from 'reactstrap';
import Validator from 'validatorjs';

import { updateProfile, clearAuthErrors } from './actions';

const ProfileForm = ({ 
  updateProfile, 
  clearAuthErrors, 
  loading, 
  error, 
  user,
  isAuthenticated 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Initialize form with user data
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          zipCode: user.address?.zipCode || '',
          country: user.address?.country || ''
        }
      });
    }
    clearAuthErrors();
  }, [user, clearAuthErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const rules = {
      name: 'required|min:2|max:50',
      email: 'required|email'
    };

    const validation = new Validator(formData, rules);
    
    if (validation.fails()) {
      setErrors(validation.errors.all());
      return false;
    }
    
    setErrors({});
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      updateProfile(formData);
    }
  };

  if (!isAuthenticated) {
    return (
      <Alert color="warning">
        Please log in to view your profile.
      </Alert>
    );
  }

  return (
    <Card className="profile-card">
      <CardHeader className="text-center">
        <h4>Update Profile</h4>
      </CardHeader>
      <CardBody>
        {error && (
          <Alert color="danger" className="mb-3">
            {error}
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="name">Full Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  invalid={!!errors.name}
                  disabled={loading}
                />
                {errors.name && (
                  <div className="invalid-feedback d-block">
                    {errors.name[0]}
                  </div>
                )}
              </FormGroup>
            </Col>
            
            <Col md={6}>
              <FormGroup>
                <Label for="email">Email Address</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  invalid={!!errors.email}
                  disabled={loading}
                />
                {errors.email && (
                  <div className="invalid-feedback d-block">
                    {errors.email[0]}
                  </div>
                )}
              </FormGroup>
            </Col>
          </Row>

          <hr />
          <h5>Address Information</h5>
          
          <FormGroup>
            <Label for="address.street">Street Address</Label>
            <Input
              type="text"
              name="address.street"
              id="address.street"
              placeholder="Enter your street address"
              value={formData.address.street}
              onChange={handleChange}
              disabled={loading}
            />
          </FormGroup>

          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="address.city">City</Label>
                <Input
                  type="text"
                  name="address.city"
                  id="address.city"
                  placeholder="Enter your city"
                  value={formData.address.city}
                  onChange={handleChange}
                  disabled={loading}
                />
              </FormGroup>
            </Col>
            
            <Col md={3}>
              <FormGroup>
                <Label for="address.state">State</Label>
                <Input
                  type="text"
                  name="address.state"
                  id="address.state"
                  placeholder="State"
                  value={formData.address.state}
                  onChange={handleChange}
                  disabled={loading}
                />
              </FormGroup>
            </Col>
            
            <Col md={3}>
              <FormGroup>
                <Label for="address.zipCode">ZIP Code</Label>
                <Input
                  type="text"
                  name="address.zipCode"
                  id="address.zipCode"
                  placeholder="ZIP"
                  value={formData.address.zipCode}
                  onChange={handleChange}
                  disabled={loading}
                />
              </FormGroup>
            </Col>
          </Row>

          <FormGroup>
            <Label for="address.country">Country</Label>
            <Input
              type="text"
              name="address.country"
              id="address.country"
              placeholder="Enter your country"
              value={formData.address.country}
              onChange={handleChange}
              disabled={loading}
            />
          </FormGroup>

          <Button
            type="submit"
            color="primary"
            size="lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Updating Profile...
              </>
            ) : (
              'Update Profile'
            )}
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  loading: state.authentication.loading,
  error: state.authentication.error,
  user: state.authentication.user,
  isAuthenticated: state.authentication.isAuthenticated
});

const mapDispatchToProps = {
  updateProfile,
  clearAuthErrors
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);