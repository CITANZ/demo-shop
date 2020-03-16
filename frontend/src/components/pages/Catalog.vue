<template>
<div class="section">
    <div class="container">
        <h1 class="title is-1">{{site_data.title}}</h1>
        <div class="content" v-html="site_data.content"></div>
        <ProductList />
    </div>
</div>
</template>

<script>
import BasePageMixin from '../mixins/BasePageMixin';
import ProductList from '../blocks/ProductList';
export default {
    name        :   'Catalog',
    mixins      :   [ BasePageMixin ],
    components  :   { ProductList }
}
</script>
