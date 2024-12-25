import Cookies from 'js-cookie'

const TokenKey = 'book_token'

//获取token
export function getToken() {
    return Cookies.get(TokenKey)
}

//设置token
export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken(token) {
    return Cookies.remove(TokenKey)
}


//设置姓名
export function setName(name) {
    return Cookies.set("name", name)
}

export function setAvatar(avata) {
    return Cookies.set("avata", avata)
}

export function setTenantId(avata) {
    return Cookies.set("tenantId", avata)
}



export function getTenantId() {
    return Cookies.get("tenantId")
}

export function getName() {
    return Cookies.get("name")
}

export function getAvata() {
    return Cookies.get("avata")
}


export function remove() {
    removeIMenu()
    removeUser()
    removeToken()


}

//菜单存储
export function setMenu(avata) {
    return localStorage.setItem("menu", JSON.stringify(avata))
}

export function setUser(user) {
    return localStorage.setItem("user", JSON.stringify(user))
}

export function getUser() {
    return localStorage.getItem("user")
}
export function removeUser() {
    return localStorage.removeItem("user")
}
export function getMenu() {
    return localStorage.getItem("menu")
}
export function removeIMenu() {
    return localStorage.removeItem("menu")
}

export function localSet(onOff) {
    return localStorage.setItem('onOff', JSON.stringify(onOff))
}

export function localGet(onOff) {

    return localStorage.getItem('onOff')
}


