//创建用户相关的小仓库

import {defineStore} from "pinia";
import {reqLogin,reqUserInfo,reqLogout} from "@/api/user/index"
import type {loginFormData,loginResponseData,userInfoResponseData} from "@/api/user/type.ts"
// 引入当前所有常量路由 
import {constantRoute} from "@/router/routes.ts"
 let useUserStore = defineStore('User',{
    state(){
        return{
            token:localStorage.getItem("TOKEN"),//用户唯一标识
            MeunRoutes:constantRoute,//路由菜单数组 仓库存储的菜单数组需要用到路由渲染,菜单会根据路由的配置来渲染
            username:"", //用户名
            avatar:""    //用户头像
        }
    },
    actions:{
      // 用户登录方法
        async userLogin(data:loginFormData){
          let res:loginResponseData = await reqLogin(data)
          // console.log(res)
          if(res.code == 200){
            this.token = res.data;
            // 本地持久化存储token
            localStorage.setItem("TOKEN",res.data)
            // 成功返回一个ok 这样在vue文件中try可以检测到成功回调
            return 'ok'
          }else{
            // 不成功返回一个错误回调 这样在vue文件中catch可以检测到错误回调
            // 主要是错误回调让vue能检测到并做出相应处理方法
           return  Promise.reject(new Error(res.data))
          }
        },
        // 获取用户信息方法
        async userInfo(){
        // 获取用户信息之前现在requests中将token放进请求头中
          let res:userInfoResponseData = await reqUserInfo();
          if(res.code == 200){
            this.username = res.data.name;
            this.avatar = res.data.avatar;
            return "ok"
          }else{
            return  Promise.reject(new Error("获取用户信息失败"))
          }
        },
        // 用户退出登录方法
        async userLogout(){
          let res = await reqLogout();
          if(res.code == 200){
              // 清空用户信息
            this.username = '',
            this.avatar = '',
            this.token = '',
            localStorage.removeItem("TOKEN")
            return "ok"
          }else{
            return Promise.reject(new Error(res.message))
          }
        }
    },
    getters:{

    }
})


export default useUserStore;