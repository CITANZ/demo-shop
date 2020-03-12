<template><span></span></template>
<script>
export default {
    name        :   'BasePageMixin',
    computed    :   {
        site_data()
        {
            return this.$store.state.site_data;
        },
        is_mobile()
        {
            return this.$store.state.is_mobile;
        }
    }
}
</script>
