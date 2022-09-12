import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// constants
import { FONT_SIZE } from "../style_constants";

// Icons
import { LocalMallIcon, QueryBuilderIcon } from "./Icons";

                           // 関数コンポーネント内でJSXを返すだけであれば　
                           // const Hoge = () =(...)の方が望ましい (return等を書かない（今回はしていない）)
export const OrderDetailItem = (props) => {
  const { restaurantId, restaurantName, restaurantFee, timeRequired, foodCount, price, } = props;
  return(
    <Fragment>
      <LineWrapper>
        <LocalMallIcon/>
        <Link to={`restaurants/${restaurantId}/foods`}>
          {restaurantName}
        </Link>
      </LineWrapper>
      <LineWrapper>
        <QueryBuilderIcon/>
        {timeRequired}分で到着予定
      </LineWrapper>
      <LineWrapper>
        <p>
          商品数
        </p>
        <p>
          商品数:{foodCount}
        </p>
        <p>
          ¥{price}
        </p>
      </LineWrapper>
      <LineWrapper>
        <p>
          配送料
        </p>
        <p>
          ¥{restaurantFee}
        </p>
      </LineWrapper>
      <LineWrapper>
        <AmountText>
          合計
        </AmountText>
        <AmountText>
          ¥{price + restaurantFee}
        </AmountText>
      </LineWrapper>
    </Fragment>
  )
}

const LineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AmountText = styled.p`
  font-size: ${FONT_SIZE.STAND_BODY};
  font-weight: bold:
`;