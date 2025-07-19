/**
 *
 * Authentication Reducer
 *
 */

const initialState = {
  isAuthenticated: false,
  user: null
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...state,
        isAuthenticated: true
      };
    default:
      return state;
  }
};

export default authenticationReducer;