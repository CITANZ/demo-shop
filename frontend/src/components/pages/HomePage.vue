<template>
<div class="section">
    <div class="container">
        <div class="content" v-html="site_data.content"></div>
    </div>
</div>
</template>

<script>
import BasePageMixin from '../mixins/BasePageMixin';
export default {
    name        :   'HomePage',
    mixins      :   [ BasePageMixin ]
}
</script>
