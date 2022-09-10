import React, { Fragment, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";

//api
import { fetchFoods } from "../apis/foods";

// reducers
// initialState と定義されているmoduleをこのファイルでは foodsInitialState としてimportすることができる
import { foodsActiveTypes, foodsReducer, initialState as foodsInitialState } from "../reducers/foods";

// constants
import { REQUEST_STAGE } from "../constants";

// css
import styled from "styled-components";

// component
import { COLORS } from '../style_constants'
import {  LocalMallIcon  } from '../components/Icons/index'
import { Skeleton } from "@material-ui/lab";
import { FoodWrapper } from "../components/FoodWrapper";

// images
import MainLogo from '../images/logo.png'
import FoodImage from '../images/food-image.jpg'


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
      <HeaderWrapper>
        <Link to='/restaurants'>
          <MainLogoImage src={ MainLogo } alt='main logo' />
        </Link>
        <BagIconWrapper>
          <Link to='/orders'>
            <ColoredBagIcon fontSize="large"/>
          </Link>
        </BagIconWrapper>
      </HeaderWrapper> 
      {/* ここまでヘッダー */}
      {/* ここからリスト */}
      <FoodsList>
      {
        foodsState.fetchState === REQUEST_STAGE.LOADING ? // 三項演算子条件
        <Fragment>
          {
          [...Array(12).keys()].map(i =>
          <ItemWrapper key={i}>
            <Skeleton key={i} variant="rect" width={450} height={180} />
          </ItemWrapper>
          )
      }
        </Fragment>
      : //　三項演算子　
        foodsState.foodsList.map(food => 
          <ItemWrapper key={food.id}>
            <FoodWrapper food={food} onClickFoodWrapper={(food) => console.log(food)} imageUrl={FoodImage}/>
          </ItemWrapper>
        )
        }
        </ FoodsList>
    </Fragment>
  )
}


const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
`;

const BagIconWrapper = styled.div`
  padding-top; 24px;
`;

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const FoodsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
  margin: 16px
`;