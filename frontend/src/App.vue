<template>
<div id="app" :class="[class_name, {'is-loading': $store.state.is_loading}]">
    <div v-if="not_supported" class="ie-go-home has-text-centered">
        <p class="subtitle is-4"><router-link :to="{ name: 'Homepage' }"><img width="120" src="@/assets/logo.png" /></router-link></p>
        <h1 class="title is-4">Your browser is not supported</h1>
        <div class="content">
            <p class="subtitle is-5">Please use one of the recommended browsers below:</p>
            <p>
                <a target="_blank" href="https://www.google.com/chrome/">Chrome</a> -
                <a target="_blank" href="https://www.mozilla.org/en-US/firefox/new/">Firefox</a> -
                <a target="_blank" href="https://www.microsoft.com/en-nz/windows/microsoft-edge">Edge</a> -
                <a target="_blank" href="https://support.apple.com/downloads/safari">Safari</a> -
                <a target="_blank" href="https://www.opera.com/download">Opera</a>
            </p>
        </div>
    </div>
    <template v-else>
        <Header v-if="site_data" />
        <router-view v-if="!$store.state.error" />
        <ErrorPage v-else />
        <Footer v-if="site_data" />
    </template>
</div>
</template>

<script>
import Header from './components/blocks/Header';
import Footer from './components/blocks/Footer';
import slugify from 'slugify';
import ErrorPage from './components/pages/ErrorPage';

export default {
    name: 'App',
    metaInfo() {
        return {
            // Children can override the title.
            title: this.pagetitle,
            // Result: My Page Title ← My Site
            // If a child changes the title to "My Other Page Title",
            // it will become: My Other Page Title ← My Site
            titleTemplate: (titleChunk) => {
                return titleChunk ? `${titleChunk}` : document.title;
            },
            // Define meta tags here.
            htmlAttrs: {
                lang: 'en'
            },
            link: this.meta_links,
            meta: this.meta_items
        }
    },
    components: {
        Header,
        Footer,
        ErrorPage
    },
    computed: {
        site_data()
        {
            return this.$store.state.site_data;
        },
        pagetitle()
        {
            if (!this.site_data) return null;

            return this.site_data.title;
        },
        class_name() {
            return slugify(this.$route.name, {lower: true});
        },
        not_supported() {
            if (!window.localStorage) return true;

            let ua      =   window.navigator.userAgent,
                msie    =   ua.indexOf('MSIE '),
                trident =   ua.indexOf('Trident/'); //IE 11

            return msie > 0 || trident > 0;
        },
        meta_links() {
            let links   =   [];
            if (this.site_data && this.site_data.meta && this.site_data.meta.canonical) {
                links.push({rel: 'canonical', href: this.site_data.meta.canonical});
            }
            return links;
        },
        meta_items() {
            let meta    =   [
                {'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1.0'}
            ];
            if (this.site_data && this.site_data.meta) {
                if (this.site_data.meta.description) {
                    meta.push({
                        name    :   'description',
                        content :   this.site_data.meta.description
                    });
                }
                if (this.site_data.meta.keywords) {
                    meta.push({
                        name    :   'keywords',
                        content :   this.site_data.meta.keywords
                    });
                }
                if (this.site_data.meta.robots) {
                    meta.push({
                        name    :   'robots',
                        content :   this.site_data.meta.robots
                    });
                }
                if (this.site_data.meta.social) {
                    this.site_data.meta.social.forEach((o) => {
                        if (o.content) {
                            meta.push(o);
                        }
                    });
                }
            }

            return meta;
        }
    },
    watch: {
        $route(to, from) {
            this.$store.dispatch('get_page_data', this.RefinePath(to.fullPath)).then(this.handle_page_data);
        }
    },
    created() {
        let me  =   this;
        $(window).on('scroll', function(e) {
            me.$store.state.offset  =   $(window).scrollTop();
        }).on('resize', function(e) {
            me.$store.state.width   =   window.innerWidth;
        });
        this.$store.dispatch('get_page_data', this.RefinePath(this.$route.fullPath)).then(this.handle_page_data);
        this.$bus.$on('onCartUpdate', (cart) => {
            this.site_data.session.cart =   cart;
        });

        this.$bus.$on('onRefreshRequest', () => {
            this.$store.dispatch('get_page_data', this.RefinePath(this.$route.fullPath)).then(this.handle_page_data);
        });
    },
    methods :   {
        handle_page_data() {
            this.$nextTick().then(() => {
                $(window).resize().scroll();
            });
        },
        RefinePath(path) {
            let locale = this.$store.state.locale;

            if (locale == 'en_NZ') {
                return base_url + path.ltrim('/');
            }

            return base_url + locale + path.replace('/' + locale, '');
        }
    }
}
</script>
