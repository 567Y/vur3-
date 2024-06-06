<template>
    <el-card >
        <div class="box">
            <img :src="UserStore.avatar" alt="" class="avatar">
            <div class="con">
                <h1>{{ getTime() }}好{{ UserStore.username }}</h1>
                <h3>智慧甄选运行平台</h3>
            </div>
        </div>
    </el-card>
    <div class="bottom">
        <svg-icon name="welcome" style="width:500px;height:300px"></svg-icon>

    </div>
</template>

<script lang="ts" setup name="Home">
    // // 引入用户仓库
    import useUserStore from "@/store/modules/user"
    // 引入时间封装函数方法
    import { getTime } from "@/utils/time";
    // // 使用用户仓库
    //在全局路由守卫中获取过了用户信息 可以直接调用信息展示在页面
    const UserStore = useUserStore();
    // import { onMounted } from 'vue';
    // //首页组件挂载以后向用户仓库发请求获取用户信息数据
    // onMounted(()=>{
    //    UserStore.userInfo();
    // }) 
    　
</script>



<style scoped lang="scss">
.box{
    display: flex;
    .avatar{
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
    .con{
        margin-left:20px;
        h1{
            font-size: 30px;
            font-weight:bold;
            margin:20px 0
        }
        h3{
            font-style: italic;
            color:skyblue;
        }
    }
}
.bottom{
    margin-top:30px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>