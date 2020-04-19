<template>
<div class="section">
    <div class="container">
        <h1 class="title is-2">{{site_data.title}}</h1>
        <form class="checkout-form" method="post" v-if="site_data.checkout" @submit.prevent="submit">
            <fieldset :disabled="is_submitting">
                <div class="field">
                    <label class="label">Email</label>
                    <div class="control">
                        <input class="input" type="email" v-model="site_data.checkout.email" />
                    </div>
                </div>
                <hr />
                <div class="field-group field" v-if="shipping">
                    <h2 class="title is-5">Shipping Address</h2>
                    <div class="field is-horizontal">
                        <div class="field-body">
                            <div class="field">
                                <label class="label">First Name</label>
                                <p class="control"><input v-model="shipping.firstname" required="required" type="text" class="input" /></p>
                            </div>
                            <div class="field">
                                <label class="label">Surname</label>
                                <p class="control"><input v-model="shipping.surname" required="required" type="text" class="input" /></p>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Phone / Mobile</label>
                        <div class="control">
                            <input type="text" required class="input" v-model="shipping.phone" />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Organisation</label>
                        <div class="control">
                            <input type="text" class="input" v-model="shipping.org" />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Apartment, Suite, Flat, etc.</label>
                        <div class="control">
                            <input type="text" v-model="shipping.apartment" class="input">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Address</label>
                        <div class="control">
                            <input type="text" class="input" v-model="shipping.address" />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Suburb</label>
                        <div class="control">
                            <input type="text" class="input" v-model="shipping.suburb" />
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-body">
                            <div class="field">
                                <label class="label">City</label>
                                <p class="control"><input v-model="shipping.town" required="required" type="text" class="input" /></p>
                            </div>
                            <div class="field">
                                <label class="label">Region / State / Province</label>
                                <p class="control"><input v-model="shipping.region" required="required" type="text" class="input" /></p>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-body">
                            <div class="field" style="width: 50%;">
                                <label class="label">Country</label>
                                <div class="select is-fullwidth">
                                    <select v-model="shipping.country" @change="estimate_freight">
                                        <option :value="null">- Choose the country -</option>
                                        <option v-for="(country, code) in site_data.countries" :value="code">{{country}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="field" style="width: 50%;">
                                <label class="label">Postcode / ZIP</label>
                                <p class="control"><input v-model="shipping.postcode" required="required" type="text" class="input" /></p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div class="field-group field" v-if="billing">
                    <h2 class="title is-5">Billing Address</h2>
                    <div class="field">
                        <label class="checkbox"><input type="checkbox" v-model="site_data.checkout.same_addr" /> My billing information is the same as my delivery information.</label>
                    </div>
                    <template v-if="!site_data.checkout.same_addr">
                        <div class="field is-horizontal">
                            <div class="field-body">
                                <div class="field">
                                    <label class="label">First Name</label>
                                    <p class="control"><input v-model="billing.firstname" required="required" type="text" class="input" /></p>
                                </div>
                                <div class="field">
                                    <label class="label">Surname</label>
                                    <p class="control"><input v-model="billing.surname" required="required" type="text" class="input" /></p>
                                </div>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Phone / Mobile</label>
                            <div class="control">
                                <input type="text" required class="input" v-model="billing.phone" />
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Organisation</label>
                            <div class="control">
                                <input type="text" class="input" v-model="billing.org" />
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Apartment, Suite, Flat, etc.</label>
                            <div class="control">
                                <input type="text" v-model="billing.apartment" class="input">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Address</label>
                            <div class="control">
                                <input type="text" class="input" v-model="billing.address" />
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Suburb</label>
                            <div class="control">
                                <input type="text" class="input" v-model="billing.suburb" />
                            </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-body">
                                <div class="field">
                                    <label class="label">City</label>
                                    <p class="control"><input v-model="billing.town" required="required" type="text" class="input" /></p>
                                </div>
                                <div class="field">
                                    <label class="label">Region / State / Province</label>
                                    <p class="control"><input v-model="billing.region" required="required" type="text" class="input" /></p>
                                </div>
                            </div>
                        </div>
                        <div class="field is-horizontal">
                            <div class="field-body">
                                <div class="field" style="width: 50%;">
                                    <label class="label">Country</label>
                                    <div class="select is-fullwidth">
                                        <select v-model="billing.country">
                                            <option :value="null">- Choose the country -</option>
                                            <option v-for="(country, code) in site_data.countries" :value="code">{{country}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="field" style="width: 50%;">
                                    <label class="label">Postcode / ZIP</label>
                                    <p class="control"><input v-model="billing.postcode" required="required" type="text" class="input" /></p>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
                <hr />
                <div class="field">
                    <label class="label">Promotion Code</label>
                    <div v-if="!discount" class="field has-addons">
                        <div class="control" style="width: 100%;">
                            <input @keydown="handle_promo_keydown" :disabled="is_validating" class="input" v-model="promo_code" type="text" />
                        </div>
                        <div class="control"><a @click.prevent="validate_coupon" class="button is-info">Redeem</a></div>
                    </div>
                    <div v-else class="columns">
                        <div class="column is-narrow">
                            <p class="title is-4">{{discount.title}}</p>
                            <p class="subtitle is-6">{{discount.by == '%' ? (discount.rate + '% OFF') : (discount.rate * -1).toDollar()}}</p>
                        </div>
                        <div class="column">
                            <a @click.prevent="site_data.checkout.discount = null;" class="button is-info">Change</a>
                        </div>
                    </div>
                </div>
                <hr />
                <div class="field-group field">
                    <h2 class="title is-5">Freight Options</h2>
                    <div class="columns">
                        <label class="column is-6" v-for="option in site_data.freight_options">
                            <div class="columns">
                                <div class="column is-narrow">
                                    <input type="radio" name="freight-option" @change="estimate_freight" v-model="site_data.checkout.freight" :value="option.id" />
                                </div>
                                <div class="column is-narrow" v-if="option.logo"></div>
                                <div class="column">
                                    <p><strong>{{option.title}}</strong></p>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
                <hr />
                <div class="field">
                    <h2 class="title is-5">Summary</h2>
                    <table class="table is-fullwidth is-bordered">
                        <tbody>
                            <tr>
                                <td class="summary-label">SUBTOTAL:</td>
                                <td class="has-text-right">
                                    {{site_data.checkout.amount.toDollar()}}
                                    <a @click.prevent="subtotal_detailed = !subtotal_detailed">
                                        <span v-if="!subtotal_detailed">[+]</span>
                                        <span v-else>[-]</span>
                                    </a>
                                    <p class="help" v-if="subtotal_detailed">
                                        <em><strong>Discountable &amp; taxable</strong>: {{dis_tax.toDollar()}}</em><br />
                                        <em><strong>Discountable &amp; non-taxable</strong>: {{dis_notax.toDollar()}}</em><br />
                                        <em><strong>Non-discountable &amp; taxable</strong>: {{nondis_tax.toDollar()}}</em><br />
                                        <em><strong>Non-discountable &amp; non-taxable</strong>: {{nondis_notax.toDollar()}}</em><br />
                                        ------<br />
                                        <em><strong>Taxable total</strong>: {{taxable_total.toDollar()}}</em><br />
                                        <em><strong>Non-taxable total</strong>: {{nontaxable_total.toDollar()}}</em>
                                    </p>
                                </td>
                            </tr>
                            <tr v-if="discount">
                                <td class="summary-label">
                                    DISCOUNT:
                                    <p class="help">
                                        <strong v-if="freight_data">{{discount.title}}</strong><br />
                                        {{discount.by == '%' ? (discount.rate + '% OFF') : (discount.rate * -1).toDollar()}}
                                    </p>
                                </td>
                                <td class="has-text-right">
                                    {{discounted_amount.toDollar()}}
                                    <a @click.prevent="discount_detailed = !discount_detailed">
                                        <span v-if="!discount_detailed">[+]</span>
                                        <span v-else>[-]</span>
                                    </a>
                                    <p class="help"><em>based on: {{discountable_total.toDollar()}}</em></p>
                                    <p class="help" v-if="discount_detailed">
                                        <em><strong>Taxable</strong>: {{tax_discounted.toDollar()}}</em><br />
                                        <em><strong>Non-taxable</strong>: {{notax_discounted.toDollar()}}</em>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td class="summary-label">
                                    GST:
                                    <p class="help">Current GST rate: {{site_data.gst_rate * 100}}%</p>
                                </td>
                                <td class="has-text-right">
                                    +{{GST.toDollar()}}
                                    <p class="help"><em>based on: {{gst_base.toDollar()}}</em></p>
                                </td>
                            </tr>
                            <tr>
                                <td class="summary-label">
                                    SHIPPING:
                                    <p v-if="freight_data" class="help">
                                        <strong v-if="freight_data">{{freight_data.title}}</strong><br />
                                        {{freight_data.description}}<br />
                                        {{freight_data.note}}
                                    </p>
                                </td>
                                <td v-if="!no_available_option" class="has-text-right">
                                    <a v-if="!freight_data && !is_estimating" @click.prevent="estimate_freight" class="button is-info is-small">Calculate</a>
                                    <p class="help"><em v-if="is_estimating">calculating...</em></p>
                                    <span v-if="freight_data && !is_estimating">+{{freight_data.cost.toDollar()}}</span>
                                </td>
                                <td v-else class="has-text-right">
                                    <p class="help"><em>Cannot ship to the target country</em></p>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td class="summary-label">GRAND TOTAL:</td>
                                <td class="has-text-right">{{grand_total.toDollar()}}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <hr />
                <div class="field">
                    <h2 class="title is-5">Payment Method</h2>
                    <div class="columns is-multiline">
                        <div class="column is-narrow" v-for="(title, gateway) in site_data.payment_methods">
                            <label class="radio">
                                <input type="radio" name="payment_method" v-model="payment_method" :value="gateway"> {{title}}
                            </label>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <h2 class="title is-5">Comment</h2>
                    <div class="control">
                        <textarea class="textarea" v-model="site_data.checkout.comment"></textarea>
                    </div>
                </div>
                <div class="field actions is-grouped is-grouped-right">
                    <div class="control">
                        <router-link to="/cart" class="button is-text">Cancel</router-link>
                    </div>
                    <div class="control">
                        <button type="submit" :class="['button is-info', {'is-loading': is_submitting}]">Place Order</button>
                    </div>
                </div>
            </fieldset>
        </form>

    </div>
    <div :class="['modal', {'is-active': show_stripe_modal && payment_method == 'Stripe'}]">
        <div class="modal-background"></div>
        <form class="modal-content" method="post">
            <stripe-element
                class="field stripe-console"
                ref="stripe"
                type="card"
                :stripeOptions="{locale:'nz',hidePostalCode: true}"
                :elOptions="{style: { base: { padding: '0.5em', fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif', fontSize: '16px', fontSmoothing: 'antialiased' }, invalid: { iconColor: '#FFC7EE', color: '#FFC7EE', }} }"
                :stripe="site_data.stripe_key"
                @change="cdcompleted = $event.complete"
            />
            <div class="field actions is-grouped is-grouped-right">
                <div class="control">
                    <button type="submit" :class="['button is-info', {'is-loading': is_submitting}]" :disabled="!cdcompleted" @click.prevent="payByCard">Pay {{grand_total.toDollar()}}</button>
                </div>
            </div>
        </form>
        <button class="modal-close is-large" @click.prevent="show_stripe_modal = false;" aria-label="close"></button>
    </div>
</div>
</template>

<script>
import BasePageMixin from '../mixins/BasePageMixin';
import { StripeElement } from "vue-stripe-better-elements";

export default {
    name        :   'CheckoutPage',
    mixins      :   [ BasePageMixin ],
    components  :   { StripeElement },
    data()
    {
        return {
            subtotal_detailed   :   false,
            discount_detailed   :   false,
            promo_code          :   null,
            payment_method      :   null,
            is_submitting       :   false,
            is_estimating       :   false,
            is_validating       :   false,
            no_available_option :   false,
            cdcompleted         :   false,
            client_secret       :   null,
            show_stripe_modal   :   false
        }
    },
    computed    :   {
        freight_data()
        {
            if (this.site_data && this.site_data.checkout) {
                return this.site_data.checkout.freight_data;
            }

            return null;
        },
        discount()
        {
            if (this.site_data && this.site_data.checkout) {
                return this.site_data.checkout.discount;
            }

            return null;
        },
        shipping()
        {
            if (!this.site_data || !this.site_data.checkout) return null;
            return this.site_data.checkout.shipping;
        },
        billing()
        {
            if (!this.site_data || !this.site_data.checkout) return null;
            return this.site_data.checkout.billing;
        },
        dis_tax()
        {
            if (!this.site_data || !this.site_data.checkout) return 0;

            return this.site_data.checkout.amounts.discoutable_taxable;
        },
        dis_notax()
        {
            if (!this.site_data || !this.site_data.checkout) return 0;

            return this.site_data.checkout.amounts.discoutable_nontaxable;
        },
        nondis_tax()
        {
            if (!this.site_data || !this.site_data.checkout) return 0;

            return this.site_data.checkout.amounts.nondiscountable_taxable;
        },
        nondis_notax()
        {
            if (!this.site_data || !this.site_data.checkout) return 0;

            return this.site_data.checkout.amounts.nondiscountable_nontaxable;
        },
        discountable_total()
        {
            return this.dis_tax + this.dis_notax;
        },
        nondiscountable_total()
        {
            return this.nondis_tax + this.nondis_notax;
        },
        tax_discounted()
        {
            if (this.discount) {
                if (this.discount.by == '%') {
                    return this.dis_tax * this.discount.rate * -0.01;
                }

                return -1 * this.discount.rate;
            }

            return 0;
        },
        notax_discounted()
        {
            if (this.discount) {
                if (this.discount.by == '%') {
                    return this.dis_notax * this.discount.rate * -0.01;
                }

                return this.tax_discounted ? -1 * this.discount.rate : 0;
            }

            return 0;
        },
        discounted_amount()
        {
            let amount  =   Math.abs(this.tax_discounted) + Math.abs(this.notax_discounted);

            return amount > 0 ? (amount * -1) : 0;
        },
        shipping_cost()
        {
            if (this.freight_data) {
                return this.freight_data.cost;
            }

            return 0;
        },
        taxable_total()
        {
            return this.dis_tax + this.nondis_tax;
        },
        nontaxable_total()
        {
            return this.dis_notax + this.nondis_notax;
        },
        gst_base()
        {
            return this.taxable_total + this.tax_discounted;
        },
        GST()
        {
            return this.gst_base * this.site_data.gst_rate;
        },
        grand_total()
        {
            if (!this.site_data || !this.site_data.checkout) return 0;

            return this.site_data.checkout.amount + this.discounted_amount + this.shipping_cost + this.GST;
        }
    },
    methods     :   {
        validate_coupon()
        {
            if (!this.promo_code || !this.promo_code.trim().length) return false;

            if (this.promo_code == '↑↑↓←→←→BABA') {
                alert('Surely you\'ve got better things to do :/');
                return false;
            }

            if (this.is_submitting || this.is_validating) return false;
            this.is_validating      =   true;
            let data                =   new FormData();

            data.append('coupon', this.promo_code);
            this.$cart.dispatch('validate_coupon', data).then((resp) => {
                this.promo_code     =   null;
                this.is_validating  =   false;
                this.site_data.checkout.discount    =   resp;
            }).catch((error) => {
                this.is_validating  =   false;
                alert('code is not valid');
            });
        },
        estimate_freight(callback)
        {
            if (!this.shipping.country) return false;
            if (this.is_estimating) return false;

            this.is_estimating          =   true;
            this.no_available_option    =   false;

            let data    =   new FormData();
            data.append('payload', JSON.stringify(this.site_data.checkout));
            this.$cart.dispatch('estimate_freight', data).then((resp) => {
                this.site_data.checkout.freight_data    =   resp;
                this.is_estimating                      =   false;
                this.no_available_option                =   !resp;
                if (callback && typeof(callback) === 'function') {
                    callback();
                }
            });
        },
        submit()
        {
            if (!this.freight_data && !this.no_available_option) {
                this.estimate_freight(this.submit);
                return false;
            }

            if (!this.payment_method) {
                alert('Please choose a payment method');
                return false;
            }

            if (this.payment_method == 'Stripe' && !this.site_data.checkout.stripe_token) {
                this.show_stripe_modal = true;
                return false;
            }

            if (this.no_available_option) {
                alert('Please choose a different freight option for the current one doesn\'t handle the shipping country!');
                return false;
            }

            if (!this.freight_data) {
                alert('Please select a freight option and calculate the shipping cost!');
                return false;
            }

            if (this.is_submitting || this.is_estimating) return false;
            this.is_submitting  =   true;

            let data    =   new FormData();
            data.append('data', JSON.stringify(this.site_data.checkout));

            if (this.payment_method) {
                data.append('method', this.payment_method);
            }

            this.$cart.dispatch('ready_to_checkout', data).then((resp) => {
                this.is_submitting  =   false;
                if (resp.url) {
                    window.location.href    =   resp.url;
                } else if (resp.client_secret) {
                    this.client_secret      =   resp.client_secret;
                    this.show_stripe_modal  =   true;
                }
            }).catch((error) => {
                this.is_submitting  =   false;
                if (error.response && error.response.data) {
                    alert(error.response.data);
                }
            });
        },
        handle_promo_keydown(e)
        {
            if (e.keyCode == 13) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();

                this.validate_coupon();
                return false;
            }
        },
        payByCard() {
            if (this.is_submitting) return false;
            this.is_submitting  =   true;

            this.$refs.stripe.elements
                .createToken()
                .then(resp => {
                    this.site_data.checkout.stripe_token = resp.token.id;
                    this.show_stripe_modal = false;
                    this.is_submitting = false;
                    this.submit();
                }).catch(console.error);

        },
        check_stripe_payment_cleared(callback, retry)
        {
            setTimeout(() => {
                axios.get(base_url + 'cart/complete?mini=1&order_id=' + this.site_data.id).then((resp) => {
                    if (!resp.data) {
                        this.check_stripe_payment_cleared(callback, retry + 500);
                    } else {
                        callback();
                    }
                });
            }, retry);
        }
    }
}
</script>
<style lang="scss" scoped>
.modal {
    &-content {
        width: 96%;
        max-width: 480px;
        background-color: white;
        box-shadow: 0 5px 10px (black, 0.8);
        padding: 2rem;
        border-radius: 8px;
        .stripe-console {

        }
    }
}
</style>
