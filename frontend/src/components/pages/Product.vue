<template>
<div class="section">
    <div class="container">
        <h1 class="title is-1">{{site_data.title}}</h1>
        <div class="content" v-html="site_data.content"></div>
        <div class="columns is-multiline" v-if="site_data.variants">
            <AddToCart v-for="(product, key) in site_data.variants" :key="key" :product="product" />
        </div>
        <Cart />
    </div>
</div>
</template>

<script>
import BasePageMixin from '../mixins/BasePageMixin';
import AddToCart from '../blocks/AddToCart';
import Cart from '../blocks/Cart';
export default {
    name        :   'Product',
    mixins      :   [ BasePageMixin ],
    components  :   { Cart, AddToCart },
}
</script>
