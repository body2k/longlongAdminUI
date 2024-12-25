import request from '@/util/request'
//图书
let apiUrl = "/books/book"


/**
 * 分页 图书
 */
export function list() {
    return request({
        url: apiUrl + '/list',
        method: 'get',

    })
}
/**
 * 保存 图书
 */
export function save(data) {
    return request({
        url: apiUrl + '/save',
        method: 'post',
        data: data
    })
}
/**
 * 更新 图书
 */
export function update(data) {
    return request({
        url: apiUrl + '/update',
        method: 'post',
        data: data
    })
}
/**
 * 删除 图书
 */
export function remove(ids) {
    return request({
        url: apiUrl + '/remove',
        method: 'post',
        params: {
            ids: ids
        }
    })
}
/**
 * 分页 图书
 */
export function page( page,data) {
    return request({
        url: apiUrl + '/page',
        method: 'get',
        params: {
            current: page.current,
            size: page.size,
            ...data,
        }
    })
}
/**
 * 详情
 */
export function detail(param) {
    return request({
        url: apiUrl + '/detail',
        method: 'get',
        params:{
            ...param
        }
    })
}

export function getContent(id){
    return request({
        url: apiUrl + '/getContent',
        method: 'get',
        params:{
            id:id
        }
    })
}
