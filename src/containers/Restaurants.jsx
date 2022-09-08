import React, { Fragment, useEffect } from "react";
import styled from "styled-components";

//api
import { fetchRestaurants } from "../apis/restaurants";

//images
import MainLogo from '../images/logo.png';
import MainCoverImage from '../images/main-cover-image.png'


export const Restaurants = () => {
  useEffect(() => {
    // fetchRestaurants()ではPromiseを返すため（axiosを使っている）thenメソッドが使える
    fetchRestaurants().then(
      (data) => console.log(data)
    )
  },[])

  return(
    <Fragment>
      <HeaderWrapper>
        {/* alt属性="" imageが表示できない時に指定したテキストを表示する */}
        <MainLogoImage src={ MainLogo } alt="main logo"/>
      </ HeaderWrapper>
      <MainCoverImageWrapper>
        <MainCover src={ MainCoverImage } alt="main cover" />
      </ MainCoverImageWrapper>
    </Fragment>
  )
}

// justify-contentはアイテムを主軸（中心の軸）方向に揃え位置を指定する
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;


const MainLogoImage = styled.img`
  height: 90px;
`;

const MainCoverImageWrapper = styled.div`
  text-align: center;
`;

const MainCover = styled.img`
height: 600px;
`;

