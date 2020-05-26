
// 导入axios封装函数
import {request} from './request';

// 为home请求数据  并且导出
export function getHomeMultidata(){
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request ({
    url: '/home/data',
    params: {
      type,
      page,
    }
  })
}