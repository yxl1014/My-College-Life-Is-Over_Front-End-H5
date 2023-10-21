import request from "@/utils/request.js"

// 获取验证码
export function getCodeImg() {
    return request({
      url: '/captchaImage',
      headers: {
        isToken: false
      },
      method: 'get',
      timeout: 20000
    })
  }
