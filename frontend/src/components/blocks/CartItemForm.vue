<template>
<form method="post" @submit.prevent="update_qty">
    <fieldset :disabled="is_working">
        <div class="columns">
            <div class="column">
                <p><span v-if="isBundle">[BUNDLED] </span>{{item.product.title}}</p>
                <div class="content" v-if="isBundle">
                    <ul>
                        <li v-for="variant in item.product.variants">{{ variant.title }} x 1 ({{ variant.price.toDollar() }})</li>
                    </ul>
                </div>
            </div>
            <div class="column is-2" v-if="item.product.special_price">{{ item.product.special_price.toDollar() }}</div>
            <div class="column is-2" v-else>{{ item.product.price_label }}</div>
            <div class="column is-2"><input @change="update_qty" type="number" class="input" v-model="item.quantity" /></div>
            <div class="column is-1">{{ item.subtotal.toDollar() }}</div>
            <div class="column is-narrow"><a @click.prevent="delete_item" class="button is-danger">Delete</a></div>
        </div>
    </fieldset>
</form>
</template>

<script>
export default {
    name        :   'CartItemForm',
    props       :   [ 'item' ],
    data()
    {
        return {
            is_working  :   false
        };
    },
    computed: {
        isBundle() {
            if (!this.item) return false;
            return this.item.product.variants && this.item.product.variants.length;
        }
    },
    methods     :   {
        update_qty()
        {
            if (this.is_working) return false;
            this.is_working =   true;
            let data    =   new FormData();
            data.append('id', this.item.id);
            data.append('qty', this.item.quantity);
            this.$cart.dispatch('update_cart_item', data).then((data) => {
                this.is_working =   false;
                this.$store.state.site_data.cart    =   data;
            });
        },
        delete_item()
        {
            if (this.is_working) return false;
            this.is_working =   true;
            let data    =   new FormData();
            data.append('id', this.item.id);
            this.$cart.dispatch('remove_cart_item', data).then((data) => {
                this.is_working =   false;
                this.$store.state.site_data.cart    =   data;
            });
        }
    }
}
</script>
