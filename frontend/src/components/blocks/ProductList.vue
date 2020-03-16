<template>
<div class="product-list" v-if="products">
    <div class="content">
        <ul>
            <li v-for="product in products">
                <router-link :to="product.url">{{product.title}}, {{product.price_label}}</router-link>
            </li>
        </ul>
    </div>
    <Pagination />
</div>
</template>

<script>
import Pagination from './Pagination';
export default {
    name        :   'ProductList',
    components  :   { Pagination },
    computed    :   {
        products()
        {
            if (this.$store.state.site_data.result && this.$store.state.site_data.result && this.$store.state.site_data.result.list.length) {
                return this.$store.state.site_data.result.list;
            }

            return null;
        }
    }
}
</script>
