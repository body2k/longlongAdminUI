import {createApp} from 'vue'
import App from './App.vue'
// @ts-ignore
import router, {init} from './router/index.js'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/css/elemetUiCss.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import longSupperTable from '@/components/longSupperTable.vue'
// @ts-ignore
import {longList} from '@/components/index'
// @ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
const app = createApp(App)
app.use(store)

app.use(ElementPlus, {locale: zhCn,})
app.use(router)
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)

}
for (let item in longList){
    // @ts-ignore
    app.component(item.key, item.value)
}
