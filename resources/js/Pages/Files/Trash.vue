<template>
    <Head>
        <title>
            Trash
        </title>
    </Head>

    <div
        class="px-4 py-2 border-b dark:border-b-black/50 sticky flex justify-between items-center top-0 bg-white dark:bg-zinc-900 z-40 duration-300 ease-in-out">
        <div class="text-lg p-1 rounded-lg dark:text-white select-none">
            Trash
        </div>
        <i @click="toggleView()" :class="view === 'grid' ? 'fa-list' : 'fa-grip'" id="viewToggle"
            class="fa-solid dark:text-white dark:hover:bg-white/10 hover:bg-black/10 inline-flex items-center justify-center h-10 w-10 rounded-full cursor-pointer"></i>
    </div>

    <InfiniteScroll :loadMore="loadMoreFiles">
        <div v-if="view === 'grid'" class="pb-8">
            <section v-if="folders.length">
                <div class="dark:text-white/80 px-4 mt-8 font-bold">
                    Folders
                </div>

                <div class="grid gap-2 grid-cols-6 px-4 mt-8">
                    <div v-for="(folder) in folders" @click.self="$event.target.focus()" tabindex="-1"
                        @contextmenu.prevent="contextMenu" @focusin="folderSelect(folder)" @focusout="unselect"
                        class="w-full group cursor-pointer select-none p-4 border border-black/30 dark:border-zinc-900 focus:bg-blue-100 focus:ring-blue-700 focus:ring-1 hover:bg-black/10 dark:hover:bg-white/5 dark:focus:bg-blue-900 dark:bg-zinc-900 dark:text-white rounded-lg text-sm text-ellipsis overflow-hidden flex items-center">
                        <i class="fa-solid fa-folder w-8 text-xl mr-2 text-gray-800 dark:text-white"></i>{{ folder.name }}
                    </div>
                </div>
            </section>

            <section v-if="visibleFiles.data.length">
                <div class="dark:text-white/80 px-4 mt-8 font-bold">
                    Files
                </div>
                <!-- Grid -->
                <div class="grid gap-2 lg:grid-cols-6 md:grid-cols-5 grid-cols-3 px-4 mt-8">
                    <div v-for="(file, index) in visibleFiles.data" @contextmenu.prevent="contextMenu" :key="index"
                        @click="$event.target.focus()" tabindex="-1" @focusin="fileSelect(file, index)" @focusout="unselect"
                        :id="`file${file.id}`"
                        class="w-full overflow-hidden border border-black/30 focus:ring-blue-700 focus:ring-1 dark:border-zinc-900 [&>div:nth-child(2)]:dark:focus:bg-blue-900 [&>div:nth-child(2)]:focus:bg-blue-100 rounded-lg text-sm select-none cursor-pointer">
                        <div class="w-full h-48 overflow-hidden flex justify-center bg-white dark:bg-zinc-900">
                            <img @dragstart.prevent="" loading="lazy" :src="`${file.img_source}`"
                                class="object-cover h-48 w-max" :alt="file.name">
                        </div>
                        <div
                            class="bg-white dark:bg-zinc-900 dark:text-white text-sm w-full px-4 py-3 overflow-hidden text-ellipsis whitespace-nowrap">
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
                        v-for="(folder, index) in folders" :key="index" @click="$event.target.focus()"
                        @focusin="folderSelect(folder)" @focusout="unselect">
                        <td class="py-2 pl-4"><i class="fa-solid fa-folder w-6"></i>{{ folder.name }}</td>
                        <td class="py-2">{{
                            folder.user.full_name === $page.props.auth.user.full_name ? 'You' :
                            folder.user.full_name
                        }}</td>
                        <td class="py-2">{{ formatDate(folder.created_at) }}</td>
                        <td class="py-2 pr-4">—</td>
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

    <div v-if="!this.visibleFiles.data.length && !this.folders.length" class="flex justify-center mt-8">
        <div class="flex flex-col items-center">
            <div class="rounded-full bg-gray-800 dark:bg-zinc-900 h-28 w-28 items-center flex justify-center">
                <i class="fas fa-trash text-white text-5xl"></i>
            </div>
            <span class="text-slate-400 dark:text-white/50 mt-4">Deleted files will go here</span>
        </div>
    </div>

    <!-- Context menu -->
    <transition enter-from-class="scale-y-0" enter-to-class="duration-200 ease-out" leave-from-class="duration-200 ease-out"
        leave-to-class="scale-y-0">
        <div v-show="context" id="context"
            class="bg-white dark:bg-zinc-800 rounded-lg shadow-md shadow-black/30 fixed w-48 z-50 py-2 origin-top">
            <div v-if="selectedFile">
                <button @mousedown.prevent="$inertia.visit(route('files.restore', this.selectedFile.id), {
                    preserveScroll: true,
                    onStart: () => this.loading = true,
                    onSuccess: () => this.loading = false
                })" class=" dark:text-white flex items-center justify-start w-full p-2 text-sm hover:bg-black/10 dark:hover:bg-white/10
                cursor-pointer" :disabled="this.loading">
                    <i class="fa-solid fa-clock-rotate-left w-8"></i>Restore
                </button>
                <button @mousedown.prevent="deleteFile"
                    class="dark:text-white flex items-center justify-start w-full p-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"><i
                        class="fa-solid fa-trash-can w-8"></i>Delete forever</button>
            </div>
            <div v-if="selectedFolder">
                <button @mousedown.prevent="$inertia.visit(route('folders.restore', this.selectedFolder.id), {
                    preserveScroll: true,
                    onStart: () => this.loading = true,
                    onSuccess: () => this.loading = false
                })" :disabled="this.loading"
                    class="dark:text-white flex items-center justify-start w-full p-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer">
                    <i class="fa-solid fa-clock-rotate-left w-8"></i>Restore
                </button>
                <button @mousedown.prevent="deleteFolder"
                    class="dark:text-white flex items-center justify-start w-full p-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"><i
                        class="fa-solid fa-trash-can w-8"></i>Delete forever</button>
            </div>
        </div>
    </transition>

    <!-- Delete file modal -->
    <div>
        <Transition enter-active-class="duration-200 ease-out" enter-from-class="transform opacity-0 scale-75"
            enter-to-class="opacity-100 scale-100" leave-active-class="duration-200 ease-out"
            leave-from-class="opacity-100 scale-100" leave-to-class="transform opacity-0 scale-75">
            <div v-if="showDeleteFileModal"
                class="overflow-auto inset-0 fixed z-50 h-screen w-screen flex justify-center items-center"
                @click.self="this.showDeleteFileModal = false">
                <div
                    class="relative bg-white dark:bg-zinc-900 w-full lg:w-96 h-auto max-h-[80%] p-6 rounded-lg dark:text-white">
                    <span class="font-bold text-lg block mb-2">Confirmation</span>
                    <div class="break-words">
                        Are you sure you want to permanently delete <span class="font-semibold">{{ temp.name }}</span>?
                    </div>
                    <div class="text-xs text-red-500 mt-3">This action cannot be undone.</div>
                    <div class="mt-4 flex justify-end space-x-2">
                        <button @click="this.showDeleteFileModal = false" type="button"
                            class="hover:underline text-sm px-3">Cancel</button>
                        <button @click.stop="this.$inertia.visit(route('files.atomize', this.temp.id), {
                            onSuccess: () => { this.showDeleteFileModal = false }
                        })
                            "
                            class="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 active:bg-red-900 text-sm">Delete</button>
                    </div>
                </div>
            </div>
        </Transition>
        <Transition enter-active-class="duration-200 ease opacity-0" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="duration-200 ease opacity-90" leave-from-class="opacity-90"
            leave-to-class="transform opacity-0" appear>
            <div v-if="showDeleteFileModal" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"></div>
        </Transition>
    </div>

    <!-- Delete folder modal -->
    <div>
        <Transition enter-active-class="duration-200 ease-out" enter-from-class="transform opacity-0 scale-75"
            enter-to-class="opacity-100 scale-100" leave-active-class="duration-200 ease-out"
            leave-from-class="opacity-100 scale-100" leave-to-class="transform opacity-0 scale-75">
            <div v-if="showDeleteFolderModal"
                class="overflow-auto inset-0 fixed z-50 h-screen w-screen flex justify-center items-center"
                @click.self="this.showDeleteFolderModal = false">
                <div
                    class="relative bg-white dark:bg-zinc-900 w-full lg:w-96 h-auto max-h-[80%] p-6 rounded-lg dark:text-white">
                    <span class="font-bold text-lg block mb-2">Confirmation</span>
                    <div class="break-words">
                        Are you sure you want to permanently delete <span class="font-semibold">{{ temp.name }}</span>?
                    </div>
                    <div class="text-xs text-red-500 mt-3">This action cannot be undone.</div>
                    <div class="mt-4 flex justify-end space-x-2">
                        <button @click="this.showDeleteFolderModal = false" type="button"
                            class="hover:underline text-sm px-3">Cancel</button>
                        <button @click.stop="this.$inertia.visit(route('folders.atomize', this.temp.id), {
                            onSuccess: () => { this.showDeleteFolderModal = false }
                        })
                            "
                            class="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 active:bg-red-900 text-sm">Delete</button>
                    </div>
                </div>
            </div>
        </Transition>
        <Transition enter-active-class="duration-200 ease opacity-0" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="duration-200 ease opacity-90" leave-from-class="opacity-90"
            leave-to-class="transform opacity-0" appear>
            <div v-if="showDeleteFolderModal" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"></div>
        </Transition>
    </div>
