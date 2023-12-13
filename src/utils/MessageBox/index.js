import {ElMessageBox } from "element-plus";

// 消息盒子弹窗
export function messageBox(msg) {
    return ElMessageBox.confirm(
        msg,
        '系统提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )

}