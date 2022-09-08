import { REQUEST_STAGE } from '../constants';

export const initialState = {
  fetchState: REQUEST_STAGE.INITIAL,
  restaurants: [],
};

export const restaurantsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
}

export const restaurantsReducer = (state, action) => {
  switch(action.type){
    case restaurantsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STAGE.LOADING,
      };
    case restaurantsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STAGE.OK,
        restaurantsList: action.payload.restaurants,
      };
    default:
      throw new Error();
  }
}