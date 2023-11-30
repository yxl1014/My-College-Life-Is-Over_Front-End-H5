import request from "@/utils/request.js"

// 获取验证码
export function getCodeImg() {
    return request({
        url: '/valida_code/get_picture',
        headers: {
            isToken: false
        },
        method: 'get',
        timeout: 20000
    })
}

// 登录
export function login(data) {
    return request({
        url: '/login',
        headers: {
            isToken: false
        },
        method: 'post',
        timeout: 10000,
        data:data
    })
}
