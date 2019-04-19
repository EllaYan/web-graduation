import service from './request.js'

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