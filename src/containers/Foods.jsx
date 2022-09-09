import React, { Fragment, useEffect, useReducer } from "react";

//api
import { fetchFoods } from "../apis/foods";

//reducers
//initialState と定義されているmoduleをこのファイルでは foodsInitialState としてimportすることができる
import { foodsActiveTypes, foodsReducer, initialState as foodsInitialState } from "../reducers/foods";

// constants
import { REQUEST_STAGE } from "../constants";

export const Foods = (props) => {
  const { match } = props
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);

  useEffect(() => {
    dispatch({type: foodsActiveTypes.FETCHING});
    // ここでapi通信している
    fetchFoods(match.params.restaurantsId)
    .then((data) => {
      dispatch({
        type: foodsActiveTypes.FETCH_SUCCESS,
        payload: {
          foods: data.foods
        }
      });
    })
  },[])


  return(
    <Fragment>
      {
        foodsState.fetchState === REQUEST_STAGE.LOADING ?
        <p>
          ロード中...
        </p>
      :
        foodsState.foodsList.map(food => 
          <div>
          {food.name}
          </div>
          )
      }
    </Fragment>
  )
}