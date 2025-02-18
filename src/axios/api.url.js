
const ENV = process.env.NODE_ENV
export default {
  DOMAIN: 'http://localhost:8091',
  baseURL: ENV === 'development' ? 'http://localhost:8091' : 'http://localhost:8091',
  util: {
    image: '/util/image.html' // 图片上传
  }
}
