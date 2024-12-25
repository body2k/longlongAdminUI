// @ts-ignore
import request from '@/util/request'

let apiUrl = "auth"

export function token(user: { account: String; password: String; }) {
    return request({
        url: apiUrl + '/token',
        method: 'post',
        params: {
            account: user.account,
            password: user.password,
        }
    })
}

export function roleTree() {
    return request({
        url: "/users/menu/role-tree",
        method: 'get',

    })
}