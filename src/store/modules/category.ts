// 存储商品三级分类的小仓库

import {defineStore} from "pinia"
// 引入商品属性相关的接口
import {reqC1,reqC2,reqC3} from "@/api/product/attr/index.ts"

const useCategoryStore = defineStore("category",{
    state(){
        return{
            // 一二三级分类的数据
            c1Arr:[],
            c2Arr:[],
            c3Arr:[],
            // 一二三级分类的id
            c1Id:"",
            c2Id:"",
            c3Id:""
        }
    },
    actions:{
        // 获取一级分类数据
        async getC1(){
            let res = await reqC1();
            // console.log(res)
           if(res.code == 200){
            this.c1Arr = res.data;
           }
        },
        // 根据一级分类的id获取二级分类的数据
        async getC2(){
           let res = await reqC2(this.c1Id);
           if(res.code == 200){
            this.c2Arr = res.data;
           }
        },
        // 根据二级分类的id获取三级分类的数据
        async getC3(){
            let res = await reqC3(this.c2Id);
            if(res.code == 200){
                this.c3Arr = res.data;
            }
        }


    }
})

export default useCategoryStore;