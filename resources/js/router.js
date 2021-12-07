import Vue from "vue";
import Router from 'vue-router'

Vue.use(Router)
// import firstpage from './components/pages/basic/tags'
// import newroutepage from './components/pages/newRoutePage'
// import hooks from './components/pages/basic/hooks.vue'
// import methods from './components/pages/basic/methods.vue'

import home from './components/pages/basic/home'
import tags from './admin/pages/tags'
import category from './admin/pages/category'
import usecom from './vuex/usecom'

const routes = [
    //projects routes....
    {

        path: '/testvue',
        component: usecom
    },
    {

        path: '/',
        component: home
    },
    {
        path: '/tags',
        component: tags
    },
    {
        path: '/category',
        component: category
    },
    //basic routes
    // {

    //     path: '/my-new-vue-route',
    //     component: firstpage
    // },
    // {
    //     path: '/new-route',
    //     component: newroutepage
    // },
    // {
    //     path: '/hooks',
    //     component: hooks
    // },
    // {
    //     path: '/methods',
    //     component: methods
    // },
]

export default new Router({
    mode: 'history',
    routes
})
