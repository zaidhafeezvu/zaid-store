/**
 *
 * Shop Reducer
 *
 */

const initialState = {
  products: [],
  filters: {},
  searchQuery: ''
};

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default shopReducer;