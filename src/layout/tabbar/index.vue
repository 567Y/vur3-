<template>
  <div class="tabbar">
    <!-- tabbar左侧静态 -->
    <div class="tabbar-left">
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="tabbar-right">
      <Setting></Setting>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入tabbar左侧面包屑
import Breadcrumb from '@/layout/tabbar/breadcrumb/index.vue'
// 引入tabbar右侧
import Setting from '@/layout/tabbar/setting/index.vue'
</script>

<script lang="ts">
  export default{
    name:"Tabbar"
  }
</script>

<style scoped lang="scss">
.tabbar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  .tabbar-left {
    display: flex;
    align-items: center;
  }
  .tabbar-right {
    display: flex;
    align-items: center;
  }
}
</style>
