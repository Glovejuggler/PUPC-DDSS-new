<template>
    <Head>
        <title>
            Activity Log
        </title>
    </Head>

    <div class="flex justify-end py-2 px-4 bg-white dark:bg-zinc-900 sticky top-0 duration-300 ease-in-out">
        <label class="relative block">
            <i class='fa-solid fa-search dark:text-white/20 absolute inset-y-0 left-0 flex items-center pl-3'></i>
            <input v-model="form.search"
                class="duration-300 ease-in-out placeholder:italic placeholder:text-slate-400 dark:placeholder:text-gray-500 dark:text-white/80 block bg-white dark:bg-zinc-900 w-96 border-slate-300 dark:border-slate-300/20 rounded-md py-2 pl-9 pr-3 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring focus:ring-opacity-50 sm:text-sm"
                placeholder="Search..." type="text" name="search" />
        </label>
    </div>
    <div class="mx-4 py-5">
        <InfiniteScroll :loadMore="loadMoreActivities">
            <div v-for="activity in visibleActivities.data"
                class="p-2 border rounded-lg mb-3 flex space-x-2 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white">
                <img :src="activity.causer.view_avatar" class="w-10 h-10 rounded-md object-cover bg-white" alt="">
                <div>
                    <template v-if="activity.subject_type === 'App\\Models\\File'">
                        <template v-if="activity.event !== 'renamed' && activity.event !== 'moved'">
                            {{ `${activity.causer.full_name} ${activity.event} ` }}
                            <span class="font-bold"><i class="fa-solid fa-file text-yellow-500"></i>
                                {{ activity.properties.name }}</span>
                        </template>
                        <template v-if="activity.event === 'renamed'">
                            {{ `${activity.causer.full_name} renamed ` }}
                            <i class="fa-solid fa-file text-yellow-500"></i>
                            <span class="font-bold">{{ ' ' + activity.properties.from.name }}</span> to
                            <span class="font-bold">{{ activity.properties.to.name }}</span>
                        </template>
                        <template v-if="activity.event === 'moved'">
                            {{ `${activity.causer.full_name} moved ` }}
                            <span class="font-bold"><i class="fa-solid fa-file text-yellow-500"></i>
                                {{ activity.properties.name }}</span> from
                            <span class="font-bold"><i class="fa-solid fa-folder text-blue-500"></i>
                                {{ activity.properties.from.folder || 'Root folder' }}</span> to
                            <span class="font-bold"><i class="fa-solid fa-folder text-blue-500"></i>
                                {{ activity.properties.to.folder || 'Root folder' }}</span>
                        </template>
                    </template>

                    <template v-if="activity.subject_type === 'App\\Models\\Folder'">
                        <template v-if="activity.event !== 'renamed' && activity.event !== 'moved'">
                            {{ `${activity.causer.full_name} ${activity.event} ` }}
                            <span class="font-bold"><i class="fa-solid fa-folder text-blue-500"></i>
                                {{ activity.properties.name }}</span>
                        </template>
                        <template v-if="activity.event === 'renamed'">
                            {{ `${activity.causer.full_name} renamed ` }}
                            <i class="fa-solid fa-folder text-blue-500"></i>
                            <span class="font-bold">{{ ' ' + activity.properties.from.name }}</span> to
                            <span class="font-bold">{{ activity.properties.to.name }}</span>
                        </template>
                        <template v-if="activity.event === 'moved'">
                            {{ `${activity.causer.full_name} moved ` }}
                            <span class="font-bold"><i class="fa-solid fa-folder text-blue-500"></i>
                                {{ activity.properties.name }}</span> from
                            <span class="font-bold"><i class="fa-solid fa-folder text-blue-500"></i>
                                {{ activity.properties.from.folder || 'Root folder' }}</span> to
                            <span class="font-bold"><i class="fa-solid fa-folder text-blue-500"></i>
                                {{ activity.properties.to.folder || 'Root folder' }}</span>
                        </template>
                    </template>
                    <div class="text-xs text-slate-500">{{ dateFormat(activity.created_at) }}</div>
                </div>
            </div>
        </InfiniteScroll>

        <div class="flex justify-center text-gray-500" v-if="!visibleActivities.data.length">
            No logged activities
        </div>
    </div>
</template>

<script>
import { Head } from '@inertiajs/inertia-vue3';
import InfiniteScroll from '@/Components/InfiniteScroll.vue';
import moment from 'moment';
import axios from 'axios';
import throttle from 'lodash/throttle';
import pickBy from 'lodash/pickBy';

export default {
    components: {
        Head, InfiniteScroll
    },
    data() {
        return {
            visibleActivities: this.activities,
            form: {
                search: this.filters.search,
            }
        }
    },
    props: {
        activities: Object,
        filters: Object
    },
    methods: {
        dateFormat(value) {
            return moment(String(value)).format('MMMM D, YYYY [at] hh:mm:ss A')
        },
        loadMoreActivities() {
            if (!this.visibleActivities.next_page_url) {
                return Promise.resolve();
            }

            return axios.get(this.visibleActivities.next_page_url).then(response => {
                this.visibleActivities = {
                    ...response.data,
                    data: [...this.visibleActivities.data, ...response.data.data]
                }
            });
        }
    },
    watch: {
        form: {
            deep: true,
            handler: throttle(function () {
                this.$inertia.get(route('activity.log'), pickBy(this.form), {
                    preserveScroll: true,
                    preserveState: true,
                    replace: true,
                    onFinish: () => this.visibleActivities = this.activities
                })
            }, 150)
        }
    }
}
</script>