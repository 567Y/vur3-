<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{fold:LayoutSettingStore.fold?true:false}">
      <!-- logo区域 -->
      <div class="logo">
        <img :src="setting.logo" alt="" />
        <p>{{ setting.title }}</p>
      </div>

      <!-- 菜单区域 -->
      <!-- 滚动条组件 -->
      <el-scrollbar class="scrollbar">
        <!-- default-active:页面加载时默认激活菜单的 index -->
        <el-menu
          :collapse="LayoutSettingStore.fold?true:false"
          background-color="#001529"
          text-color="#fff"
          active-text-color="orange"
          :default-active="$route.path"
        >
          <!-- 将配置的所有路由传给meun组件 根据路由自动生成菜单 -->
          <Menu :menuList="userStore.MeunRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
                                <!-- class的对象写法 如果为true就使用fold这个类 让菜单宽度缩小 顶部导航和内容区域宽度变大 反之隐藏  -->
    <div class="layout_tabber" :class="{fold:LayoutSettingStore.fold?true:false}">
        <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区域 -->
    <div class="layout_main"  :class="{fold:LayoutSettingStore.fold?true:false}">
      <!-- 路由展示区域 -->
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入路由
import { useRoute } from 'vue-router'
// 项目的logo|标题配置
import setting from '@/setting'
// 引入左侧菜单
import Menu from '@/layout/meun/index.vue'
// 引入右侧内容展示区域
import Main from '@/layout/main/index.vue'
//引入顶部tabbar
import Tabbar from "@/layout/tabbar/index.vue"
// 引入用户小仓库
import useUserStore from '@/store/modules/user'
// 引入layout配置仓库
import useLayoutSettingStore from "@/store/modules/setting"
const  LayoutSettingStore = useLayoutSettingStore();


const userStore = useUserStore()

const $route = useRoute()
// console.log($route.path)
</script>

<script lang="ts">
    export default{
        name:"Layout"
    }
</script>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;
  .logo {
    width: 100%;
    height: $base-menu-logo-height;
    display: flex;
    align-items: center;
    padding: 10px;
    img {
      width: 40px;
      height: 40px;
    }
    p {
      font-size: 20px;
      font-weight: bold;
      margin-left: 10px;

    }
  }
}

.layout_slider {
  width: $base-menu-width;
  background-color: $base-menu-background;
  height: 100vh;
  color: #fff;
  transition: all .3s;
  .scrollbar {
    width: 100%;
    height: calc(100% - $base-menu-logo-height);
    .el-menu {
      border-right: none;
    }
  }
  &.fold{
    width: $base-menu-min-width;
  }
}
.layout_tabber {
  position: fixed;
  left: $base-menu-width;
  top: 0;
  height: $base-tabbar-height;
  width: calc(100% - $base-menu-width);
  transition: all .3s;
  &.fold{
    width: calc(100% - $base-menu-min-width);
    left:$base-menu-min-width
  }
}

.layout_main {
  position: absolute;
  left: $base-menu-width;
  top: $base-tabbar-height;
  width: calc(100% - $base-menu-width);
  height: calc(100vh - $base-tabbar-height);
  overflow: auto;
  padding: 20px;
  transition: all .3s;
  &.fold{
    width: calc(100% - $base-menu-min-width);
    left:$base-menu-min-width
  }
}
</style>
