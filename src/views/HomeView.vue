<script setup>

import HeaderMenu from "@/components/menu/HeaderMenu.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header-container">
        <HeaderMenu/>
      </el-header>
      <el-main>
        <RouterView/>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.header-container {
  margin: 0;
  padding: 0;
}
</style>