<template>
    <Head title="Files" />

    <div
        class="px-4 py-2 border-b dark:border-b-black/50 flex justify-between items-center sticky top-0 bg-white dark:bg-zinc-900 z-40 duration-300 ease-in-out">
        <div>
            <Dropdown align="left">
                <template #trigger>
                    <button
                        class="text-lg p-1 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-gray-700 dark:text-white dark:hover:bg-white/10 select-none">
                        <span>{{ ancestors[ancestors.length - 1] ?? 'Files' }} <i
                                class="fa-solid fa-caret-down ml-2"></i></span>
                    </button>
                </template>

                <template #content>
                    <div class="py-2 space-y-2">
                        <div onclick="document.querySelector('#fileupload').click();"
                            class="text-sm dark:text-white px-4 p-1 cursor-pointer hover:bg-black/10 dark:hover:bg-white/20">
                            Upload file
                        </div>
                        <div @click="this.showAddFolderModal = true"
                            class="text-sm dark:text-white px-4 p-1 cursor-pointer hover:bg-black/10 dark:hover:bg-white/20">
                            New folder
                        </div>
                    </div>
                </template>
            </Dropdown>
        </div>
        <div class="flex flex-row-reverse space-x-2">
            <i @click="toggleView()" :class="view === 'grid' ? 'fa-list' : 'fa-grip'" id="viewToggle"
                class="fa-solid dark:text-white dark:hover:bg-white/10 hover:bg-black/10 inline-flex items-center justify-center h-10 w-10 rounded-full cursor-pointer"></i>
            <i v-if="selectedFile" @mousedown.prevent="fileOptions = !fileOptions"
                class="fa-solid fa-ellipsis-vertical dark:text-white dark:hover:bg-white/10 hover:bg-black/10 inline-flex items-center justify-center h-10 w-10 rounded-full cursor-pointer"></i>
            <div v-show="this.fileOptions && this.selectedFile"
                class="w-48 p-4 bg-white dark:bg-zinc-800 shadow-md shadow-black/30 rounded-lg absolute translate-y-12">
            </div>
        </div>
    </div>

    <!-- Grid view -->
    <InfiniteScroll :loadMore="loadMoreFiles">
        <div v-if="view === 'grid'" class="pb-8">
            <section v-if="folders.length">
                <div class="dark:text-white/80 px-4 mt-8 font-bold">
                    Folders
                </div>

                <div class="grid gap-2 grid-cols-6 px-4 mt-8">
                    <div v-for="(folder) in folders" @click.self="$event.target.focus()" tabindex="-1"
                        @contextmenu.prevent="contextMenu" @focusin="folderSelect(folder)" @focusout="unselect"
                        @dblclick.prevent="this.$inertia.get(route('files', folder.id))"
                        class="w-full group cursor-pointer select-none p-4 border border-black/30 dark:border-zinc-900 focus:bg-blue-100 hover:bg-black/10 dark:hover:bg-white/5 dark:focus:bg-blue-900 dark:bg-zinc-900 dark:text-white rounded-lg text-sm text-ellipsis overflow-hidden flex items-center">
                        <i class="fa-solid fa-folder w-8 text-xl mr-2 text-gray-800 dark:text-white"></i>{{ folder.name }}
                    </div>
                </div>
            </section>

            <section v-if="visibleFiles.data.length">
                <div class="dark:text-white/80 px-4 mt-8 font-bold">
                    Files
                </div>
                <!-- Grid -->
                <div class="grid gap-2 grid-cols-6 px-4 mt-8">
                    <div v-for="(file) in visibleFiles.data" @contextmenu.prevent="contextMenu"
                        @click="$event.target.focus()" tabindex="-1" @focusin="fileSelect(file)" @focusout="unselect"
                        :id="`file${file.id}`"
                        class="w-full h-56 overflow-hidden border border-black/30 dark:border-zinc-900 [&>div:nth-child(2)]:dark:focus:bg-blue-900 [&>div:nth-child(2)]:focus:bg-blue-100 rounded-lg text-sm relative select-none cursor-pointer">
                        <div class="w-full h-48 overflow-hidden">
                            <img :src="`../storage/${file.img_source}`"
                                class="object-cover h-48 w-full bg-white dark:bg-zinc-900" alt="">
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
                    <tr tabindex="-1" @contextmenu.prevent=""
                        class="text-sm border-b dark:border-white/30 hover:bg-black/10 dark:hover:bg-white/20 focus:bg-blue-100 dark:focus:bg-blue-900 cursor-pointer"
                        v-for="folder in folders" @click="$event.target.focus()" @focusin="folderSelect(file)"
                        @focusout="unselect" @dblclick.prevent="this.$inertia.get(route('files', folder.id))">
                        <td class="py-2 pl-4"><i class="fa-solid fa-folder w-6"></i>{{ folder.name }}</td>
                        <td class="py-2">{{
                            folder.user.full_name === $page.props.auth.user.full_name ? 'You' :
                            folder.user.full_name
                        }}</td>
                        <td class="py-2">{{ formatDate(folder.created_at) }}</td>
                        <td class="py-2 pr-4">—</td>
                    </tr>
                    <tr tabindex="-1" @contextmenu.prevent=""
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

    <!-- File input -->
    <input type="file" name="file" class="hidden" id="fileupload" @input="form.file = $event.target.files" @change="submit"
        multiple>

    <!-- New folder modal -->
    <div>
        <Transition enter-active-class="duration-200 ease-out" enter-from-class="transform opacity-0 scale-75"
            enter-to-class="opacity-100 scale-100" leave-active-class="duration-200 ease-out"
            leave-from-class="opacity-100 scale-100" leave-to-class="transform opacity-0 scale-75">
            <div v-if="showAddFolderModal"
                class="overflow-auto inset-0 fixed z-50 h-screen w-screen flex justify-center items-center"
                @click.self="this.showAddFolderModal = false">
                <div
                    class="relative bg-white dark:bg-zinc-900 w-full lg:w-96 h-auto max-h-[80%] p-6 rounded-lg dark:text-white">
                    <span class="font-bold text-lg block mb-2">New folder</span>
                    <form @submit.prevent="folderform.post(route('folders.store'), {
                        onSuccess: () => this.showAddFolderModal = errors.length ? true : false,
                        preserveState: true,
                        preserveScroll: true
                    })">
                        <div class="mt-4">
                            <Input type="text" class="w-full" v-model="folderform.name" autofocus />
                            <span v-if="errors.name">{{ errors.name }}</span>
                        </div>
                        <div class="flex justify-end mt-6">
                            <button class="mx-2 text-sm hover:underline" type="button"
                                @click="this.showAddFolderModal = false">Cancel</button>
                            <button :class="{ 'opacity-25': folderform.processing }" :disabled="folderform.processing"
                                class="mx-2 p-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-900 text-white text-sm rounded-lg disabled:cursor-not-allowed">
                                Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>
        <Transition enter-active-class="duration-200 ease opacity-0" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="duration-200 ease opacity-90" leave-from-class="opacity-90"
            leave-to-class="transform opacity-0" appear>
            <div v-if="showAddFolderModal" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"></div>
        </Transition>
    </div>

    <!-- Uploading file -->
    <div v-if="form.progress"
        class="fixed bottom-4 rounded-lg p-4 bg-white shadow-lg border dark:bg-zinc-900 dark:border-transparent w-64 right-4">
        <div class="dark:text-white">Uploading file(s)</div>
        <div class="mt-2 w-full rounded-full bg-zinc-600 h-1">
            <div class="bg-blue-600 h-1 rounded-full" :style="`width: ${form.progress?.percentage}%`"></div>
        </div>
        <div class="flex justify-end mt-2">
            <span class="text-sm dark:text-white cursor-pointer hover:underline" @click="form.cancel">Cancel</span>
        </div>
    </div>

    <!-- Context menu -->
    <transition enter-from-class="scale-y-0" enter-to-class="duration-200 ease-out" leave-from-class="duration-200 ease-out"
        leave-to-class="scale-y-0">
        <div v-show="context" id="context"
            class="bg-white dark:bg-zinc-800 rounded-lg shadow-md shadow-black/30 fixed w-48 z-50 py-2 origin-top">
            <div v-if="selectedFile">
                <div @mousedown.prevent=""
                    class="dark:text-white px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"><i
                        class="fa-solid fa-download w-8"></i>Download</div>
                <div @mousedown.prevent="renameFile(selectedFile)"
                    class="dark:text-white px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"><i
                        class="fa-solid fa-file-pen w-8"></i>Rename</div>
                <div @mousedown.prevent=""
                    class="dark:text-white px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"><i
                        class="fa-solid fa-arrows-up-down-left-right w-8"></i>Move</div>
                <div @mousedown.prevent=""
                    class="dark:text-white px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"><i
                        class="fa-solid fa-trash w-8"></i>Delete</div>
            </div>
            <div v-if="selectedFolder">
                <div @mousedown.prevent="this.$inertia.get(route('files', selectedFolder.id))"
                    class="dark:text-white px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"><i
                        class="fa-solid fa-folder-open w-8"></i>Open</div>
                <div class="dark:text-white px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer">
                    <i class="fa-solid fa-file-pen w-8"></i>Rename
                </div>
                <div class="dark:text-white px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer">
                    <i class="fa-solid fa-arrows-up-down-left-right w-8"></i>Move
                </div>
                <div class="dark:text-white px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer">
                    <i class="fa-solid fa-trash w-8"></i>Delete
                </div>
            </div>
        </div>
    </transition>

    <!-- Rename file modal -->
    <div>
        <Transition enter-active-class="duration-200 ease-out" enter-from-class="transform opacity-0 scale-75"
            enter-to-class="opacity-100 scale-100" leave-active-class="duration-200 ease-out"
            leave-from-class="opacity-100 scale-100" leave-to-class="transform opacity-0 scale-75">
            <div v-if="showRenameFileModal"
                class="overflow-auto inset-0 fixed z-50 h-screen w-screen flex justify-center items-center"
                @click.self="this.showRenameFileModal = false">
                <div
                    class="relative bg-white dark:bg-zinc-900 w-full lg:w-96 h-auto max-h-[80%] p-6 rounded-lg dark:text-white">
                    <span class="font-bold text-lg block mb-2">Rename</span>
                    <form @submit.prevent="renameFileForm.put(route('files.rename', this.temp))">
                        <div class="mt-4">
                            <Input type="text" class="w-full text-xs" :value="this.selectedFile.name"
                                v-model="renameFileForm.name" autofocus
                                onfocus="this.setSelectionRange(0, this.value.lastIndexOf('.'))" />
                            <span v-if="errors.name">{{ errors.name }}</span>
                        </div>
                        <div class="flex justify-end mt-6">
                            <button class="mx-2 text-sm hover:underline" type="button"
                                @click="this.showRenameFileModal = false">Cancel</button>
                            <button :class="{ 'opacity-25': folderform.processing }" :disabled="folderform.processing"
                                class="mx-2 p-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-900 text-white text-sm rounded-lg disabled:cursor-not-allowed">
                                Rename</button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>
        <Transition enter-active-class="duration-200 ease opacity-0" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="duration-200 ease opacity-90" leave-from-class="opacity-90"
            leave-to-class="transform opacity-0" appear>
            <div v-if="showRenameFileModal" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"></div>
        </Transition>
    </div>
