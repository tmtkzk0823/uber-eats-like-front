import axios from 'axios';

import { lineFoods, lineFoodsReplace } from '../urls';

export const postLineFoods = (params) => {
  // axios.postは第一引数にリクエスト先URL文字列、第二引数にパラメーターを取る
  return axios.post(lineFoods,
  {
    food_id: params.foodId,
    count: params.count,
    // この形にすることでサーバーサイドでは params[:food_id], params[:count]の形で読み取る
  }
  )
  .then(res => {
    return res.data
  })
  .catch((e) => {throw e;})
}

export const replaceLineFoods = (params) =>{
  return axios.put(lineFoodsReplace,
    {
      food_id: params.foodId,
      count: params.count,
    }
  )
  .then(res => {
    return res.data
  })
  .catch((e) => { throw e; })
}
