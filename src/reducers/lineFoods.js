import { REQUEST_STAGE } from "../constants";

export const initialState = {
  fetchState: REQUEST_STAGE.INITIAL, // 取得状況
  postState: REQUEST_STAGE.INITIAL, //　登録状況
  lineFoodsSummary: null, //　仮注文データ
}

export const lineFoodsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  POSTING: 'POSTING',
  POST_SUCCESS: 'POST_SUCCESS',
}

export const lineFoodsReducer = (state, action) => {
  switch (action.type) {
    case lineFoodsActionTypes.FETCHING:
      return{
        ...state,
        fetchState: REQUEST_STAGE.LOADING
      };
      case lineFoodsActionTypes.FETCH_SUCCESS:
        return {
          fetchState: REQUEST_STAGE.OK,
          lineFoodsSummary: action.payload.lineFoodsSummary,
        };
      case lineFoodsActionTypes.POSTING:
        return {
          ...state,
          postState: REQUEST_STAGE.LOADING,
        };
      case lineFoodsActionTypes.POST_SUCCESS:
        return{
          ...state,
          postState: REQUEST_STAGE.OK,
        };
        default:
          throw new Error();
  }
}