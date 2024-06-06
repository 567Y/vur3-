import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入svg所用到的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
//mock插件提供方法
import { viteMockServe } from 'vite-plugin-mock'

import path from 'path'
// https://vitejs.dev/config/
export default defineConfig(({ command ,mode})=>{
  let env = loadEnv(mode,process.cwd())
  return {
    plugins: [vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        enable: command === 'serve',//保证开发阶段可以使用mock接口
      }),
    ],
    resolve: {
      alias: {
          "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
      }
  },
  // scss全局变量的配置
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "./src/styles/variable.scss";',
      },
    },
  },
  // 代理跨域
  server: {
    proxy: {
     '/api': {
        //获取数据的服务器地址设置
        target: "http://sph-api.atguigu.cn",
        //需要代理跨域
        changeOrigin: true,
        //路径重写
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
  
  
  }
})

