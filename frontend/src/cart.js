import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state       :   {
        error   :   null,
        cart    :   null
    },
    mutations   :   {
        update_cart(state, data)
        {
            state.cart     =   data;
        },
        clear_error(state)
        {
            state.error     =   null;
        },
        set_error(state, data)
        {
            state.error     =   data;
        }
    },
    actions     :   {
        MesasgeRead({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios.post(base_url + `cart/read/${id}`).then((resp) => {
                    commit('update_cart', resp.data);
                    resolve(resp.data);
                }).catch((error) => {
                    commit('set_error', error);
                    reject(error);
                });
            });
        },
        add_to_cart({ commit }, data)
        {
            return new Promise((resolve, reject) => {
                axios.post(base_url + 'cart/add', data).then((resp) => {
                    commit('update_cart', resp.data);
                    resolve();
                }).catch((error) => {
                    commit('set_error', error);
                    reject(error);
                });
            });
        },
        update_cart_item({ commit }, data)
        {
            return new Promise((resolve, reject) => {
                axios.post(base_url + 'cart/update', data).then((resp) => {
                    commit('update_cart', resp.data);
                    resolve(resp.data);
                }).catch((error) => {
                    commit('set_error', error);
                    reject(error);
                });
            });
        },
        remove_cart_item({ commit }, data)
        {
            return new Promise((resolve, reject) => {
                axios.post(base_url + 'cart/delete', data).then((resp) => {
                    commit('update_cart', resp.data);
                    resolve(resp.data);
                }).catch((error) => {
                    commit('set_error', error);
                    reject(error);
                });
            });
        },
        get_cart({ commit }, path)
        {
            return new Promise((resolve, reject) => {
                axios.get(base_url + 'cart?mini=1').then((resp) => {
                    commit('update_cart', resp.data);
                    resolve();
                }).catch((error) => {
                    commit('set_error', error);
                    reject(error);
                });
            });
        },
        estimate_freight({ commit }, data)
        {
            return new Promise((resolve, reject) => {
                axios.post(base_url + 'cart/estimate_freight', data).then((resp) => {
                    resolve(resp.data);
                }).catch((error) => {
                    commit('set_error', error);
                    reject(error);
                });
            });
        },
        ready_to_checkout({ commit }, data)
        {
            return new Promise((resolve, reject) => {
                axios.post(base_url + 'cart/checkout', data).then((resp) => {
                    resolve(resp.data);
                }).catch((error) => {
                    commit('set_error', error);
                    reject(error);
                });
            });
        },
        validate_coupon({ commit }, data)
        {
            return new Promise((resolve, reject) => {
                axios.post(base_url + 'cart/coupon_validate', data).then((resp) => {
                    resolve(resp.data);
                }).catch((error) => {
                    commit('set_error', error);
                    reject(error);
                });
            });
        }
    }
});
