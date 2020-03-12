// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import axios from 'axios';
// import NProgress from 'nprogress';
import 'promise-polyfill/src/polyfill';
// import _ from 'lodash';
import $ from 'jquery';
import * as VueGoogleMaps from 'vue2-google-maps';
// import * as moment from 'moment';
import VueAnalytics from 'vue-analytics';
import VueMeta from 'vue-meta';

// remove before commit start
import cart from './cart';
Vue.prototype.$cart = cart;
// remove before commit end

require('@/utils/utilities');

Vue.use(VueMeta, {
    // optional pluginOptions
    refreshOnceOnNavigation: true
});

// Vue.use(VueAnalytics, {
//     id: 'UA-xxxxxxx-x',
//     router
// });

// Vue.use(VueGoogleMaps, {
//     load: {
//         key: ''
//     },
// });


Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue({});
axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest'
};
axios.defaults.withCredentials = true;
// global.NProgress = NProgress;
global.$            =   $;
global.axios        =   axios;
global.base_url     =   '/';
global.endpoints    =   require('@/config/endpoints');

new Vue({
    el: '#app',
    store,
    router,
    components: {
        App
    },
    template: '<App/>'
});
