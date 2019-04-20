import service from './request.js'

// 登录
export function login(param) {
  return service({
    url: 'login',
    method: 'post',
    data: {
      phone: param.phone,
      password: param.password,
    }
  })
}
// 添加分类
export function addCategory(param) {
  return service({
    url: 'skuCategory/add',
    method: 'post',
    data: {
      categoryName: param.categoryName,
    }
  })
}
// 分类列表
export function listCategory() {
  return service('skuCategory/list')
}
// 删除分类
export function delCategory(param) {
  return service({
    url: 'skuCategory/del',
    method: 'post',
    data: {
      categoryId: param.categoryId,
    }
  })
}
// 修改分类
export function updateCategory(param) {
  return service({
    url: 'skuCategory/update',
    method: 'post',
    data: {
      categoryId: param.categoryId,
      categoryName: param.categoryName,
    }
  })
}
// 获取七牛token
export function getToken() {
  return service({
    url: 'get/qiniuToken',
    method: 'post',
    data: {}
  })
}
// 添加商品
export function addSku(param) {
  return service({
    url: 'sku/add',
    method: 'post',
    data: {
      categoryId: param.categoryId,
      skuName: param.skuName,
      des: param.des,
      subtitle: param.subtitle,
      thumbnail: param.thumbnail,
      richText: param.richText,
      price: param.price,
      discountPrice: param.discountPrice,
      amount: param.amount,
      isShow: param.isShow,
    }
  })
}

// 修改商品
export function updateSku(param) {
  return service({
    url: 'sku/update',
    method: 'post',
    data: {
      skuId: param.skuId,
      categoryId: param.categoryId,
      skuName: param.skuName,
      des: param.des,
      subtitle: param.subtitle,
      thumbnail: param.thumbnail,
      richText: param.richText,
      price: param.price,
      discountPrice: param.discountPrice,
      amount: param.amount,
      isShow: param.isShow,
    }
  })
}

export function deleteSku(param){
  return service({
    url: 'sku/del',
    method: 'post',
    data:{
      skuId: param
    }
  })
}

// 获取商品列表
export function listSku(param) {
  return service({
    url: 'sku/list',
    method: 'post',
    data: {
      categoryId: param.categoryId,
      isShow: param.isShow,
      page: param.page,
      pageSize: param.pageSize
    }
  })
}