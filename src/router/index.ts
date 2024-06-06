import {createRouter,createWebHashHistory} from 'vue-router'


import { constantRoute } from './routes';
const router = createRouter({
    history:createWebHashHistory(),//路由器的工作模式 
    routes:constantRoute,
    //滚动行为
    scrollBehavior(){
        return{
            left:0,
            top:0
        }
    }
})
export default router;