</template>

<script>
import { Head } from '@inertiajs/inertia-vue3';
import Modal from '@/Components/Modal.vue';
import InfiniteScroll from '@/Components/InfiniteScroll.vue';

export default {
    components: {
        Head, Modal, InfiniteScroll
    },
    props: {
        files: Object,
        folders: Object
    },
    data() {
        return {
            view: localStorage.getItem('view'),
            visibleFiles: this.files,
            selectedFolder: '',
            selectedFile: '',
            context: false,
            temp: '',
            showDeleteFileModal: false,
            showDeleteFolderModal: false,
            loading: false
        }
    },
    methods: {
        toggleView() {
            this.view = localStorage.getItem('view') === 'list' ? 'grid' : 'list'
            localStorage.setItem('view', this.view)
        },
        folderSelect(folder) {
            this.selectedFolder = folder
        },
        fileSelect(file) {
            this.selectedFile = file
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
            this.context = true
            if (event.clientX < window.innerWidth - 192) {
                document.querySelector('#context').style.left = `${event.clientX}px`
            } else {
                document.querySelector('#context').style.left = `${event.clientX - 192}px`
            }

            if (event.clientY < window.innerHeight - 82) {
                document.querySelector('#context').style.top = `${event.clientY}px`
            } else {
                document.querySelector('#context').style.top = `${event.clientY - 82}px`
            }
        },
        deleteFile() {
            this.temp = this.selectedFile
            this.context = false
            this.showDeleteFileModal = true
        },
        deleteFolder() {
            this.temp = this.selectedFolder
            this.context = false
            this.showDeleteFolderModal = true
        }
    }
}
</script>