// 登录
import request from "@/utils/request.js"

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
