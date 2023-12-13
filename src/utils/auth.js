import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  let time = new Date(new Date().getTime() + 1 * 60 * 1000);
  return Cookies.set(TokenKey, token,{expires:7})
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
