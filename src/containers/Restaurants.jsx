import React, { Fragment, useEffect } from "react";
import { fetchRestaurants } from "../apis/restaurants";

export const Restaurants = () => {
  useEffect(() => {
    // fetchRestaurants()ではPromiseを返すため（axiosを使っている）thenメソッドが使える
    fetchRestaurants().then(
      (data) => console.log(data)
    )
  },[])

  return(
    <Fragment>
      レストラン一覧
    </Fragment>
  )
}