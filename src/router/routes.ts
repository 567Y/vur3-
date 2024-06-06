//对外暴露配置的常量路由
export const constantRoute = [
    {
        path:"/login",
        component:()=>import("@/views/login/index.vue"),
        name:"login",
        // 路由元信息 title:用于展示菜单标题
        meta:{
            title:"登录",
            hidden:true ,//路由在菜单中是否隐藏 true:隐藏 false:不隐藏,
            icon:"Avatar"
        }
    },

    {
        // 登录成功以后展示的路由
        path:"/",
        component:()=>import("@/layout/index.vue"),
        name:"layout",
        meta:{title:"",hidden:false,icon:""},
        // 当访问到layoute路由时 直接重定向到home首页
        redirect:"/home",
        children:[
            {
                path:"/home",
                component:()=>import("@/views/home/index.vue"),
                name:"home",
                meta:{title:"首页",hidden:false,icon:"HomeFilled"},
            }
        ]
    },
    {
        path:"/404",
        component:()=>import("@/views/404/index.vue"),
        name:"404",
        meta:{title:"404",hidden:true,icon:"Delete"},
    },
    // 数据大屏的一级路由不是layout所以在layout中点击数据大屏会跳转到脱离layout的screen路由中
    {
        path: '/screen',
        component: () => import('@/views/screen/index.vue'),
        name: 'Screen',
        meta: {
          hidden: false,
          title: '数据大屏',
          icon: 'Platform',
        },
      },
    {
        path:"/acl",
        component:()=>import("@/layout/index.vue"),
        name:"Acl",
        meta:{title:"权限管理",hidden:false,icon:"Lock"},
        // 当跳转权限管理/acl是 重定向到/acl/user用户管理中
        redirect:"/acl/user",
        children:[
            {
                path:"/acl/user",
                component:()=>import("@/views/acl/user/index.vue"),
                name:"User",
                meta:{title:"用户管理",hidden:false,icon:"User"}
            },
            {
                path:"/acl/role",
                component:()=>import("@/views/acl/role/index.vue"),
                name:"Role",
                meta:{title:"角色管理",hidden:false,icon:"UserFilled"}
            },
            {
                path:"/acl/permission",
                component:()=>import("@/views/acl/permission/index.vue"),
                name:"Permission",
                meta:{title:"菜单管理",hidden:false,icon:"Monitor"}
            }
        ]
    },
    {
        path:"/product",
        component:()=>import("@/layout/index.vue"),
        name:"Product",
        // hidden不写默认是undefined就是false
        meta:{title:"商品管理",icon:"Goods"},
         // 当跳转商品管理/product是 重定向到/product/trademark品牌管理中
         redirect:"/product/trademark",
        children:[
            {
                path:"/product/trademark",
                component:()=>import("@/views/product/trademark/index.vue"),
                name:"Trademark",
                meta:{title:"品牌管理",icon:"ShoppingCart"}
            },
            {
                path:"/product/attr",
                component:()=>import("@/views/product/attr/index.vue"),
                name:"Attr",
                meta:{title:"属性管理",icon:"HelpFilled"}
            },
            {
                path:"/product/spu",
                component:()=>import("@/views/product/spu/index.vue"),
                name:"Spu",
                meta:{title:"SPU管理",icon:"HelpFilled"}
            },
            {
                path:"/product/sku",
                component:()=>import("@/views/product/sku/index.vue"),
                name:"Sku",
                meta:{title:"SKU管理",icon:"TrendCharts"}
            }
        ]
    },
    {
        // 挑战的路由不属于配置的路由会自动跳转到404路由
        path:'/:pathMatch(.*)*',
        redirect:'/404',
        name:'Any',
        meta:{title:"任意路由",hidden:true,icon:"Crop"},
    }
]