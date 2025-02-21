<script setup>
  import {ref} from "vue";
  const activeIndex = ref('1')
</script>

<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      router
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="0">
      <img
          style="width: 100px"
          src="../../images/element-plus-logo.svg"
          alt="Element logo"
      />
    </el-menu-item>
    <el-menu-item index="1" route="/main">首页</el-menu-item>
    <el-menu-item index="2" route="/team">组队</el-menu-item>
    <el-menu-item index="3" route="/personal">我的</el-menu-item>
  </el-menu>
</template>

<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>