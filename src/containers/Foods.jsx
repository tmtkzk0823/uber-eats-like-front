import React, { Fragment, useEffect } from "react";
import { fetchFoods } from "../apis/foods";

export const Foods = (props) => {

  const { match } = props
  
  useEffect(() => {
    // ここでapi通信している
    fetchFoods(match.params.restaurantsId)
    .then((data) => console.log(data) 
    )
  },[])

  return(
    <Fragment>
      フード一覧
    </Fragment>
  )
}