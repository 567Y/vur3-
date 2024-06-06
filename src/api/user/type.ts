//定义用户相关数据接口中数据的ts类型


//登录接口参数需要携带的ts类型
export interface loginFormData{
    username:string,
    password:string
}

// 定义用户相关的全部接口返回的数据类型
export interface ResponseData{
    code:number,
    message:string,
    ok:boolean
}

// 定义登录接口返回的数据类型
export interface loginResponseData extends ResponseData{
    data:string 
}

// 定义获取用户信息返回的数据类型
export interface userInfoResponseData extends ResponseData{
    data:{
        routes:string[],
        buttons:string[],
        roles:string[],
        name:string,
        avatar:string
    }
}