require('./bootstrap');

window.Vue = require('vue')

import Vue from 'vue';
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import moment from 'moment';
import VueFilterDateParse from '@vuejs-community/vue-filter-date-parse';
import common from './common'

Vue.use(ViewUI);
Vue.mixin(common)
Vue.use(VueFilterDateParse);


Vue.component('mainapp', require('./components/mainapp.vue').default)
const app = new Vue({
    el: '#app',
    router,
    store
})

Vue.filter('formatDate', function(value) {
    if (value) {
        return moment().startOf('day').fromNow()
    }
});
