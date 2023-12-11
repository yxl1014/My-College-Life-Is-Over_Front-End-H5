// 登录
import request from "@/utils/request.js"

// 注册
export function register(data) {
    return request({
        url: '/register',
        headers: {
            isToken: false
        },
        method: 'post',
        data:data
    })
}

// 获取邮箱验证码
export function getEmailCodeApi(query) {
    return request({
        url: '/valida_code/get_email',
        headers: {
            isToken: false
        },
        method: 'get',
        params:query
    })
}

// 获取手机验证码
export function getPhoneCodeApi(query) {
    return request({
        url: '/valida_code/get_phone',
        headers: {
            isToken: false
        },
        method: 'get',
        params:query
    })
}
