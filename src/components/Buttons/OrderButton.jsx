import styled from "styled-components";

// constants
import { FONT_SIZE } from "../../style_constants";

// components
import { BaseButton } from "../shared_styled";

// 関数コンポーネントではなく　styledだけで作った関数
// propsや関数が必要ない場合はこれだけでもOK
export const OrderButton = styled(BaseButton)`
  width :390px;
  background-color: black;
  color: white;
  border-style: none;
  padding: 8px 16px;
  font-size: ${FONT_SIZE.BODY1};
`