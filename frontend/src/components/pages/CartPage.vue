<template>
<div class="section">
    <div class="container">
        <h1 class="title is-2">{{site_data.title}}</h1>
        <div class="cart-content" v-if="site_data.cart">
            <table class="is-fullwidth table">
                <tr v-for="item in site_data.cart.items">
                    <td><cart-item :item="item" /></td>
                </tr>
                <tr>
                    <td class="has-text-right">
                        <p><strong>Sub total</strong>: {{site_data.cart.amount.toDollar()}}<br />
                        <template v-if="site_data.cart.gst && site_data.cart.gst.toFloat()"><strong>GST</strong>: {{site_data.cart.gst.toDollar()}}<br /></template>
                        <strong>Grand total</strong>: {{site_data.cart.grand_total.toDollar()}}</p>
                        <p v-if="site_data.cart.gst_included && site_data.cart.gst_included.toFloat()" class="help has-text-right"><strong>Included GST</strong>: {{site_data.cart.gst_included.toDollar()}}</p>
                    </td>
                </tr>
            </table>
            <p class="has-text-right">
                <router-link class="button is-info" to="/cart/checkout">Checkout</router-link>
            </p>
        </div>
    </div>
</div>
</template>

<script>
import BasePageMixin from '../mixins/BasePageMixin';
import CartItemForm from '../blocks/CartItemForm';
export default {
    name        :   'CartPage',
    mixins      :   [ BasePageMixin ],
    components  :   { 'cart-item' : CartItemForm }
}
</script>
