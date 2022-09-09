import React, { Fragment, useEffect, useReducer } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

//api
import { fetchRestaurants } from "../apis/restaurants";

//reducers
import { initialState, restaurantsActionTypes, restaurantsReducer } from "../reducers/restaurants";

//images
import MainLogo from '../images/logo.png';
import MainCoverImage from '../images/main-cover-image.png';
import RestaurantImage from '../images/restaurant-image.jpg';
import { REQUEST_STAGE } from "../constants";

// components
import { Skeleton } from "@material-ui/lab";



export const Restaurants = () => {
  const [state, dispatch] = useReducer( restaurantsReducer, initialState );

  useEffect(() => {
    // dispatchは引数に　オブジェクト　を　1つだけ　取る
    dispatch( { type: restaurantsActionTypes.FETCHING } ); 
    // fetchRestaurants()ではPromiseを返すため（axiosを使っている）thenメソッドが使える
    fetchRestaurants().then((data) => dispatch({
      type: restaurantsActionTypes.FETCH_SUCCESS,
      payload: {
        restaurants: data.restaurants
      }
    })
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
      <RestaurantsContentList>
        {/* JSの変数を参照するために{}で囲っていいる */}
        {
          state.fetchState === REQUEST_STAGE.LOADING ?
            <Fragment>
               {/* variant,  width, height はこのようなpropsの値をSkeletonが受け取るようになっている */}
              <Skeleton variant="rect" width={450} height={300} /> 
              <Skeleton variant="rect" width={450} height={300} />
              <Skeleton variant="rect" width={450} height={300} />
            </Fragment>
          :
            state.restaurantsList.map((item, index) =>
            <Link to={`/restaurants/${item.id}/foods`} key={index} style={ {textDecoration: 'none'} }>
              <RestaurantsContentWrapper>
                <RestaurantsImageNode src={RestaurantImage} />
                <MainText> {item.name} </MainText>
                <SubText> {`配送料:${item.fee}円 ${item.time_required}分`} </SubText>
              </RestaurantsContentWrapper>
            </ Link>
            )
        }
      </RestaurantsContentList>
    </ Fragment>
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

// レストラン一覧全体のcss
const RestaurantsContentList = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 150px
`;

// 1つ1つのレストラン情報を適当なサイズで絶対値指定にしている
const RestaurantsContentWrapper = styled.div`
  width: 450px;
  height: 300px;
  padding: 48px;
`;

const RestaurantsImageNode = styled.img`
  width: 100%;
`;

const MainText = styled.div`
  color: black;
  font-size: 18px;
`;

const SubText = styled.p`
  color: black;
  font-size: 12px;
`;
