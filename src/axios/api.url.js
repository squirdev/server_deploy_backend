
const ENV = process.env.NODE_ENV
export default {
  DOMAIN: 'http://218.245.99.146:10665',
  baseURL: ENV === 'development' ? 'http://218.245.99.146:10665' : 'http://218.245.99.146:10665',
  util: {
    image: '/util/image.html' // 图片上传
  }
}
