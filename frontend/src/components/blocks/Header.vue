<template>
<header id="header" v-if="site_data.siteconfig">
    <nav class="navbar is-transparent">
        <div class="navbar-brand">
            <h1 :class="['navbar-item']" v-if="site_data.pagetype == 'HomePage'">
                <router-link id="logo" rel="start" to="/"><img class="is-block" v-if="site_data.siteconfig.logo" :src="site_data.siteconfig.logo.url" :alt="site_data.siteconfig.title" /><template v-else>{{site_data.siteconfig.title}}</template></router-link>
            </h1>
            <router-link :class="['navbar-item']" id="logo" rel="start" v-else to="/"><img class="is-block" v-if="site_data.siteconfig.logo" :src="site_data.siteconfig.logo.url" :alt="site_data.siteconfig.title" /><template v-else>{{site_data.siteconfig.title}}</template></router-link>
            <div v-if="navigation" @click.prevent="show_mobile_menu" :class="['navbar-burger burger', {'is-active': mobile_menu_is_active}]" data-target="mobile-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div v-if="navigation" id="mobile-menu" :class="{'navbar-menu': true, 'is-active': mobile_menu_is_active}">
            <div class="navbar-end">
                <div class="navbar-item" v-for="item in navigation">
                    <router-link :to="item.url">{{item.label}}</router-link>
                </div>
                <div class="navbar-item">
                    <router-link to="/cart">Cart</router-link>
                </div>
            </div>
        </div>
    </nav>
</header>
</template>
<script>
export default {
    name: 'Header',
    data: function() {
        return {
            mobile_menu_is_active   :   false
        }
    },
    computed    :   {
        site_data()
        {
            return this.$store.state.site_data;
        },
        navigation()
        {
            if (this.site_data) {
                return this.site_data.navigation;
            }

            return null
        }
    },
    methods     :   {
        click_to_close: function(e) {
            let target = $(e.target);
            if (!target.is('.burger') &&
                target.parents('.burger').length == 0 &&
                !target.is('.navbar-item') &&
                target.parents('.navbar-item').length == 0) {

                this.mobile_menu_is_active = false;
                $(window).unbind('mousedown', this.click_to_close);
            }
        },
        show_mobile_menu: function(e) {
            e.preventDefault();
            $(window).unbind('mousedown', this.click_to_close).on('mousedown', this.click_to_close);
            this.mobile_menu_is_active = !this.mobile_menu_is_active;
        }
    }
}
</script>
