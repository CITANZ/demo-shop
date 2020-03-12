<template>
<footer id="footer" class="footer">
    <div class="container">
        <div class="has-text-centered copyright">© {{year}} Tech Bringer Ltd.</div>
    </div>
</footer>
</template>

<script>
export default {
    name        :   'Footer',
    computed    :   {
        site_data()
        {
            return this.$store.state.site_data;
        },
        year()
        {
            let d   =   new Date();
            return d.getFullYear();
        }
    }
}
</script>
