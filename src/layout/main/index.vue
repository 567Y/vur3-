<template>
  <!-- 路由组件出口的位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout一级路由组件的子路由 -->
      <!-- v-if控制路由销毁或重建 -->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { watch, ref,nextTick } from 'vue'
//引入进度条
import nprogress from 'nprogress'
// //引入进度条样式
import 'nprogress/nprogress.css'
// 控制路由销毁或重建
let flag = ref(true)
// 引入layout仓库
import useLayoutSettingStore from '@/store/modules/setting'
const LayoutSettingStore = useLayoutSettingStore()
// 监听layout仓库中的refsh是否刷新
watch(() => LayoutSettingStore.refsh,(value) => {
    nprogress.start()
    // 点击刷新按钮路由组件销毁
    flag.value = false;
    // 使用nextTick销毁后重建实现刷新功能
    nextTick(()=>{
        flag.value = true;
        nprogress.done()
    })
  },
)
</script>
<script lang="ts">
export default {
  name: 'Main',
}
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
