import {createRouter, createWebHashHistory} from 'vue-router'
import login from '@/login'
import Layout from '@/layout/index.vue'
import fourZeroFour from '@/404'
import {getMenu, getToken} from "@/util/auth";


//当前用户的Token
const userToken = getToken()
//当前用户的菜单
const userMenu = JSON.parse(getMenu());

const addMenu = []
export const routes = [
    {
        path: '/login',
        name: '登录',
        component: login,
        meta: {
            title:'登录',

        },
    },
    {
        path: '/home',
        component: Layout,
        hidden: true,
        children:[

        ]
    }, {
        path: '/404',
        name: '404',
        component: fourZeroFour
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

    if (getMenu()) {
        if (userToken) {
            //路由存在填充路
            if (userMenu) {
                TreeToList();
                for (let i = 0; i < addMenu.length > 0; i++) {
                    let item = addMenu[i]
                    if (item.isOpen === 0) {
                        let addRoute =
                            {
                                path: item.path,
                                name: item.name,
                                meta: {
                                    title: item.name,

                                },
                                // route level code-splitting
                                // this generates a separate chunk (about.[hash].js) for this route
                                // which is lazy-loaded when the route is visited.
                                component: Layout,
                                children: [{
                                    path: item.path,
                                    name: item.name,
                                    component: () => import('@/views' + item.path),
                                    meta: {
                                        title: item.name,
                                    }
                                }],

                            }

                        router.addRoute(addRoute)
                    } else {
                        let addRoute =
                            {
                                path: item.path,
                                name: item.name,
                                meta: {
                                    title: item.name,

                                },
                                // route level code-splitting
                                // this generates a separate chunk (about.[hash].js) for this route
                                // which is lazy-loaded when the route is visited.

                                children: [{
                                    path: item.path,
                                    name: item.name,
                                    component: () => import('@/views' + item.path),
                                    meta: {
                                        title: item.name,

                                    }
                                }],

                            }
                    }
                }


                // menu.for(item => {
                //
                // })
            }
            //token不存在当前用户未登录
        } else {

        }

}


export function TreeToList() {

    for (let i = 0; i < userMenu.length; i++) {
        treeToList(userMenu[i])
    }
    return addMenu
}

/**
 * 树形结构转List
 * @param paramMenu 处理数据
 * */
export function treeToList(paramMenu) {
    if (paramMenu.hasOwnProperty('children')) {
        for (let i = 0; i < paramMenu.children.length; i++) {
            treeToList(paramMenu.children[i])
        }

    } else {
        addMenu.push(paramMenu);
    }


}


router.beforeEach(async (to, from, next) => {
    window.document.title = to.meta.title?to.meta.title:'首页'
    if (to.path === '/login') {
        next();
    } else {
        //token存在跳转到首页
        if (getToken()) {
            if (to.matched.length > 0) {
                next()
            } else {
                if (to.path === '/') {
                    next({path: '/home'});

                } else {
                    next({path: '/404'});

                }
            }
            //不存在则跳到登录页面
        } else {
            next({path: '/login'});

        }
    }
})
export default router
