<script setup>
import router from "@/router/index.js";
import {ref} from "vue";
import {login} from "@/api/users/index.js";
import {ElMessage} from "element-plus";

const handleLogin = async () => {
  await login(loginInfo.value).then((response) => {
    if (response.status === 200) {
      let {code, message} = response.data
      if (code===20003){
        ElMessage.success(message)
        router.push("/")
      }else if (code === 20004||code === 20005||code ===20002) {
        ElMessage.error(message)
      }
    }
  })
}

const toRegister = () => {
  router.push("/register");
}

const loginInfo = ref({
  username: "",
  password: "",
})

</script>

<template>
  <div class="card-container">
    <el-card class="box-card">
      <template #header>登录</template>
      <el-form
          ref="ruleFormRef"
          style="max-width: 600px"
          :model="loginInfo"
          status-icon
          label-width="auto"
          class="demo-ruleForm"
      >
        <el-form-item label="账号">
          <el-input type="text"
                    autocomplete="off"
                    placeholder="请输入账号"
                    v-model.trim="loginInfo.username"
          />
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password"
                    autocomplete="off"
                    placeholder="请输入密码"
                    v-model.trim="loginInfo.password"
                    show-password
          />
        </el-form-item>
        <div class="button-container">
          <el-button type="primary" @click="handleLogin">
            登录
          </el-button>
          <el-button @click="toRegister">注册</el-button>
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