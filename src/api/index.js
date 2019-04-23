import service from './request.js'

// 登录前发送验证码
export function sendLoginCheckCode(param){
  return service({
    url: 'send/checkCode/login',
    method: 'post',
    data: {
      phone: param.phone
    }
  })
}

// 登录
export function login(param) {
  return service({
    url: 'login',
    method: 'post',
    data: {
      phone: param.phone,
      password: param.password,
      checkCode: param.checkCode
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

// 删除商品
export function deleteSku(param){
  return service({
    url: 'sku/del',
    method: 'post',
    data:{
      skuId: param
    }
  })
}

// 获得订单列表
export function listOrder(param) {
  return service.get('order/list',{
    params: param
  })
}

// 获得团长申请列表
export function listRegimentalInfo(param){
  return service.get('regimentalInfo/list',{
    params: param
  })
}

// 审核团长
export function updateRegimentalInfo(param) {
  return service({
    url: 'regimentalInfo/update',
    method: 'post',
    data: {
      regimentalInfoId: param.regimentalInfoId,
      status: param.status
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

// 获得管理员列表
export function listAdmin(){
  return service({
    url: 'admin/list',
    method: 'post',
    data: {}
  })
}

// 添加管理员
export function addAdmin(param) {
  return service({
    url: 'admin/add',
    method: 'post',
    data: {
      name: param.name,
      phone: param.phone,
      password: param.password
    }
  })
}

// 管理员修改信息之前 发送验证码
export function sendAdminCheckCode() {
  return service({
    url: '/send/checkCode/admin',
    method: 'post',
    data: {}
  })
}

// 修改管理员信息
export function updateAdmin(param) {
  return service({
    url: 'admin/update',
    method: 'post',
    data: {
      name: param.name,
      phone: param.phone,
      password: param.password,
      checkCode: param.checkCode
    }
  })
}

// 格式化日期方法
export function formatDate(time) {
  var date=new Date(time);
  var year=date.getFullYear();
  /* 在日期格式中，月份是从0开始的，因此要加0
   * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
   * */
  var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
  var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
  var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
  var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
  var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
  // 拼接
  return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
}