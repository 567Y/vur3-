<template>
  <!-- 根据配置的路由自动生成左侧菜单 简称动态路由 -->
  <template v-for="item in menuList" :key="item.path">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item
        :index="item.path"
        v-if="!item.meta.hidden"
        @click="goRoute"
      >
        <!-- 菜单左侧图标 -->
        <el-icon>
          <!-- component全局组件是vue自带的 -->
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有一个子路由 一个子路由自动隐藏父路由-->
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item
        :index="item.children[0].path"
        v-if="!item.children[0].meta.hidden"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有一个以上子路由生成折叠菜单 -->
    <el-sub-menu
      :index="item.path"
      v-if="item.children && item.children.length > 1"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <!-- 递归组件：将子路由重新传给Meun组件 然后在最上面重新循环MeunList 找到符合条件的路由进行递归
        
      -->
      <Menu :menuList="item.children"></Menu> 
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
// 引入路由组件
import { useRouter } from 'vue-router'
const $router = useRouter()

// 菜单路由回调
const goRoute = (vc) => {
  // console.log(vc.index);
  $router.push(vc.index)
}
// 获取父组件传过来的的全部路由组件
defineProps(['menuList'])
</script>

<script lang="ts">
export default {
  name: 'Menu',
}
</script>

<style scoped lang="scss">
</style>
