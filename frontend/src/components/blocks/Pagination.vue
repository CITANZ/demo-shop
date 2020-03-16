<template>
<nav v-if="products && products.list.length > 0 && products.pages > 1" class="pagination product-list__pagination" role="navigation" aria-label="pagination">
    <router-link :to="{ path: $route.path, query: make_query(page - 1) }" v-if="page - 1 >= 0" class="pagination-nav pagination-previous">Prev</router-link>
    <a v-else disabled="disabled" class="pagination-nav pagination-previous">Prev</a>
    <router-link v-if="page + 1 < products.pages" class="pagination-nav pagination-next" :to="{ path: $route.path, query: make_query(page + 1) }">Next</router-link>
    <a v-else disabled="disabled" class="pagination-nav pagination-next">Next</a>
    <ul class="pagination-list">
        <li v-for="item in pagination">
            <span v-if="item.index == null" class="pagination-ellipsis">&hellip;</span>
            <router-link v-else :class="['pagination-link', {'is-current': page == item.index}]" :to="{ path: $route.path, query: make_query(item.index) }">{{item.label}}</router-link>
        </li>
    </ul>
</nav>
</template>
<script>
export default {
    name        :   'Pagination',
    data()
    {
        return {
            page    :   this.$route.query.page ? parseInt(this.$route.query.page) : 0,
        }
    },
    computed    :   {
        products()
        {
            if (this.$store.state.site_data && this.$store.state.site_data.result) {
                return this.$store.state.site_data.result;
            }

            return null;
        },
        page_left() {
            return this.products.pages - this.page;
        },
        pagination() {
            let pagination  =   [];
            if (this.products.pages > 5) {
                if (this.page < 4) {
                    for (let i = 0; i < 5; i++) {
                        pagination.push({
                            label   :   i + 1,
                            index   :   i
                        });
                    }
                    pagination.push({
                        index   :   null
                    });
                    pagination.push({
                        label   :   this.products.pages,
                        index   :   this.products.pages - 1
                    });
                } else {
                    pagination.push({
                        label   :   1,
                        index   :   0
                    });

                    pagination.push({
                        index   :   null
                    });

                    if (this.page_left > 2) {
                        for (let i = 2; i > 0; i--) {
                            pagination.push({
                                label   :   this.page - i + 1,
                                index   :   this.page - i
                            });
                        }
                    }

                    if (this.page_left > 3) {
                        for (let i = 0; i < 3; i++) {
                            pagination.push({
                                label   :   this.page + i + 1,
                                index   :   this.page + i
                            });
                        }

                        if (this.page_left > 4) {
                            pagination.push({
                                index   :   null
                            });
                        }

                        pagination.push({
                            label   :   this.products.pages,
                            index   :   this.products.pages - 1
                        });
                    } else {
                        if (this.page_left < 3) {
                            for (let i = 5; i > 3; i--) {
                                pagination.push({
                                    label   :   this.products.pages - i + 1,
                                    index   :   this.products.pages - i
                                });
                            }
                        }
                        for (let i = 3; i > 0; i--) {
                            pagination.push({
                                label   :   this.products.pages - i + 1,
                                index   :   this.products.pages - i
                            });
                        }
                    }
                }
            } else {
                for (let i = 0; i < this.products.pages; i++) {
                    pagination.push({
                        label   :   i + 1,
                        index   :   i
                    });
                }
            }

            return pagination;
        }
    },
    methods     :   {
        make_query(page)
        {
            let query   =   {};

            if (this.$route.query.term) {
                query.term  =   this.$route.query.term;
            }

            if (this.sort) {
                query.sort  =   this.sort;
            } else {
                if (this.$route.query.sort) {
                    query.sort  =   this.$route.query.sort;
                }
            }

            if (this.order) {
                query.order =   this.order;
            } else {
                if (this.$route.query.order) {
                    query.order =   this.$route.query.order;
                }
            }

            if (page) {
                query.page  =   page;
            }

            return query;
        }
    }
}
</script>
