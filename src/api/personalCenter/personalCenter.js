// 个人中心
import request from "@/utils/request.js"

// 获取用户信息
export function getUserInfo() {
    return request({
        url: '/getUserInfo',
        method: 'get',
    })
}

// 保存基本信息
export function saveBaseInfo(data) {
    return request({
        url: '/saveBaseInfo',
        method: 'post',
        data:data
    })
}

// 保存修改密码
export function saveUpdatePawword(data) {
    return request({
        url: '/saveUpdatePawword',
        method: 'post',
        data:data
    })
}