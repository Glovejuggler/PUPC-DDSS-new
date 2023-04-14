<template>
    <Head>
        <title>
            Shared Files
        </title>
    </Head>

    <div
        class="px-4 py-2 border-b dark:border-b-black/50 sticky flex justify-between items-center top-0 bg-white dark:bg-zinc-900 z-40 duration-300 ease-in-out">
        <div class="text-lg p-1 rounded-lg dark:text-white select-none">
            Shared Files
        </div>
        <i @click="toggleView()" :class="view === 'grid' ? 'fa-list' : 'fa-grip'" id="viewToggle"
            class="fa-solid dark:text-white dark:hover:bg-white/10 hover:bg-black/10 inline-flex items-center justify-center h-10 w-10 rounded-full cursor-pointer"></i>
    </div>

    <!-- Files -->
    <InfiniteScroll :loadMore="loadMoreFiles">
        <div v-if="view === 'grid'" class="pb-8">
            <section v-if="folders.length">
                <div class="dark:text-white/80 px-4 mt-8 font-bold">
                    Folders
                </div>

                <div class="grid gap-2 grid-cols-6 px-4 mt-8">
                    <div v-for="(folder) in folders" @click.self="$event.target.focus()" tabindex="-1"
                        @contextmenu.prevent="contextMenu" @focusin="folderSelect(folder)" @focusout="unselect"
                        @dblclick.prevent="this.$inertia.get(route('share.index', folder.id))"
                        class="w-full group cursor-pointer select-none p-4 border border-black/30 dark:border-zinc-900 focus:bg-blue-100 focus:ring-blue-700 focus:ring-1 hover:bg-black/10 dark:hover:bg-white/5 dark:focus:bg-blue-900 dark:bg-zinc-900 dark:text-white rounded-lg text-sm text-ellipsis overflow-hidden flex items-center">
                        <i class="fa-solid fa-folder w-8 text-xl mr-2 text-gray-800 dark:text-white"></i>{{ folder.name }}
                    </div>
                </div>
            </section>

            <section v-if="visibleFiles.data.length">
                <div class="dark:text-white/80 px-4 mt-8 font-bold">
                    Files
                </div>
                <div class="grid gap-2 grid-cols-6 px-4 mt-8">
                    <div v-for="(file, index) in visibleFiles.data" @contextmenu.prevent="contextMenu" :key="index"
                        @click="$event.target.focus()" tabindex="-1" @focusin="fileSelect(file, index)" @focusout="unselect"
                        :id="`file${file.id}`"
                        class="w-full h-56 overflow-hidden border border-black/30 focus:ring-blue-700 focus:ring-1 dark:border-zinc-900 [&>div:nth-child(2)]:dark:focus:bg-blue-900 [&>div:nth-child(2)]:focus:bg-blue-100 rounded-lg text-sm relative select-none cursor-pointer">
                        <div class="w-full h-48 overflow-hidden">
                            <img :src="`${file.img_source}`" class="object-cover h-48 w-full bg-white dark:bg-zinc-900"
                                alt="">
                        </div>
                        <div
                            class="absolute bottom-0 bg-white dark:bg-zinc-900 dark:text-white text-sm w-full px-4 py-3 overflow-hidden text-ellipsis whitespace-nowrap">
                            {{ file.name }}
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <div class="pb-8" v-if="view === 'list'">
            <table class="w-full dark:text-white text-left select-none">
                <thead
                    class="border-b dark:border-white/30 sticky top-14 bg-white dark:bg-zinc-800 duration-300 ease-in-out">
                    <tr>
                        <th class="text-xs font-bold py-3 pl-4">Name</th>
                        <th class="text-xs font-bold py-3">Uploaded by</th>
                        <th class="text-xs font-bold py-3">Date uploaded</th>
                        <th class="text-xs font-bold py-3 pr-4">Size</th>
                    </tr>
                </thead>
                <tbody>
                    <tr tabindex="-1" @contextmenu.prevent="contextMenu"
                        class="text-sm border-b dark:border-white/30 hover:bg-black/10 dark:hover:bg-white/20 focus:bg-blue-100 dark:focus:bg-blue-900 cursor-pointer"
                        v-for="folder in folders" @click="$event.target.focus()" @focusin="folderSelect(folder)"
                        @focusout="unselect" @dblclick.prevent="this.$inertia.get(route('share.index', folder.id))">
                        <td class="py-2 pl-4"><i class="fa-solid fa-folder w-6"></i>{{ folder.name }}</td>
                        <td class="py-2">{{
                            folder.user.full_name === $page.props.auth.user.full_name ? 'You' :
                            folder.user.full_name
                        }}</td>
                        <td class="py-2">{{ formatDate(folder.created_at) }}</td>
                        <td class="py-2 pr-4">{{ humanFileSize(folder.size) }}</td>
                    </tr>
                    <tr tabindex="-1" @contextmenu.prevent="contextMenu"
                        class="text-sm border-b dark:border-white/30 hover:bg-black/10 dark:hover:bg-white/20 focus:bg-blue-100 dark:focus:bg-blue-900 cursor-pointer"
                        v-for="file in visibleFiles.data" @click="$event.target.focus()" @focusin="fileSelect(file)"
                        @focusout="unselect">
                        <td class="py-2 pl-4">{{ file.name }}</td>
                        <td class="py-2">{{
                            file.user.full_name === $page.props.auth.user.full_name ? 'You' :
                            file.user.full_name
                        }}</td>
                        <td class="py-2">{{ formatDate(file.created_at) }}</td>
                        <td class="py-2 pr-4">{{ humanFileSize(file.size) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </InfiniteScroll>

    <!-- Empty folder -->
    <div v-if="!folders.length && !visibleFiles.data.length" class="text-center dark:text-white/50 mt-8">
        Empty folder
    </div>

    <!-- Context menu -->
    <transition enter-from-class="scale-y-0" enter-to-class="duration-200 ease-out" leave-from-class="duration-200 ease-out"
        leave-to-class="scale-y-0">
        <div v-show="context" id="context"
            class="bg-white dark:bg-zinc-800 rounded-lg shadow-md shadow-black/30 fixed w-48 z-50 py-2 origin-top">
            <div v-if="selectedFile">
                <a :href="route('files.download', this.selectedFile.id)" @mousedown.prevent=""
                    class="dark:text-white flex px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"><i
                        class="fa-solid fa-download w-8"></i>Download</a>

            </div>
            <div v-if="selectedFolder">
                <div @mousedown.prevent="this.$inertia.get(route('share.index', selectedFolder.id))"
                    class="dark:text-white px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"><i
                        class="fa-solid fa-folder-open w-8"></i>Open</div>
            </div>
        </div>
    </transition>
</template>

<script>
import { Head, Link } from '@inertiajs/inertia-vue3';
import BreezeInput from '@/Components/Input.vue';
import Dropdown from '@/Components/Dropdown.vue';
import InfiniteScroll from '@/Components/InfiniteScroll.vue';
import axios from 'axios';

export default {
    components: {
        Head, BreezeInput, Dropdown, InfiniteScroll, Link
    },
    data() {
        return {
            view: localStorage.getItem('view'),
            selectedFolder: '',
            selectedFile: '',
            visibleFiles: this.files,
            context: false,
            temp: '',
            tempIndex: '',
        }
    },
    props: {
        files: Object,
        folders: Object,
        errors: Object,
    },
    methods: {
        toggleView() {
            this.view = localStorage.getItem('view') === 'list' ? 'grid' : 'list'
            localStorage.setItem('view', this.view)
        },
        folderSelect(folder) {
            this.selectedFolder = folder
        },
        fileSelect(file, index) {
            this.selectedFile = file
            this.tempIndex = index
        },
        unselect() {
            this.selectedFolder = null
            this.selectedFile = null
            this.fileOptions = false
            this.context = false
        },
        humanFileSize(size) {
            var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
            return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
        },
        loadMoreFiles() {
            if (!this.visibleFiles.next_page_url) {
                return Promise.resolve();
            }

            return axios.get(this.visibleFiles.next_page_url).then(response => {
                this.visibleFiles = {
                    ...response.data,
                    data: [...this.visibleFiles.data, ...response.data.data]
                }
            });
        },
        contextMenu(event) {
            if (event.clientX < window.innerWidth - 192) {
                document.querySelector('#context').style.left = `${event.clientX}px`
            } else {
                document.querySelector('#context').style.left = `${event.clientX - 192}px`
            }

            if (event.clientY < window.innerHeight - 190) {
                document.querySelector('#context').style.top = `${event.clientY}px`
            } else {
                document.querySelector('#context').style.top = `${event.clientY - 190}px`
            }
            this.context = true
        },
    },
}
</script>