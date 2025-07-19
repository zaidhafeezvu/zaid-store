/**
 *
 * RegisterForm Component
 *
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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
  Spinner
} from 'reactstrap';
import Validator from 'validatorjs';

import { register, clearAuthErrors } from './actions';

const RegisterForm = ({ 
  register, 
  clearAuthErrors, 
  loading, 
  error, 
  isAuthenticated 
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Clear errors when component mounts
    clearAuthErrors();
  }, [clearAuthErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
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
      email: 'required|email',
      password: 'required|min:6',
      confirmPassword: 'required|same:password'
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
      const { confirmPassword, ...userData } = formData;
      register(userData, navigate);
    }
  };

  if (isAuthenticated) {
    return (
      <Alert color="success">
        You are already logged in!
      </Alert>
    );
  }

  return (
    <Card className="auth-card">
      <CardHeader className="text-center">
        <h4>Create Your Account</h4>
      </CardHeader>
      <CardBody>
        {error && (
          <Alert color="danger" className="mb-3">
            {error}
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit}>
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

          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password (min. 6 characters)"
              value={formData.password}
              onChange={handleChange}
              invalid={!!errors.password}
              disabled={loading}
            />
            {errors.password && (
              <div className="invalid-feedback d-block">
                {errors.password[0]}
              </div>
            )}
          </FormGroup>

          <FormGroup>
            <Label for="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              invalid={!!errors.confirmPassword}
              disabled={loading}
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback d-block">
                {errors.confirmPassword[0]}
              </div>
            )}
          </FormGroup>

          <Button
            type="submit"
            color="primary"
            size="lg"
            block
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-primary">
              Login here
            </Link>
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  loading: state.authentication.loading,
  error: state.authentication.error,
  isAuthenticated: state.authentication.isAuthenticated
});

const mapDispatchToProps = {
  register,
  clearAuthErrors
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);