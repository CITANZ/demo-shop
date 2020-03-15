<template>
<div class="section">
    <div class="container">
        <h1 class="title is-1">{{site_data.title}}</h1>
        <div class="columns">
            <article class="column">
                <div class="columns is-multiline">
                    <div class="column is-6">
                        <h2 class="title is-5">Shipping</h2>
                        <div class="address-detail">
                            <p>{{site_data.shipping.firstname}} {{site_data.shipping.surname}}</p>
                            <p>{{site_data.billing.phone}}</p>
                            <p v-if="site_data.shipping.org">{{site_data.shipping.org}}</p>
                            <p>{{site_data.shipping.apartment ? (site_data.shipping.apartment + ', ') : ''}}{{site_data.shipping.address}}</p>
                            <p>{{site_data.shipping.suburb}}, {{site_data.shipping.town}}, {{site_data.shipping.region}}</p>
                            <p>{{site_data.shipping.country}}, {{site_data.shipping.postcode}}</p>
                        </div>
                    </div>
                    <div class="column is-6">
                        <h2 class="title is-5">Billing</h2>
                        <div class="address-detail">
                            <p>{{site_data.billing.firstname}} {{site_data.billing.surname}}</p>
                            <p>{{site_data.billing.email}}</p>
                            <p>{{site_data.billing.phone}}</p>
                            <p v-if="site_data.billing.org">{{site_data.billing.org}}</p>
                            <p>{{site_data.billing.apartment ? (site_data.billing.apartment + ', ') : ''}}{{site_data.billing.address}}</p>
                            <p>{{site_data.billing.suburb}}, {{site_data.billing.town}}, {{site_data.billing.region}}</p>
                            <p>{{site_data.billing.country}}, {{site_data.billing.postcode}}</p>
                        </div>
                    </div>
                    <div class="column is-12">
                        <h2 class="title is-5">Email</h2>
                        <p>{{site_data.email}}</p>
                    </div>
                </div>
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th class="has-text-centered">Qty</th>
                            <th class="has-text-right" style="width: 25%;">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in site_data.cart.items">
                            <td><template v-if="item.product">{{item.product.title}}</template><em v-else>DELETED PRODUCT</em></td>
                            <td class="has-text-centered">{{item.quantity}}</td>
                            <td class="has-text-right">
                                {{item.subtotal.toDollar()}}
                                <template v-if="site_data.cart.discount && !item.discountable"><br /><em>Non-discountable</em></template>
                                <template v-if="!item.taxable"><br /><em>Non-taxable</em></template>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr v-if="site_data.cart.discount">
                            <td colspan="2">{{site_data.cart.discount.title}}: {{site_data.cart.discount.desc}}</td>
                            <td class="has-text-right">-{{site_data.cart.discount.amount.toDollar()}}</td>
                        </tr>
                        <tr v-if="site_data.cart.gst">
                            <td colspan="2">GST</td>
                            <td class="has-text-right">{{site_data.cart.gst.toDollar()}}</td>
                        </tr>
                        <tr v-if="site_data.freight">
                            <td colspan="2">Shipping: {{site_data.freight.title}}</td>
                            <td class="has-text-right">{{site_data.cart.shipping_cost}}</td>
                        </tr>
                        <tr>
                            <td colspan="2" class="has-text-right">Grand Total:</td>
                            <td class="has-text-right">{{site_data.cart.grand_total.toDollar()}}</td>
                        </tr>
                    </tfoot>
                </table>
                <div class="content" v-if="site_data.cart.comment">
                    <p><strong>Comment</strong><br />
                    {{site_data.cart.comment}}<br /><br /></p>
                </div>
            </article>
            <aside class="column is-4">
                <p class="subtitle is-6">Amount paid</p>
                <p class="title is-2">{{site_data.payment.amount.toDollar()}}</p>
                <dl class="payment-details">
                    <dt><strong>Reference No.</strong></dt>
                    <dd>{{site_data.cart.ref}}</dd>
                    <dt v-if="site_data.payment.card_type"><strong>Card Type</strong></dt>
                    <dd v-if="site_data.payment.card_type">{{site_data.payment.card_type.toUpperCase()}}</dd>
                    <dt v-if="site_data.payment.card_number"><strong>Card No.</strong></dt>
                    <dd v-if="site_data.payment.card_number">{{site_data.payment.card_number}}</dd>
                    <dt v-if="site_data.payment.card_expiry"><strong>Card Expiry</strong></dt>
                    <dd v-if="site_data.payment.card_expiry">{{site_data.payment.card_expiry}}</dd>
                    <dt v-if="site_data.payment.card_holder"><strong>Card Holder</strong></dt>
                    <dd v-if="site_data.payment.card_holder">{{site_data.payment.card_holder}}</dd>
                </dl>
                <hr />
                <p class="help">Paid at {{site_data.payment.created.nzst(true)}}, with <strong>{{site_data.payment.payment_method}}</strong></p>
                <hr />
                <p v-if="show_payagain"><router-link class="button is-info" to="/cart">Try again</router-link></p>
                <p v-else-if="site_data.catalog"><router-link class="button is-info" :to="site_data.catalog">Keep shopping</router-link></p>
            </aside>
        </div>
    </div>
</div>
</template>

<script>
import BasePageMixin from '../mixins/BasePageMixin';
export default {
    name        :   'PaymentResult',
    mixins      :   [ BasePageMixin ],
    computed    :   {
        show_payagain()
        {
            if (this.site_data.payment.status == 'Cancelled' || this.site_data.payment.status == 'Pending' || this.site_data.payment.status == 'Failed') {
                return true;
            }

            return false;
        }
    }
}
</script>
<style lang="scss" scoped>
    .payment-details {
        dt, dd {
                font-size: 14px;
        }

        dd {
            &:not(:last-child) {
                margin-bottom: 0.5em;
            }
        }
    }

    table {
        tr {
            td {
                em {
                    font-size: 12px;
                    font-weight: bold;
                    color: #000;
                }
            }
        }
    }
</style>
