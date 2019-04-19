import service from './request.js'

import * as qiniu from 'qiniu-js'

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

export function addCategory(param) {
  return service({
    url: 'skuCategory/add',
    method: 'post',
    data: {
      categoryName: param.categoryName,
    }
  })
}

export function listCategory() {
  return service('skuCategory/list')
}

export function delCategory(param) {
  return service({
    url: 'skuCategory/del',
    method: 'post',
    data: {
      categoryId: param.categoryId,
    }
  })
}

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