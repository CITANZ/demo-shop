<template>
<div class="section">
    <div class="container">
        <h1 class="title is-1">{{site_data.title}}</h1>
        <div class="content" v-html="site_data.content"></div>
    </div>
</div>
</template>

<script>
import BasePageMixin from '../mixins/BasePageMixin';
export default {
    name        :   'Page',
    mixins      :   [ BasePageMixin ]
}
</script>
