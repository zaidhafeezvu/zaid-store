/**
 *
 * RegisterForm Component
 *
 */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(state => state.authentication.loading);
  const error = useSelector(state => state.authentication.error);
  const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Clear errors when component mounts
    dispatch(clearAuthErrors());
  }, [dispatch]);

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
      dispatch(register(userData, navigate));
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
            className="w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" className="me-2" />
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

export default RegisterForm;