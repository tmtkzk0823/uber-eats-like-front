import axios from "axios"
import { restaurantsIndex } from "../urls/index"

export const fetchRestaurants = () => {
  // axiosはPromiseベース（非同期処理）, getメソッドには文字列が必要なのでurls/indexで定義した変数を渡している。
  return axios.get(restaurantsIndex)
  .then((res) => { //返り値をresという変数で取得し、res.dataでレスポンスの中身だけreturnしている
    return res.data
  })
  .catch((e) => console.log(e))
}