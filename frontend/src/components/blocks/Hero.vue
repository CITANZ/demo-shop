<template>
<section class="hero">
    <div class="container">
        <div :class="['hero-body']" :style="'background-image: url(' + bg + ');'"></div>
    </div>
</section>
</template>

<script>
export default {
    name        :   'Hero',
    computed    :   {
        site_data()
        {
            return this.$store.state.site_data;
        },
        bg()
        {
            if (this.site_data && this.site_data.hero) {
                return this.site_data.hero.url;
            }

            return null;
        }
    }
}
</script>
