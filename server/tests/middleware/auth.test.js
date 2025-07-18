const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { protect, authorize } = require('../../middleware/auth');
const User = require('../../models/User');

// Mock dependencies
jest.mock('jsonwebtoken');
jest.mock('../../models/User');

describe('Auth Middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      headers: {},
      cookies: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('protect middleware', () => {
    it('should return 401 if no token is provided', async () => {
      await protect(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          message: 'Not authorized to access this route',
          code: 'UNAUTHORIZED'
        }
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should extract token from authorization header', async () => {
      const token = 'test-token';
      req.headers.authorization = `Bearer ${token}`;
      
      const mockUser = { _id: 'user-id', role: 'customer' };
      jwt.verify.mockReturnValue({ id: 'user-id' });
      User.findById.mockResolvedValue(mockUser);

      await protect(req, res, next);

      expect(jwt.verify).toHaveBeenCalledWith(token, process.env.JWT_SECRET);
      expect(User.findById).toHaveBeenCalledWith('user-id');
      expect(req.user).toEqual(mockUser);
      expect(next).toHaveBeenCalled();
    });

    it('should extract token from cookies if no authorization header', async () => {
      const token = 'cookie-token';
      req.cookies = { token };
      
      const mockUser = { _id: 'user-id', role: 'customer' };
      jwt.verify.mockReturnValue({ id: 'user-id' });
      User.findById.mockResolvedValue(mockUser);

      await protect(req, res, next);

      expect(jwt.verify).toHaveBeenCalledWith(token, process.env.JWT_SECRET);
      expect(User.findById).toHaveBeenCalledWith('user-id');
      expect(req.user).toEqual(mockUser);
      expect(next).toHaveBeenCalled();
    });

    it('should return 401 if user not found', async () => {
      req.headers.authorization = 'Bearer test-token';
      jwt.verify.mockReturnValue({ id: 'user-id' });
      User.findById.mockResolvedValue(null);

      await protect(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          message: 'User not found',
          code: 'USER_NOT_FOUND'
        }
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 if token verification fails', async () => {
      req.headers.authorization = 'Bearer test-token';
      jwt.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await protect(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          message: 'Not authorized to access this route',
          code: 'INVALID_TOKEN'
        }
      });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('authorize middleware', () => {
    it('should call next if user role is authorized', () => {
      req.user = { role: 'admin' };
      
      const middleware = authorize('admin', 'superadmin');
      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should return 403 if user role is not authorized', () => {
      req.user = { role: 'customer' };
      
      const middleware = authorize('admin', 'superadmin');
      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          message: 'User role customer is not authorized to access this route',
          code: 'FORBIDDEN'
        }
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 403 if user role is not defined', () => {
      req.user = {}; // No role defined
      
      const middleware = authorize('admin');
      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          message: 'User role not defined',
          code: 'ROLE_UNDEFINED'
        }
      });
      expect(next).not.toHaveBeenCalled();
    });
  });
});