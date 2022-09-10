import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../style_constants';
import { SubText } from './StyledText';

export const FoodWrapper = ( props ) => {
  // onClickFoodWrapperとfoodを関数として渡し、引数にfoodを与えることでどのfoodがクリックされたのがを判別する
  const { food, onClickFoodWrapper, imageUrl } = props
  return(
  <Wrapper onClick={() => onClickFoodWrapper(food)}>
    <FoodDetail>
      {food.name}
      <DescriptionWrapper>
        <SubText>
          {food.description}
        </SubText>
      </DescriptionWrapper>
      <PriceWrapper>
        ¥{food.price}
      </PriceWrapper>
    </FoodDetail>
    <FoodImageNode src={imageUrl} />
  </Wrapper>

)}

const Wrapper = styled.div`
  display: flex;
  width: 450px;
  height: 180px;
  border-width: 1px;
  border-color: ${COLORS.BORDER};
  border-image: initial;
  cursor: pointer;
`;

const FoodDetail = styled.div`
  padding :24px 16px;
  width: 250px;
`;

const DescriptionWrapper = styled.div`
  height: 75px;
`;

const PriceWrapper = styled.div`
  margin-top: 16px;
`;

const FoodImageNode = styled.img`
  width: 250px;
`;