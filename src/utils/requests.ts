import axios from "axios"
// 引入用户仓库
import useUserStore from "@/store/modules/user"

//对axios进行二次封装 加上请求和响应拦截器

//第一步：利用axios对象的create方法。去创建axios实例，配置一下基础路径、超时时间
//axios.create 根据指定配置创建一个新的 axios
let requests  = axios.create({
    //基础路径,发请求URL携带api【发现:真实服务器接口都携带/api】如果有/api就可以省略不写
    baseURL:"/api",
    // 超时时间
    timeout:5000,
})

//添加请求拦截器:在发请求之前，请求拦截器可以检测到，可以在发请求之前做一些事情
requests.interceptors.request.use((config)=>{
  // 获取用户相关的小仓库 获取仓库内部存储的token 登录成功以后携带给服务器
  const userStore = useUserStore();
  //将token放入到请求头中才能获取到用户登录以后的用户信息
  if(userStore.token){
    config.headers.token = userStore.token
  }
    return config;
})

//添加响应拦截器：可以检测到，可以在响应回来之后做一些事情 一般用于获取接口数据
requests.interceptors.response.use(result=> {
    // 获取接口数据以后直接获取.data里面的数据
    return result.data
    //响应失败的回调
}, (err) => {
     //失败回调:处理http网络错误的
    //定义一个变量:存储网络错误信息
    let message = ''
    //http状态码
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
        break
    }
    //提示错误信息
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
})

//最后需要暴露:暴露的是添加新的功能的axios,即为requests
export default requests;