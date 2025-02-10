<script setup>
  import router from "@/router/index.js";

  const doLogin = () => {
    router.push("/");
  }

  const toRegister = () => {
    router.push("/register");
  }
</script>

<template>
  <div class="card-container">
    <el-card class="box-card">
      <template #header>登录</template>
      <el-form
          ref="ruleFormRef"
          style="max-width: 600px"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="auto"
          class="demo-ruleForm"
      >
        <el-form-item label="账号">
          <el-input type="text" autocomplete="off" placeholder="请输入账号"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" autocomplete="off" placeholder="请输入密码"/>
        </el-form-item>
        <div class="button-container">
          <el-button type="primary" @click="doLogin">
            登录
          </el-button>
          <el-button @click="toRegister">注册</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.card-container{
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box-card{
  min-width: 500px;
  max-width: 500px;
}
.button-container{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>