</template>

<script>
import { Head, useForm } from '@inertiajs/inertia-vue3';
import Input from '@/Components/Input.vue';
import Dropdown from '@/Components/Dropdown.vue';
import InfiniteScroll from '@/Components/InfiniteScroll.vue';
import axios from 'axios';

export default {
    components: {
        Head, useForm, Input, Dropdown, InfiniteScroll
    },
    data() {
        return {
            view: localStorage.getItem('view'),
            showAddFolderModal: false,
            selectedFolder: '',
            selectedFile: '',
            fileOptions: false,
            visibleFiles: this.files,
            context: false,
            showRenameFileModal: false,
            temp: ''
        }
    },
    props: {
        folder_id: Number,
        files: Object,
        folders: Object,
        ancestors: Object,
        errors: Object
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
            document.querySelector('#context').style.top = `${event.clientY}px`
            document.querySelector('#context').style.left = `${event.clientX}px`
        },
        renameFile() {
            this.temp = this.selectedFile.id
            this.showRenameFileModal = true
        },
        renameFolder() {

        }
    },
    setup(props) {
        const folderform = useForm({
            folder_id: props.folder_id === 0 ? null : props.folder_id,
            name: '',
        })

        const form = useForm({
            folder_id: props.folder_id === 0 ? null : props.folder_id,
            file: []
        })

        function submit() {
            form.post(route('files.upload'), {
                preserveScroll: true,
                preserveState: false,
                onSuccess: () => form.reset('file'),
                onCancel: () => form.reset('file'),
            });
        }

        // rename file
        const renameFileForm = useForm({
            name: '',
        });

        return { folderform, form, submit, renameFileForm }
    },
    mounted() {
        document.body.addEventListener('dragover', function (e) {
            e.preventDefault();
        })

        document.body.addEventListener('drop', function (ev) {
            console.log(ev.dataTransfer);
            ev.preventDefault();

            if (ev.dataTransfer.items) {
                // Use DataTransferItemList interface to access the file(s)
                [...ev.dataTransfer.items].forEach((item, i) => {
                    // If dropped items aren't files, reject them
                    if (item.kind === 'file') {
                        const file = item.getAsFile();
                        console.log(`… file[${i}].name = ${file.name}`);
                    }
                });
            } else {
                // Use DataTransfer interface to access the file(s)
                [...ev.dataTransfer.files].forEach((file, i) => {
                    console.log(`… file[${i}].name = ${file.name}`);
                });
            }
        })
    },
}
</script>