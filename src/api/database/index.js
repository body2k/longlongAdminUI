import request from '@/util/request'

let apiUrl = "/codes/dbBase"

export function list() {
    return request({
        url: apiUrl + '/list',
        method: 'get',

    })
}

export function save(data) {
    return request({
        url: apiUrl + '/save',
        method: 'post',
        data: data
    })
}

export function update(data) {
    return request({
        url: apiUrl + '/update',
        method: 'post',
        data: data
    })
}

export function remove(ids) {
    return request({
        url: apiUrl + '/remove',
        method: 'post',
        params: {
            ids: ids
        }
    })
}

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
//查询数据库下的所有表
export function shoNameAndCommentTable( id) {
    return request({
        url: apiUrl + '/shoNameAndCommentTable',
        method: 'get',
        params: {
         id:id
        }
    })
}
/**
 * 保存全部
 */
export function saveAllTables(data) {
    return request({
        url: apiUrl + '/saveAllTables',
        method: 'post',
        data: data
    })
}

/**
 * 选择保存的表
 */
export function saveTables(data) {
    return request({
        url: apiUrl + '/saveTables',
        method: 'post',
        data: data
    })
}