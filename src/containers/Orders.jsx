import React, { Fragment,  useEffect, useReducer  } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// api
import { fetchLineFoods } from "../apis/line_foods";
import { postOrder } from "../apis/orders";

// reducer
import { initialState, lineFoodsActionTypes, lineFoodsReducer } from "../reducers/lineFoods";

// images
import MainLogo from '../images/logo.png'
// constants
import { REQUEST_STAGE } from "../constants";
// Material-UI
import { CircularProgress } from "@material-ui/core";
// component
import { OrderDetailItem } from "../components/OrderDetailItem";
import { OrderButton } from "../components/Buttons/OrderButton";


export const Orders = () => {
  const [state, dispatch] = useReducer( lineFoodsReducer, initialState);

  useEffect(() => {
    dispatch({type: lineFoodsActionTypes.FETCHING});
    fetchLineFoods()
    .then((data) =>
    dispatch({
      type: lineFoodsActionTypes.FETCH_SUCCESS,
      payload: {
        lineFoodsSummary: data
      }
    })
    )
    .catch((e) => console.error(e));
  }, []);

  const postLineFoods = () => {
    dispatch({type: lineFoodsActionTypes.POSTING});
    // api通信
    postOrder({
      // lineFoodsSummaryには取得した仮注文データが入っている
      line_food_ids: state.lineFoodsSummary.line_food_ids
    }).then(() => {
      dispatch({type: lineFoodsActionTypes.POST_SUCCESS});
      window.location.reload();
    })
  }

  const orderButtonLabel = () => {
    switch(state.postState){
      case REQUEST_STAGE.LOADING:
        return '注文中...';
      case REQUEST_STAGE.OK:
        return '注文が完了しました！';
      default:
        return '注文を確定する';
    }
  };

  return(
    <Fragment>
      <HeaderWrapper>
        <Link to='/restaurants'>
          <MainLogoImage src={MainLogo} alt='main logo' />
        </Link>
      </HeaderWrapper>
      <OrderListWrapper>
        <div>
          <OrderItemWrapper>
            {
              //API ローディング中はクルクル回るローディングコンポーネントを表示
              state.fetchState === REQUEST_STAGE.LOADING ? //　三項演算子
              <CircularProgress/>
            :
              state.lineFoodsSummary &&
              <OrderDetailItem
              restaurantFee = { state.lineFoodsSummary.restaurant.fee } 
              restaurantName = { state.lineFoodsSummary.restaurant.name}
              restaurantId = { state.lineFoodsSummary.restaurant.id}
              timeRequired = { state.lineFoodsSummary.restaurant.time_required}
              foodCount = {state.lineFoodsSummary.count}
              price = {state.lineFoodsSummary.amount}
              />
            }
          </OrderItemWrapper>
        <div>
        {
          state.fetchState === REQUEST_STAGE.OK && state.lineFoodsSummary &&
          <OrderButton // OrderButtonで囲むことで、囲んだスタイルとその中身の文字列を表示することができる
          onClick={() => postLineFoods()}
          disabled = {state.postState === REQUEST_STAGE.LOADING || state.postState === REQUEST_STAGE.OK}>
            { orderButtonLabel() }
          </OrderButton>
        }
        {
          state.fetchState === REQUEST_STAGE.OK && !(state.lineFoodsSummary) &&
          <p>
            注文予定の商品はありません
          </p>
        }
        </div>
        </div>
      </OrderListWrapper>
    </Fragment>
  )
}


const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const OrderListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const OrderItemWrapper = styled.div`
  margin-bottom: 50px;
`;