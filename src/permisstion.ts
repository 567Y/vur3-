// 路由守卫(路由鉴权)：项目当中某一个路由什么条件下能被访问、什么条件下不能被访问
// 引入路由
import router from '@/router/index'

//引入进度条
import nprogress from 'nprogress'
// //引入进度条样式
import 'nprogress/nprogress.css'
// 关闭加载微调器。
nprogress.configure({ showSpinner: false });
// 引入用户仓库
import useUserStore from '@/store/modules/user'
// 引入大仓库 在这里要获取小仓库数据必须引入大仓库
import pinia from '@/store/index'
const userStore = useUserStore(pinia)
// to:即将要进入的目标（路由对象）当前的路由
// ​from:当前导航正要离开的路由  从哪里跳转的路由
// next() 直接放行  // next('/路径名') 跳转到指定页面
//全局前置守卫：初始化时执行、每次路由切换前执行

// 用户未登录 只可以访问登录路由/login 其他路由一概不允许访问
// 用户登录以后 不能访问/login路由 其他路由一概可以访问
router.beforeEach(async (to, from, next) => {
  //进度条在进入路由之前开始动
  nprogress.start()
  let token = userStore.token
  // 获取用户名
  let username = userStore.username
  // 用户登录的情况下
  if (token) {
    // 将页面标题修改成跳转的路由
    document.title = "硅谷甄选-"+to.meta.title
    //登录成功了就不能去login登录路由了
    if (to.path == '/login') {
      next({ path: '/', query: { redirect: to.path } })
    } else {
      // 判断是否有用户信息 用户名 如果有放行
      // 就是让所有路由都能获取用户信息 防止在跳转到没有获取用户信息的路由中页面展示不了用户信息
      if (username) {
        next()
      } else {
        // (这里是因为刷新以后用户名会消失 所以在判断一下如果没有用户名的情况下就在向仓库发请求获取一次用户信息)
        // 如果没有用户信息 那么就发请求向用户仓库获取用户信息
        try {
          await userStore.userInfo()
          next() //获取用户信息以后放行
        } catch (error) {
          //当用户token过期或人为修改了token 那么直接跳转到登录页重新登录
          // 调用退出登录请求 删除用户的信息
          await userStore.userLogout()
          // 用户跳转到登录页以后 query参数保存在哪个路由退出的 下次获取token以后登录就会直接跳转到该路由
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
      next()
    }
  } else {
    // 用户未登录
    if (to.path == '/login') {
      next()
    } else {
      // 如果用户是去除了登录意外的其他路由都会直接转到登录路由中
      // 如果去的路由没有访问到也会将想去的路由地址放到query参数中 当有token以后点击登录会直接去到未登录时访问的路由
      next('/login')
    }
  }
})
// 后置路由守卫
router.afterEach((to, from) => {
  //进度条在到路由之后停止
  nprogress.done()
})
