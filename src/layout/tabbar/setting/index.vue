<template>
  <el-button size="small" icon="Refresh" circle @click="updatRefsh"></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="fullScreen"
  ></el-button>
  
  <el-popover placement="bottom" title="主题设置" :width="300" trigger="hover">
        <el-form :inline="true">
            <el-form-item label="主题颜色">
                <el-color-picker :teleported="false" @change="setColor" v-model="color" size="small" show-alpha :predefine="predefineColors" />
            </el-form-item>
            <el-form-item label="暗黑模式">
                <el-switch @change="changeDark" v-model="dark"  inline-prompt
                    active-icon="MoonNight" inactive-icon="Sunny" />
            </el-form-item>
        </el-form>
        <template #reference>
            <el-button size="small" icon="Setting" circle></el-button>
        </template>
    </el-popover>

  <img
    :src="avatar"
    style="width: 24px; height: 24px; margin: 0 20px; border-radius: 50%"
    alt=""
  />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import {ref} from "vue";
// 引入layout仓库
import useLayoutSettingStore from '@/store/modules/setting'
// 引入路由器和路由对象
import {useRouter,useRoute} from "vue-router";
const $router = useRouter();
const $route = useRoute();

let dark = ref(false)
// 引入用户相关信息仓库
import useUserStore from '@/store/modules/user'
import { storeToRefs } from 'pinia'
const userStore = useUserStore();
// 结构出仓库的数据
const { username, avatar } = storeToRefs(userStore)
const LayoutSettingStore = useLayoutSettingStore()
// 点击刷新按钮回调
const updatRefsh = () => {
  LayoutSettingStore.refsh = !LayoutSettingStore.refsh
}
//点击全屏按钮回调
function fullScreen() {
  // DOM对象的属性：document.fullscreenElement用来判断当前是否全屏[全屏:true,非全屏:null]
  let full = document.fullscreenElement
  if (!full) {
    // 如果是非全屏 使用 document.documentElement.requestFullscreen();可以实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    // 如果是全屏 使用document.exitFullscreen();可以实现退出全屏模式
    document.exitFullscreen()
  }
}

  // 退出登录回调
  const logout = async ()=>{
    await userStore.userLogout();
    // 跳转到登录页面            在那个页面退出的登录 下次登录的时候就跳转到该路由
    $router.push({path:"/login",query:{redirect:$route.path}})
  }
  // 选择颜色的组件样式
  const color = ref('rgba(255, 69, 0, 0.68)')
  const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
  ])
  //switch开关的chang事件进行暗黑模式的切换
const changeDark = () => {
    //获取HTML根节点
    let html = document.documentElement;
    console.log(html)
    //判断HTML标签是否有类名dark
    dark.value ? html.className = 'dark' : html.className = '';
}


//主题颜色的设置
const setColor = ()=>{
   //通知js修改根节点的样式对象的属性与属性值
   const html = document.documentElement;
   html.style.setProperty('--el-color-primary',color.value);
}
</script>

<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style scoped></style>
