require('./bootstrap');

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';
import BreezeAuthenticatedLayout from '@/Layouts/Authenticated.vue';
import moment from 'moment/moment';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async name => {
        let page = (await import(`./Pages/${name}.vue`)).default;

        if (page.layout === undefined) {
            page.layout = BreezeAuthenticatedLayout;
        }

        return page;
    },
    setup({ el, app, props, plugin }) {
        return createApp({ render: () => h(app, props) })
            .use(plugin)
            .mixin({
              methods: {
                route,
                formatDate(date, option) {
                  if (date && option === undefined) {
                    return moment(String(date)).format('MMMM D, YYYY');
                  } else if (date && option === 'month') {
                    return moment(String(date)).format('MMMM YYYY');
                  }
                }
              }
            })
            .mount(el);
    },
});

InertiaProgress.init({ color: '#4B5563' });