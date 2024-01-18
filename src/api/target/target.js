import request from "@/utils/request.js"

// 查询配置详情
export function getConfigDetails(query) {
    return request({
        url: '',
        method: 'get',
        params:query
    })
}