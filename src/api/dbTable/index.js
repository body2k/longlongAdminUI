import request from '@/util/request'

let apiUrl = "/codes/dbTable"

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
export function generate(ids) {
    return request({
        url: apiUrl + '/generate',
        method: 'post',
        params: {
            ids: ids
        }
    })
}