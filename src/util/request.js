import axios from 'axios'
import {ElMessage, ElMessageBox} from 'element-plus'
import store from '@/store'
import {
    getToken
} from './auth'

const Base64 = require('js-base64').Base64
const baseUrl = process.env.VUE_APP_API_BASEURL
const service = axios.create({
    baseURL: baseUrl,
    //请求时间
    timeout: 9999999
})
service.interceptors.request.use(
    config => {
        //token不存在的是时候
        if (getToken() === undefined) {
        } else {
            const token = getToken()
            //请求头携带token
            config.headers['cloud-auth'] = 'bearer ' + token
        }
        config.headers['Authorization'] = 'Basic ' + Base64.encode(process.env.VUE_APP_API_AUTHORIZATION)

        //用户类型
        config.headers['User-Type'] = 'pos'
        config.headers['tenantId'] = '1111'
        return config
    },
    error => {


        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {

        if (response.status !== 200) {

            ElMessage({
                message: '未找到服务器请稍后',
                type: 'error',

            })
            return
        }
        const res = response.data
        // if the custom code is not 20000, it is judged as an error.
        if (res.code === 200) {
            return res
        } else {
            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            // 授权失效或是过期需要回调重新获取授权码
            if (res.code === 401) {
                // to re-login
                ElMessageBox.confirm('登录失效，请重新登录！',
                    '失效退出', {
                        confirmButtonText: '重新登录',

                        type: 'warning'
                    }).then(() => {
                    this.$router.push({
                        path: "/login",
                    })
                }).catch(() => {
                    this.$router.push({
                        path: "/login",
                    })
                })
                return res

            } else {
                ElMessage({
                    message: res.msg || 'Error',
                    type: 'error',
                    duration: 5 * 1000
                })
                return res

            }
        }
    },
    error => {
        try {
            if (error.status !== 200) {

                ElMessage({
                    message: '未找到服务器请稍后',
                    type: 'error',

                })
                return
            }
            if (error.response.data.code === 401) {
                ElMessageBox.alert('请求为授权，请重新登陆').then(REQ => {
                    this.$router.push({
                        path: "/login",
                    })
                })

                return
            } else if (error.response.data.code === 400) {
                ElMessage({
                    message: error.msg || 'Error',
                    type: 'error',
                    duration: 5 * 1000
                })
                return
            } else {

                ElMessage({
                    message: '未知异常',
                    type: 'error',
                    duration: 5 * 1000
                })
                return
            }
        } catch (e) {
            ElMessage({
                message: '未知异常',
                type: 'error',
                duration: 5 * 1000
            })

            return
        }


        return Promise.reject(error)
    }
)

export default service