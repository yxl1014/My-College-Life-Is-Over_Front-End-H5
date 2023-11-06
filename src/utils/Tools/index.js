import {ElMessage} from 'element-plus'

/**
 * 成功弹窗消息
 * @param msg
 * @constructor
 */
export function successTools(msg) {
    ElMessage({
        showClose: true,
        message: msg,
        type: 'success',
    })
}

/**
 * 普通消息弹窗
 * @param msg
 */
export function msgTools(msg) {
    ElMessage({
        showClose: true,
        message: msg,
    })
}

/**
 * 警告消息弹窗
 * @param msg
 */
export function warningTools(msg) {
    ElMessage({
        showClose: true,
        message: msg,
        type: 'warning',
    })
}

/**
 * 错误消息弹窗
 * @param msg
 */
export function errorTools(msg) {
    ElMessage({
        showClose: true,
        message: msg,
        type: 'error',
    })
}
