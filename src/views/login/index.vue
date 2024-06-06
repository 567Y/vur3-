<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <!-- 登录的表单 
          model:要校验的表单数据对象
          ref:获取表单的对象实例 一般使用自定义校验规则才会用到
          rules:表单校验的规则方法回调
        -->
        <el-form class="login_form"  
        :model="loginForm"
        :rules="rules"
        ref="loginForms">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <!-- prop:所校验字段的名字 一般写要校验的数据对象中的属性 -->
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              type="password"
              show-password
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" class="loginBtn" @click="login">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup name="Login">
// 引入用户小仓库
import useUserStore from '@/store/modules/user'

// 引入当前是什么时间段的函数
import { getTime } from '@/utils/time'

// 引入路由器和路由对象
import { useRouter,useRoute } from 'vue-router'

let $router = useRouter();
let $route = useRoute();

let useStore = useUserStore()

import { User, Lock ,Share} from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus';

import { reactive,ref } from 'vue'
let loading = ref(false);
const loginForm = reactive({
  username: 'admin',
  password: '111111',
})
// 获取el-form表单实例对象
let loginForms = ref();

// 自定义校验规则书写
/**
 * rule:校验规则实例对象
 * value:输入表单元素文本内容
 * callback函数:符合规则放行 不符合规则注入错误提示信息
 */
function validatUsername(rule:any,value:any,callback:any){
  if(value.trim().length>=5){
    callback()//放行
  }else{
    callback(new Error("账号长度至少五位"))
  }
}

function validatPassword(rule:any,value:any,callback:any){
  if(value.length>=6){
    callback()//放行
  }else{
    callback(new Error("账号长度至少六位"))
  }
}

// 表单校验规则
const rules = {
  // required：必填项
  // message:错误提示信息
  // trigger:错误信息触发时机 bulr:失去焦点时 change:数据改变时
  username:[
    // {required:true,message:"用户名不能为空",trigger:"blur"},
    // {required:true,min:5,max:10,message:"用户名最小五位",trigger:"change"}

    // 自定义校验规则
    {trigger:"change",validator: validatUsername,}
  ],
  password:[
    // {required:true,message:"密码不能为空",trigger:"blur"},
    // {required:true,min:6,max:10,massage:"密码最小六位",trigger:"change"}

     // 自定义校验规则
     {trigger:"change",validator: validatPassword,}
  ]
}

// 点击登录回调
async function login() {
  // 等待校验规则通过以后执行下面代码
 await loginForms.value.validate();
  // 加载效果 开始加载
  loading.value = true;
  try {
     await useStore.userLogin(loginForm)
    //  如果登录有路由传进来那么就带参跳转到该路由 没有就跳转到layout
     if($route.query.redirect){
      $router.push({path:$route.query.redirect})
     }else{
      $router.push("/")
     }
    
    // $router.push('/')
    ElNotification({
        type:"success",
        title:`Hi${getTime()}好`,
        message:"欢迎回来"
    })
    loading.value = false;
  } catch (error) {
     // 加载效果 结束加载
    loading.value = false;
    ElNotification({
        type:"error",
        message:"登录失败"
    })
  }
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  background-color: red;
}

.login_form {
  position: relative;
  width: 80%;
  top: 30vh;
  color: #fff;
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;
  padding: 40px;
  h1 {
    font-size: 40px;
  }
  h2 {
    font-size: 20px;
    margin: 20px 0;
  }
  .loginBtn {
    width: 100%;
  }
}
</style>
