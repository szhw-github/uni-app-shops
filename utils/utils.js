
export function get (url) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}
