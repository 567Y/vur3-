//统一管理项目用户相关的接口

import requests from "@/utils/requests";

import type {loginFormData,loginResponseData,userInfoResponseData} from "./type.ts"

// 统一管理接口
enum API{
    LOGIN_URL = "/admin/acl/index/login",
    USERINFO_URL = "/admin/acl/index/info",
    LOGOUT_URL = '/admin/acl/index/logout',
}
// 封装登录接口 获取登录接口信息        泛型第一个是请求参数的类型 第二个是服务器返回的数据类型     传参key-val一直省略key
export const reqLogin = (data:loginFormData)=> requests.post<any,loginResponseData>(API.LOGIN_URL,data);

// 获取用户信息接口信息
export const reqUserInfo = ()=>requests.get<any,userInfoResponseData>(API.USERINFO_URL);

//退出登录
export const reqLogout = () => requests.post<any, any>(API.LOGOUT_URL)