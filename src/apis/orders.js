import axios from "axios";
import { orders } from "../urls/index";

export const postOrder = (params) => {
  return axios.post(orders,
    {
      line_food_ids: params.line_food_ids //配列　
    },
    )
    .then(res => {
      return res.data
    })
    .catch((e) => console.error(e))
}