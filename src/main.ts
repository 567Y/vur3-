import { createApp } from 'vue'
import App from '@/App.vue'

// 引入element-plus插件和element-plus css样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 全局配置国际化的配置。
//@ts-ignore   在打包的时候让ts去忽略类型检测
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// svg需要配置代码
import 'virtual:svg-icons-register'
// 引入svgIcon组件 注册为全局组件
import SvgIcon from "./components/SvgIcon.vue"
// 引入element-plus提供的全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入路由
import router from "@/router/index"

// 引入模板全局样式
import '@/styles/index.scss'

//引入大仓库pinia
import pinia from "@/store/index"



const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
  })

  // 给商品分类组件注册为全局组件
import Category from "@/components/Category/index.vue"
// 设置暗黑模式的样式
import 'element-plus/theme-chalk/dark/css-vars.css'
  // 注册全局组件
app.component("SvgIcon",SvgIcon)
app.component("Category",Category)

app.use(pinia);
// 引入路由守卫
import "./permisstion"
app.use(router)
app.mount('#app')
// 将element-plus提供的图标注册为全局组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}


