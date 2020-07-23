
// 配置项
const host = 'http://localhost:5959'

const api = {
  host,
  loginUrl: `${host}/weapp/login`,
  data: {
    data: `${host}/weapp/data/data`,
    seller: `${host}/weapp/data/seller`,
    goods: `${host}/weapp/data/goods`,
    ratings: `${host}/weapp/data/ratings`
  }
}
export default api
