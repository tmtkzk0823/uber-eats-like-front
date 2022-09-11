
import React from 'react';
import styled from 'styled-components';
// component
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { CountDownButton } from './Buttons/CountDownButton';
import { CountUpButton } from './Buttons/CountUpButton';
import { OrderButton } from './Buttons/OrderButton';

// images
import OrderHeaderImage from '../images/order-header.png'

// DialogコンポーネントMaterial-UI提供
import { SubText } from './StyledText';


export const FoodOrderDialog = (props) => {
  const {food, isOpen, onClose, countNumber, onClickCountUp, onClickCountDown, onClickOrder} = props;
  
  return(
    // Dialogコンポーネントは open, onclose の二つをboolean値で受け取る
    <Dialog open={isOpen} onClose={onClose}>
      <OrderHeader src={OrderHeaderImage} alt="order header" />
      <DialogTitle>
        {food.name}
      </DialogTitle>
      <DialogContent>
        <DescriptionWrapper>
          <SubText>
            {food.description}
          </SubText>
        </DescriptionWrapper>
      </DialogContent>
      
      <DialogActions>
        <CountersWrapper>
          <CountItem>
            {/* カウントダウンボタン */}
            <CountDownButton
              onClick={()=> onClickCountDown()}
              // 数量が１以下だったらカウントダウンさせない
              isDisabled={countNumber <= 1}
              />
          </CountItem>
          <CountItem>
            <CountNum>
              {countNumber}
            </CountNum>
          </CountItem>
          <CountItem>
            {/* カウントアップボタン */}
            <CountUpButton onClick={()=>onClickCountUp()} 
            // 数量が９以上だったらカウントアップさせない
            isDisabled={countNumber >= 9}
            />
          </CountItem>
        </ CountersWrapper>
        {/* オーダーボタン */}
        <OrderButton onClick={() => onClickOrder()}>
          <OrderTextWrapper>
            <OrderButtonTextWrapper>
              {`${countNumber}点を注文に追加`}
            </OrderButtonTextWrapper>
            <PriceWrapper>
              {`¥${ countNumber * food.price}`}
            </PriceWrapper>
          </OrderTextWrapper>
        </OrderButton>
      </DialogActions>
    </Dialog>
  )
}


const OrderHeader = styled.img`
  width: 100%;
  height: 350px;
`;

const DescriptionWrapper = styled.div`
  padding: 0 8px 8px 8px;
  height: 50px;
`;

const CountersWrapper = styled.div`
  margin-right: auto;
  display: flex;
  padding: 0 16px;
`;

const CountItem = styled.div`
  margin: 0 8px;
`;

const CountNum = styled.div`
  padding-top: 10px;
`;

const OrderTextWrapper = styled.div`
  display: flex;
`;

const OrderButtonTextWrapper = styled.div`
  width: 300px;
`;

const PriceWrapper = styled.div`
  padding-top: 4px;
`;
