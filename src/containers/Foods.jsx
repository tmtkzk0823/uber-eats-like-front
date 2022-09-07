import React, { Fragment } from "react";

export const Foods = (props) => {
  const { match } = props
  return(
    <Fragment>
      フード一覧
      <p>
        {/* 渡ってきたprops.値.params.hogeでパラメータを抽出することができる */}
        RestaurantsIdは{match.params.restaurantsId}です
      </p>
    </Fragment>
  )
}