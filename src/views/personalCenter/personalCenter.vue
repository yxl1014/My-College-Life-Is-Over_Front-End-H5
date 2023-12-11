<template>
  <div class="container">
    <el-row :gutter="24">
      <el-col :span="6">
        <el-card class="box-card" style="width: 100%">
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>
          <div class="personalInformationBody">
            <div class="uploadAvatar">
              <el-upload
                  class="avatar-uploader"
                  action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus/>
                </el-icon>
              </el-upload>
            </div>
            <el-divider />
            <div class="personalInformationItem">
              <div class="key">
                <el-icon><UserFilled /></el-icon>用户名称
              </div>
              <div class="value">
                {{basicInformationForm.userName}}
              </div>
            </div>
            <el-divider />
            <div class="personalInformationItem">
              <div class="key">
                <el-icon><Iphone /></el-icon>手机号码
              </div>
              <div class="value">
                {{basicInformationForm.phone}}
              </div>
            </div>
            <el-divider />
            <div class="personalInformationItem">
              <div class="key">
                <el-icon><Message /></el-icon>用户邮箱
              </div>
              <div class="value">
                {{basicInformationForm.email}}
              </div>
            </div>
            <el-divider />
            <div class="personalInformationItem">
              <div class="key">
                <el-icon><Opportunity /></el-icon>是否会员
              </div>
              <div class="value">
                {{basicInformationForm.isVip}}
              </div>
            </div>
            <el-divider />
            <div class="personalInformationItem">
              <div class="key">
                <el-icon><User /></el-icon>所属角色
              </div>
              <div class="value">
                {{basicInformationForm.belongingRole}}
              </div>
            </div>
            <el-divider />
            <div class="personalInformationItem">
              <div class="key">
                <el-icon><Calendar /></el-icon>创建日期
              </div>
              <div class="value">
               {{basicInformationForm.createTime}}
              </div>
            </div>
            <el-divider />
          </div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card class="box-card" style="width: 100%">
          <template #header>
            <div class="card-header">
              <span>基本资料</span>
            </div>
          </template>
          <div class="basicInformationBody">
            <el-tabs v-model="activeName" class="demo-tabs">
              <el-tab-pane label="基本资料" name="first">
                <el-form :model="basicInformationForm" :rules="basicInformationRules" label-width="80px">
                  <el-form-item label="用户昵称" prop="userName">
                    <el-input v-model="basicInformationForm.userName"/>
                  </el-form-item>
                  <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="basicInformationForm.phone"/>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="basicInformationForm.email"/>
                  </el-form-item>
                  <el-form-item label="性别">
                    <el-radio-group v-model="basicInformationForm.sex">
                      <el-radio label="男"/>
                      <el-radio label="女"/>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="">
                    <el-button type="primary">保存</el-button>
                    <el-button type="danger" @click="handleClose">关闭</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="修改密码" name="second">
                <el-form :model="changePasswordForm" :rules="changePasswordRules" label-width="80px">
                  <el-form-item label="旧密码" prop="oldPassword">
                    <el-input v-model="changePasswordForm.oldPassword"/>
                  </el-form-item>
                  <el-form-item label="新密码" prop="password">
                    <el-input v-model="changePasswordForm.password"/>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input v-model="changePasswordForm.confirmPassword"/>
                  </el-form-item>
                  <el-form-item label="">
                    <el-button type="primary">保存</el-button>
                    <el-button type="danger" @click="handleClose">关闭</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>
<script setup>
import {ref, reactive} from 'vue'
import {useRouter} from "vue-router";
import {Plus} from "@element-plus/icons-vue";

const router = useRouter();

// 头像
const imageUrl = ref('');

const activeName = ref('first')
// 基本资料form
const basicInformationForm = reactive({
  userName: "张三",
  phone: "18888881388",
  email: "18888881388@qq.com",
  isVip:false,
  sex: "男",
  belongingRole:"普通用户",
  createTime:"2023-08-21 13:15:28"
})
// 修改密码form
const changePasswordForm = reactive({
  oldPassword: "",
  password: "",
  confirmPassword: "",
})
// 个人信息 form表单验证规则
const basicInformationRules = reactive({
  userName: [
    {required: true, message: '请输入用户名称', trigger: 'change'}
  ],
  phone: [
    {required: true, message: '请输入手机号', trigger: 'change'}
  ],
  email: [
    {required: true, message: '请输入邮箱', trigger: 'change'}
  ],
})
// 确认密码 form表单验证规则
const changePasswordRules = reactive({
  oldPassword: [
    {required: true, message: '请输入旧密码', trigger: 'change'}
  ],
  password: [
    {required: true, message: '请输入新密码', trigger: 'change'}
  ],
  confirmPassword: [
    {required: true, message: '请输入确认密码', trigger: 'change'},
    {
      validator(_, value, callback) {
        // 确认密码
        if (value !== changePasswordForm.password) {
          callback(new Error('两次输入的密码不一致'))
        }
      },
      trigger: "change"
    }
  ]
})
// 头像上传成功
const handleAvatarSuccess = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
}
// 关闭按钮
const handleClose = () => {
//   跳转到主页面
  router.replace("/index")
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  .personalInformationBody {
    .uploadAvatar {
      display: flex;
      align-items: center;
      justify-content: center;
      .avatar-uploader {
        width: 120px;
        height: 120px;
        display: block;
        border: 1px dashed #d9d9d9;
        border-radius: 50%;
      }

      .avatar-uploader .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
      }

      .avatar-uploader .el-upload:hover {
        border-color: var(--el-color-primary);
      }

      .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        text-align: center;
      }
    }
    .personalInformationItem{
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      .key{
        display: flex;
        align-items: center;
      }
    }
    .el-divider{
      margin-top: 12px ;
      margin-bottom: 12px ;
    }
  }
}
</style>