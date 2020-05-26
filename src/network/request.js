import axios from 'axios'
export function request(config){
  const instance = axios.create({
    // 测试接口，需要接口请添加老师微信 coderwhy001
    baseURL : 'http://127.0.0.1:8000',
    timeout : 5000, 
  });
  // 拦截器
  // 1. 请求拦截
  instance.interceptors.request.use(config => {
    // console.log(config);
    // 当请求可以发出时   我们拦截  对其做一些修饰
    // 1. config中的一些信息不符合服务器需求
    // 2  每次发送请求时，都希望有一个loading
    // 3. 某些网络请求都必须携带一些特定信息（token）
    return config;//拦截修改后   ，一定要将config返回   让服务器得到请求   来做出响应
  },err => {
    // console.log(err);
  })

  // 2. 响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);//此时是服务器返回的数据
    return res.data;//返回数据本身
  },err => {
    // console.log(err);
    return err;
  })
  // 3. 发送真正的网络请求
  return instance(config);
}
