<template>
<div></div>
</template>

<script>
export default {
    name    :   'Cart',
    created()
    {
        this.$cart.dispatch('get_cart');
    }
}
</script>
