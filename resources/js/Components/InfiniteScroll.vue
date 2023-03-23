<template>
    <div>
        <slot></slot>
    </div>
    <div v-if="loading" class="mt-4 pb-8 text-center">
        <i class="fa-solid fa-spinner animate-spin text-3xl text-gray-800 dark:text-white/50"></i>
    </div>
</template>

<script>
import debounce from 'lodash/debounce';

export default {
    props: {
        loadMore: Function,
    },
    data() {
        return {
            loading: false
        }
    },
    mounted() {
        window.addEventListener('scroll', debounce((e) => {
            let pixelsFromBottom = document.documentElement.offsetHeight - document.documentElement.scrollTop - (window.innerHeight ?? screen.height);
            if (pixelsFromBottom < 200 && !this.loading) {
                this.loading = true;
                this.loadMore().finally(() => this.loading = false);
            }
        }, 100))
    },
}
</script>