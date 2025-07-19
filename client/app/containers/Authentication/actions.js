/**
 *
 * Authentication Actions
 *
 */

import axios from 'axios';
import { push } from 'connected-react-router';
import { success, error } from 'react-notification-system-redux';
import setToken from '../../utils/token';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
  SET_AUTH,
  CLEAR_AUTH,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  CLEAR_AUTH_ERRORS
} from './constants';

// Action creators
export const loginRequest = () => ({
  type: LOGIN_REQUEST
});

export const loginSuccess = (user, token) => ({
  type: LOGIN_SUCCESS,
  payload: { user, token }
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error
});

export const registerRequest = () => ({
  type: REGISTER_REQUEST
});

export const registerSuccess = (user, token) => ({
  type: REGISTER_SUCCESS,
  payload: { user, token }
});

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error
});

export const logout = () => ({
  type: LOGOUT
});

export const setAuth = (user, token) => ({
  type: SET_AUTH,
  payload: { user, token }
});

export const clearAuth = () => ({
  type: CLEAR_AUTH
});

export const updateProfileRequest = () => ({
  type: UPDATE_PROFILE_REQUEST
});

export const updateProfileSuccess = (user) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: user
});

export const updateProfileFailure = (error) => ({
  type: UPDATE_PROFILE_FAILURE,
  payload: error
});

export const clearAuthErrors = () => ({
  type: CLEAR_AUTH_ERRORS
});

// Async action creators (thunks)
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    
    const response = await axios.post('/api/auth/login', credentials);
    const { user, token } = response.data;
    
    // Set token in localStorage and axios headers
    localStorage.setItem('token', token);
    setToken(token);
    
    dispatch(loginSuccess(user, token));
    dispatch(success({
      title: 'Login Successful',
      message: `Welcome back, ${user.name}!`,
      position: 'tr',
      autoDismiss: 3
    }));
    
    // Redirect to dashboard or home
    dispatch(push('/dashboard'));
    
  } catch (err) {
    const errorMessage = err.response?.data?.error?.message || 'Login failed';
    dispatch(loginFailure(errorMessage));
    dispatch(error({
      title: 'Login Failed',
      message: errorMessage,
      position: 'tr',
      autoDismiss: 5
    }));
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    
    const response = await axios.post('/api/auth/register', userData);
    const { user, token } = response.data;
    
    // Set token in localStorage and axios headers
    localStorage.setItem('token', token);
    setToken(token);
    
    dispatch(registerSuccess(user, token));
    dispatch(success({
      title: 'Registration Successful',
      message: `Welcome, ${user.name}! Your account has been created.`,
      position: 'tr',
      autoDismiss: 3
    }));
    
    // Redirect to dashboard
    dispatch(push('/dashboard'));
    
  } catch (err) {
    const errorMessage = err.response?.data?.error?.message || 'Registration failed';
    dispatch(registerFailure(errorMessage));
    dispatch(error({
      title: 'Registration Failed',
      message: errorMessage,
      position: 'tr',
      autoDismiss: 5
    }));
  }
};

export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage and axios headers
  localStorage.removeItem('token');
  setToken(null);
  
  dispatch(logout());
  dispatch(success({
    title: 'Logged Out',
    message: 'You have been successfully logged out.',
    position: 'tr',
    autoDismiss: 3
  }));
  
  // Redirect to home
  dispatch(push('/'));
};

export const updateProfile = (profileData) => async (dispatch) => {
  try {
    dispatch(updateProfileRequest());
    
    const response = await axios.put('/api/auth/profile', profileData);
    const { user } = response.data;
    
    dispatch(updateProfileSuccess(user));
    dispatch(success({
      title: 'Profile Updated',
      message: 'Your profile has been updated successfully.',
      position: 'tr',
      autoDismiss: 3
    }));
    
  } catch (err) {
    const errorMessage = err.response?.data?.error?.message || 'Profile update failed';
    dispatch(updateProfileFailure(errorMessage));
    dispatch(error({
      title: 'Update Failed',
      message: errorMessage,
      position: 'tr',
      autoDismiss: 5
    }));
  }
};

// Initialize authentication from stored token
export const initializeAuth = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    try {
      setToken(token);
      const response = await axios.get('/api/auth/profile');
      const { user } = response.data;
      
      dispatch(setAuth(user, token));
    } catch (err) {
      // Token is invalid, remove it
      localStorage.removeItem('token');
      setToken(null);
      dispatch(clearAuth());
    }
  }
};