<template>
<footer id="footer" class="footer">
    <div class="container">
        <div class="has-text-centered copyright">Copyright © 2018 - {{year}} <a href="https://www.cita.org.nz" target="_blank">CITANZ</a>, maintained by <a target="_blank" href="https://www.leochen.co.nz">Leo Chen</a>. <a target="_blank" href="https://github.com/CITANZ/demo-shop">Github</a></div>
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
