<template>
<form method="post" @submit.prevent="update_qty">
    <fieldset :disabled="is_working">
        <div class="columns">
            <div class="column">{{item.product.title}} {{item.product.variant_title ? ('- ' + item.product.variant_title) : ''}}</div>
            <div class="column is-2"><input @change="update_qty" type="number" class="input" v-model="item.quantity" /></div>
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
