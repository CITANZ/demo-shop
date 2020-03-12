<template>
<div class="section">
    <div class="container">
        <h1 class="title is-1">{{$store.state.error.title}}</h1>
        <div class="content" v-html="$store.state.error.content"></div>
    </div>
</div>
</template>

<script>
export default {
    name        :   'ErrorPage'
}
</script>
