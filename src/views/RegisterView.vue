<script setup>
import router from "@/router/index.js";
import {ref} from "vue";
import {register} from "@/api/users/index.js";
import {ElMessage} from "element-plus";

const toLogin = () => {
  router.push("/login")
}

const handleRegister = async () => {
  await register(registerInfo.value).then((response) => {
    if (response.status === 200) {
      let {code, message} = response.data
      if (code === 20001) {
        ElMessage.error(message)
      }else if (code === 20000) {
        ElMessage.success(message)
      }
    }
  })
}

const registerInfo = ref({
  username: "",
  password: "",
  confirmPassword: "",
  number: ""
})

const refRegisterInfo = ref()

const validatePassword = (rule, value, callback) => {
  if (registerInfo.value.confirmPassword !== '') {
    if (!refRegisterInfo.value) {
      return
    }
    refRegisterInfo.value.validateField('confirmPassword')
  }
  callback()
}
const validateConfirmPassword = (rule, value, callback) => {
  if (value !== registerInfo.value.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const validateNumber = (rule, value, callback) => {
  if (value === "") {
    callback();
  } else if (!/^1[3456789]\d{9}$/.test(value)) {
    callback(new Error('电话号码格式不正确'));
  } else {
    callback();
  }
};

const rules = ref({
  username: [
    {required: true, message: "用户名不能为空", trigger: "blur"},
    {min: 8, max: 16, message: "用户名8~16个字符", trigger: "blur"}
  ],
  password: [
    {validator: validatePassword, trigger: "blur"},
    {required: true, message: "密码不能为空", trigger: "blur"},
    {min: 8, max: 24, message: "密码8~24个字符", trigger: "blur"}
  ],
  confirmPassword: [
    {validator: validateConfirmPassword, trigger: "blur"}
  ],
  number: [
    {validator: validateNumber, trigger: "blur"},
  ]
})

</script>

<template>
  <div class="card-container">
    <el-card class="box-card">
      <template #header>注册</template>
      <el-form
          ref="refRegisterInfo"
          style="max-width: 600px"
          :model="registerInfo"
          status-icon
          :rules="rules"
          label-width="auto"
          class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input type="text"
                    autocomplete="off"
                    placeholder="请输入账号"
                    v-model.trim="registerInfo.username"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password"
                    autocomplete="off"
                    placeholder="请输入密码"
                    v-model.trim="registerInfo.password"
                    show-password
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password"
                    autocomplete="off"
                    placeholder="请确认密码"
                    v-model.trim="registerInfo.confirmPassword"
                    show-password
          />
        </el-form-item>
        <el-form-item label="电话" prop="number">
          <el-input type="text" autocomplete="off" placeholder="请输入电话号码"
                    v-model.trim.number="registerInfo.number"/>
        </el-form-item>
        <div class="button-container">
          <el-button type="primary" @click="handleRegister">
            确认注册
          </el-button>
          <el-button @click="toLogin">返回</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.card-container {
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box-card {
  min-width: 500px;
  max-width: 500px;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>