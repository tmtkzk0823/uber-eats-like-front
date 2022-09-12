import React, { Fragment, useEffect, useReducer, useState } from "react";
import { Link, useHistory } from "react-router-dom";

//api
import { fetchFoods } from "../apis/foods";
import { postLineFoods, replaceLineFoods } from "../apis/line_foods";

// reducers
// initialState と定義されているmoduleをこのファイルでは foodsInitialState としてimportすることができる
import { foodsActiveTypes, foodsReducer, initialState as foodsInitialState } from "../reducers/foods";

// constants
import { HTTP_STATUS_CODE, REQUEST_STAGE } from "../constants";

// css
import styled from "styled-components";

// component
import { COLORS } from '../style_constants'
import {  LocalMallIcon  } from '../components/Icons/index'
import { Skeleton } from "@material-ui/lab";
import { FoodWrapper } from "../components/FoodWrapper";
import { FoodOrderDialog } from "../components/FoodOrderDialog";
import { NewOrderConfirmDialog } from "../components/NewOrderConfirmDialog";

// images
import MainLogo from '../images/logo.png'
import FoodImage from '../images/food-image.jpg'



export const Foods = (props) => {
  const { match } = props

  const initialState = {
    isOpenOrderDialog: false,
    selectedFood: null,
    selectedFoodCount: 1,
    isOpenNewOrderDialog: false,
    existingRestaurantName: "", // もともと仮注文に入っていたレストランの名前
    newRestaurantName: "", // 新しく入ったお店の名前
  }
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);
  const [state, setState] = useState(initialState)
  const history = useHistory(); //ナビゲートに使用する可能性のあるヒストリーインスタンスへのアクセスを提供

  const submitOrder = () => {
    postLineFoods(
      {
      foodId: state.selectedFood.id,
      count: state.selectedFoodCount,
    }
    )
    .then( () => history.push('/orders'))
    .catch( (e) =>{ //api通信が失敗した後の挙動をif文でハンドリングしている
      if (e.response.status === HTTP_STATUS_CODE.NOT_ACCEPTABLE){
        setState({
          ...state,
          isOpenOrderDialog: false,
          isOpenNewOrderDialog: true,
          existingRestaurantName: e.response.data.existing_restaurant,
          newRestaurantName: e.response.data.new_restaurant,
        })
      } else {
        throw e;
      }
    })
  }

  const replaceOrder = () => {
    replaceLineFoods(
      {
      foodId: state.selectedFood.id,
      count: state.selectedFoodCount,
    }
    ).then(() => history.push('/orders')) //この関数が実行されたらページを遷移する
  };

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
            <FoodWrapper 
            food={food} 
            onClickFoodWrapper={(food) => setState({
            ...state,
            selectedFood: food,
            isOpenOrderDialog: true,
            })
          } 
            imageUrl={FoodImage}/>
          </ItemWrapper>
        )
        }
        </ FoodsList>
        {
          state.isOpenOrderDialog && 
          <FoodOrderDialog
          food={state.selectedFood} 
          isOpen={state.isOpenOrderDialog} 
          countNumber={state.selectedFoodCount}
          onClickCountUp={() => setState({
            ...state,
            selectedFoodCount: state.selectedFoodCount + 1
          })}
          onClickCountDown = { () => setState({
            ...state,
            selectedFoodCount: state.selectedFoodCount - 1
            // state.selectedFoodCount　=> stateで渡ってきたselectedFoodCountに+1した値を渡す
          })}
          onClickOrder = { () => submitOrder()}
          onClose={ () => setState({
            ...state,
            isOpenOrderDialog: false,
            selectedFood: null,
            selectedFoodCount: 1,
          }) }
          />
        }
        {
          state.isOpenNewOrderDialog &&
          <NewOrderConfirmDialog  
          isOpen={state.isOpenNewOrderDialog}
          onClose={()=> setState({...state, isOpenNewOrderDialog: false})}
          existingRestaurantName={state.existingRestaurantName}
          newRestaurantName={state.newRestaurantName}
          onClickSubmit={()=> replaceOrder()} 
          />
        }
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