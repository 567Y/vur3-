<template>
  <!-- 面包屑管理 -->
  <!-- 动态控制面包屑展示 路由中matched属性是一个数据可以获取到当前路由下的所有子路由 
    所以动态渲染matched就可以实现动态控制面包屑
    :to="item.path"点击面包屑也可以跳转路由
  -->
    <!-- v-show="item.meta.title":meta中title不为空的显示 其余的隐藏 主要是为了在面包屑中取出layout面包屑 -->
      <el-icon style="margin: 0 10px" @click="changeIcon" >
        <component :is="LayoutSettingStore.fold?'Fold':'Expand'"></component>    
      </el-icon>
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index" :to="item.path" v-show="item.meta.title">
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router"
const $route = useRoute();
// 引入layout配置仓库
import useLayoutSettingStore from "@/store/modules/setting"
const  LayoutSettingStore = useLayoutSettingStore();
    //点击图标的方法
    const changeIcon = ()=>{
      LayoutSettingStore.fold = !LayoutSettingStore.fold
    }
</script>

<script lang="ts">
export default{
    name:"Breadcrumb"
}
</script>

<style scoped>

</style>