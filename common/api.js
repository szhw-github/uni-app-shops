
// 配置项
const host = 'http://192.168.199.161:5858'

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
