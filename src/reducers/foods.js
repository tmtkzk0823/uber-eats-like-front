import { REQUEST_STAGE } from '../constants';

export const initialState = {
  fetchState: REQUEST_STAGE.INITIAL,
  foodsList: []
};

export const foodsActiveTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'ETCH_SUCCESS',
};

export const foodsReducer = (state, action) => {
  switch(action.type){
    case foodsActiveTypes.FETCHING: 
    // ...stateはスプレッド構文　オブジェクトを展開するために使用している
    return {
      ...state,
      fetchState: REQUEST_STAGE.LOADING
    };
    case foodsActiveTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STAGE.OK,
        foodsList: action.payload.foods,
      };
      default:
        throw new Error();
  }
}