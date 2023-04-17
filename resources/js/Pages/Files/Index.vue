<template>
    <Head>
        <title>
            Files
        </title>
    </Head>

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
        </div>
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
                        @dblclick.prevent="this.$inertia.get(route('files', folder.id))"
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
                        class="w-full h-56 overflow-hidden border border-black/30 focus:ring-blue-700 focus:ring-1 dark:border-zinc-900 [&>div:nth-child(2)]:dark:focus:bg-blue-900 [&>div:nth-child(2)]:focus:bg-blue-100 rounded-lg text-sm relative select-none cursor-pointer">
                        <div class="w-full h-48 overflow-hidden">
                            <img @dragstart.prevent="" :src="`${file.img_source}`"
                                class="object-cover h-48 w-full bg-white dark:bg-zinc-900" :alt="file.name">
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
                        @focusout="unselect" @dblclick.prevent="this.$inertia.get(route('files', folder.id))">
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
                            <BreezeInput type="text" class="w-full" v-model="folderform.name" autofocus />
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
                <a :href="route('files.download', this.selectedFile.id)" @mousedown.prevent=""
                    class="dark:text-white flex px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"><i
                        class="fa-solid fa-download w-8"></i>Download</a>
                <div @mousedown.prevent="renameFile"
                    class="dark:text-white px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"><i
                        class="fa-solid fa-file-pen w-8"></i>Rename</div>
                <div @mousedown.prevent="moveFile"
                    class="dark:text-white px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"><i
                        class="fa-solid fa-arrows-up-down-left-right w-8"></i>Move</div>
                <div @mousedown.prevent="shareFile"
                    class="dark:text-white px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"><i
                        class="fa-solid fa-share-from-square w-8"></i>Share</div>
                <div @mousedown.prevent="deleteFile"
                    class="dark:text-white px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"><i
                        class="fa-solid fa-trash w-8"></i>Delete</div>
            </div>
            <div v-if="selectedFolder">
                <div @mousedown.prevent="this.$inertia.get(route('files', selectedFolder.id))"
                    class="dark:text-white px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"><i
                        class="fa-solid fa-folder-open w-8"></i>Open</div>
                <div @mousedown.prevent="renameFolder"
                    class="dark:text-white px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer">
                    <i class="fa-solid fa-file-pen w-8"></i>Rename
                </div>
                <div @mousedown.prevent="moveFolder"
                    class="dark:text-white px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer">
                    <i class="fa-solid fa-arrows-up-down-left-right w-8"></i>Move
                </div>
                <div @mousedown.prevent="shareFolder"
                    class="dark:text-white px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"><i
                        class="fa-solid fa-share-from-square w-8"></i>Share</div>
                <div @mousedown.prevent="deleteFolder"
                    class="dark:text-white px-4 py-2 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer">
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
                    <form @submit.prevent="renameFileForm.put(route('files.rename', this.temp.id), {
                        preserveScroll: true,
                        preserveState: false,
                        onSuccess: () => { this.showRenameFileModal = errors.length ? true : false }
                    })">
                        <div class="mt-4">
                            <BreezeInput type="text" class="w-full text-xs" name="name" v-model="renameFileForm.name"
                                autofocus onfocus="this.setSelectionRange(0, this.value.lastIndexOf('.'))" />
                        </div>
                        <div class="flex justify-end mt-6">
                            <button class="mx-2 text-sm hover:underline" type="button"
                                @click="this.showRenameFileModal = false">Cancel</button>
                            <button :class="{ 'opacity-25': renameFileForm.processing }"
                                :disabled="renameFileForm.processing"
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

    <!-- Rename folder modal -->
    <div>
        <Transition enter-active-class="duration-200 ease-out" enter-from-class="transform opacity-0 scale-75"
            enter-to-class="opacity-100 scale-100" leave-active-class="duration-200 ease-out"
            leave-from-class="opacity-100 scale-100" leave-to-class="transform opacity-0 scale-75">
            <div v-if="showRenameFolderModal"
                class="overflow-auto inset-0 fixed z-50 h-screen w-screen flex justify-center items-center"
                @click.self="this.showRenameFolderModal = false">
                <div
                    class="relative bg-white dark:bg-zinc-900 w-full lg:w-96 h-auto max-h-[80%] p-6 rounded-lg dark:text-white">
                    <span class="font-bold text-lg block mb-2">Rename</span>
                    <form @submit.prevent="renameFolderForm.put(route('folders.rename', this.temp.id), {
                        preserveScroll: true,
                        preserveState: false,
                        onSuccess: () => { this.showRenameFolderModal = errors.length ? true : false }
                    })">
                        <div class="mt-4">
                            <BreezeInput type="text" class="w-full text-xs" name="name" v-model="renameFolderForm.name"
                                autofocus onfocus="this.setSelectionRange(0, this.value.lastIndexOf('.'))" />
                        </div>
                        <div class="flex justify-end mt-6">
                            <button class="mx-2 text-sm hover:underline" type="button"
                                @click="this.showRenameFolderModal = false">Cancel</button>
                            <button :class="{ 'opacity-25': renameFolderForm.processing }"
                                :disabled="renameFolderForm.processing"
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
            <div v-if="showRenameFolderModal" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"></div>
        </Transition>
    </div>

    <!-- Share modal -->
    <div>
        <Transition enter-active-class="duration-200 ease-out" enter-from-class="transform opacity-0 scale-75"
            enter-to-class="opacity-100 scale-100" leave-active-class="duration-200 ease-out"
            leave-from-class="opacity-100 scale-100" leave-to-class="transform opacity-0 scale-75">
            <div v-if="showShareModal"
                class="overflow-auto inset-0 fixed z-50 h-screen w-screen flex justify-center items-center"
                @click.self="this.showShareModal = false; this.shareForm.reset()">
                <div
                    class="relative bg-white dark:bg-zinc-900 w-full lg:w-96 h-auto max-h-[80%] p-6 rounded-lg dark:text-white">
                    <span class="font-bold text-lg block mb-2">Share</span>
                    <form @submit.prevent="shareForm.post(route('share', this.temp.id), {
                        onSuccess: () => this.showShareModal = false,
                        preserveState: false
                    })">
                        <div class="mt-4">
                            <span class="font-bold">Roles</span>
                            <div v-for="role in roles" class="flex items-center">
                                <input :id="`role${role.id}checkbox`" type="checkbox" v-model="shareForm.role"
                                    class="text-xs rounded-full mr-4 focus:ring-0 focus:outline-none" :value="role.id" />
                                <label :for="`role${role.id}checkbox`">{{ role.name }}</label>
                            </div>
                        </div>
                        <div class="mt-4">
                            <span class="font-bold">Users</span>
                            <template v-for="user in users">
                                <div class="flex items-center" v-if="this.temp.user_id !== user.id">
                                    <input :id="`user${user.id}checkbox`" type="checkbox" v-model="shareForm.user"
                                        class="text-xs rounded-full mr-4 focus:ring-0 focus:outline-none"
                                        :value="user.id" />
                                    <label :for="`user${user.id}checkbox`">{{ user.full_name }}</label>
                                </div>
                            </template>
                        </div>
                        <div class="flex justify-end mt-6">
                            <button class="mx-2 text-sm hover:underline" type="button"
                                @click="this.showShareModal = false; this.shareForm.reset()">Cancel</button>
                            <button :class="{ 'opacity-25': shareForm.processing }" :disabled="shareForm.processing"
                                class="mx-2 p-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-900 text-white text-sm rounded-lg disabled:cursor-not-allowed">
                                Share</button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>
        <Transition enter-active-class="duration-200 ease opacity-0" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="duration-200 ease opacity-90" leave-from-class="opacity-90"
            leave-to-class="transform opacity-0" appear>
            <div v-if="showShareModal" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"></div>
        </Transition>
    </div>

    <!-- Move file modal -->
    <div>
        <Transition enter-active-class="duration-200 ease-out" enter-from-class="transform opacity-0 scale-75"
            enter-to-class="opacity-100 scale-100" leave-active-class="duration-200 ease-out"
            leave-from-class="opacity-100 scale-100" leave-to-class="transform opacity-0 scale-75">
            <div v-if="showMoveFileModal"
                class="overflow-auto inset-0 fixed z-50 h-screen w-screen flex justify-center items-center"
                @click.self="this.showMoveFileModal = false; this.moveFolders = ''; this.moveFolderChild = false">
                <div
                    class="relative bg-white dark:bg-zinc-900 w-full lg:w-96 h-auto max-h-[80%] p-6 rounded-lg dark:text-white">
                    <span class="font-bold text-lg block mb-2">Move to</span>
                    <div v-if="this.moveFolderChild" @click="goToFolder(this.moveFolderParent)"
                        class="p-2 hover:bg-black/10 dark:hover:bg-white/20 rounded-lg cursor-pointer">
                        <i class="fa-solid fa-arrow-left"></i>
                    </div>
                    <template v-if="!this.loading" v-for="folder in moveFolders">
                        <div @click="goToFolder(folder.id)"
                            class="p-2 hover:bg-black/10 dark:hover:bg-white/20 rounded-lg cursor-pointer">
                            <i class="fa-solid fa-folder w-8"></i>{{ folder.name }}
                        </div>
                    </template>
                    <div class="mt-4 flex justify-end">
                        <button class="px-4 py-2 text-sm rounded-lg bg-blue-500 text-white" @click="this.moveForm.put(route('files.move', this.temp.id), {
                            preserveState: false,
                            onSuccess: () => this.showMoveFileModal = false
                        })" :class="{ 'opacity-25 cursor-not-allowed': this.temp.folder_id === moveFolderChild }"
                            :disabled="this.temp.folder_id === moveFolderChild">Move here</button>
                    </div>
                </div>
            </div>
        </Transition>
        <Transition enter-active-class="duration-200 ease opacity-0" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="duration-200 ease opacity-90" leave-from-class="opacity-90"
            leave-to-class="transform opacity-0" appear>
            <div v-if="showMoveFileModal" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"></div>
        </Transition>
    </div>

    <!-- Move folder modal -->
    <div>
        <Transition enter-active-class="duration-200 ease-out" enter-from-class="transform opacity-0 scale-75"
            enter-to-class="opacity-100 scale-100" leave-active-class="duration-200 ease-out"
            leave-from-class="opacity-100 scale-100" leave-to-class="transform opacity-0 scale-75">
            <div v-if="showMoveFolderModal"
                class="overflow-auto inset-0 fixed z-50 h-screen w-screen flex justify-center items-center"
                @click.self="this.showMoveFolderModal = false; this.moveFolders = ''; this.moveFolderChild = false">
                <div
                    class="relative bg-white dark:bg-zinc-900 w-full lg:w-96 h-auto max-h-[80%] p-6 rounded-lg dark:text-white">
                    <span class="font-bold text-lg block mb-2">Move to</span>
                    <div v-if="this.moveFolderChild" @click="goToFolder(this.moveFolderParent)"
                        class="p-2 hover:bg-black/10 dark:hover:bg-white/20 rounded-lg cursor-pointer">
                        <i class="fa-solid fa-arrow-left"></i>
                    </div>
                    <template v-if="!this.loading" v-for="folder in moveFolders">
                        <div @click="goToFolder(folder.id)" v-if="folder.id !== this.temp.id"
                            class="p-2 hover:bg-black/10 dark:hover:bg-white/20 rounded-lg cursor-pointer">
                            <i class="fa-solid fa-folder w-8"></i>{{ folder.name }}
                        </div>
                    </template>
                    <div class="mt-4 flex justify-end">
                        <button class="px-4 py-2 text-sm rounded-lg bg-blue-500 text-white" @click="this.moveForm.put(route('folders.move', this.temp.id), {
                            preserveState: false,
                            onSuccess: () => this.showMoveFolderModal = false
                        })"
                            :class="{ 'opacity-25 cursor-not-allowed': this.temp.parent_folder_id === moveFolderChild || this.temp.id === moveFolderChild }"
                            :disabled="this.temp.parent_folder_id === moveFolderChild || this.temp.id === moveFolderChild">Move
                            here</button>
                    </div>
                </div>
            </div>
        </Transition>
        <Transition enter-active-class="duration-200 ease opacity-0" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="duration-200 ease opacity-90" leave-from-class="opacity-90"
            leave-to-class="transform opacity-0" appear>
            <div v-if="showMoveFolderModal" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"></div>
        </Transition>
    </div>

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
                        Are you sure you want to delete <span class="font-semibold">{{ temp.name }}</span>?
                    </div>
                    <div class="mt-4 flex justify-end space-x-2">
                        <button @click="this.showDeleteFileModal = false" type="button"
                            class="hover:underline text-sm px-3">Cancel</button>
                        <button @click.stop="this.$inertia.delete(route('files.destroy', this.temp.id), {
                            onSuccess: () => { this.showDeleteFileModal = false, this.visibleFiles.data.splice(this.tempIndex, 1) }
                        })"
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
                        Are you sure you want to delete <span class="font-semibold">{{ temp.name }}</span>?
                    </div>
                    <div class="mt-4 flex justify-end space-x-2">
                        <button @click="this.showDeleteFolderModal = false" type="button"
                            class="hover:underline text-sm px-3">Cancel</button>
                        <button @click.stop="this.$inertia.delete(route('folders.destroy', this.temp.id), {
                            onSuccess: () => { this.showDeleteFolderModal = false, folders.splice(this.tempIndex, 1) }
                        })"
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
import { Head, useForm, Link } from '@inertiajs/inertia-vue3';
import BreezeInput from '@/Components/Input.vue';
import Dropdown from '@/Components/Dropdown.vue';
import InfiniteScroll from '@/Components/InfiniteScroll.vue';
import axios from 'axios';

export default {
    components: {
        Head, useForm, BreezeInput, Dropdown, InfiniteScroll, Link
    },
    data() {
        return {
            view: localStorage.getItem('view'),
            showAddFolderModal: false,
            selectedFolder: '',
            selectedFile: '',
            visibleFiles: this.files,
            context: false,
            showRenameFileModal: false,
            showRenameFolderModal: false,
            showShareModal: false,
            showDeleteFileModal: false,
            showDeleteFolderModal: false,
            temp: '',
            tempIndex: '',
            moveFolders: '',
            showMoveFileModal: false,
            showMoveFolderModal: false,
            loading: false,
            moveFolderChild: '',
            moveFolderParent: '',
            currentFolder: ''
        }
    },
    props: {
        folder_id: Number,
        files: Object,
        folders: Object,
        ancestors: Object,
        roles: Object,
        users: Object,
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
        renameFile() {
            this.temp = this.selectedFile
            this.renameFileForm.name = this.temp.name
            this.showRenameFileModal = true
        },
        renameFolder() {
            this.temp = this.selectedFolder
            this.renameFolderForm.name = this.temp.name
            this.showRenameFolderModal = true
        },
        shareFile() {
            this.temp = this.selectedFile
            this.showShareModal = true
            this.shareForm.type = 'App\\Models\\File'
            this.context = false
            this.temp.shares.forEach(share => {
                if (share.subject_type === 'App\\Models\\User') {
                    this.shareForm.user.push(share.subject_id)
                } else if (share.subject_type === 'App\\Models\\Role') {
                    this.shareForm.role.push(share.subject_id)
                }
            })
        },
        shareFolder() {
            this.temp = this.selectedFolder
            this.showShareModal = true
            this.shareForm.type = 'App\\Models\\Folder'
            this.context = false
            this.temp.shares.forEach(share => {
                if (share.subject_type === 'App\\Models\\User') {
                    this.shareForm.user.push(share.subject_id)
                } else if (share.subject_type === 'App\\Models\\Role') {
                    this.shareForm.role.push(share.subject_id)
                }
            })
        },
        deleteFile() {
            this.temp = this.selectedFile
            this.showDeleteFileModal = true
            this.context = false
        },
        deleteFolder() {
            this.temp = this.selectedFolder
            this.showDeleteFolderModal = true
            this.context = false
        },
        moveFile() {
            this.temp = this.selectedFile
            this.context = false
            this.moveFolderChild = null
            this.moveForm.to = this.moveFolderChild
            if (!this.moveFolders) {
                this.loading = true
                axios.get('/folders').then(response => {
                    this.moveFolders = response.data.folders
                    this.moveFolderParent = response.data.parent
                }).finally(() => this.loading = false)
            }
            this.showMoveFileModal = true
        },
        moveFolder() {
            this.temp = this.selectedFolder
            this.context = false
            this.moveFolderChild = null
            this.moveForm.to = this.moveFolderChild
            if (!this.moveFolders) {
                this.loading = true
                axios.get('/folders').then(response => {
                    this.moveFolders = response.data.folders
                    this.moveFolderParent = response.data.parent
                }).finally(() => this.loading = false)
            }
            this.showMoveFolderModal = true
        },
        goToFolder(folder) {
            this.loading = true
            this.moveFolderChild = folder
            this.moveForm.to = this.moveFolderChild
            axios.get(route('folders.index', folder)).then(response => {
                this.moveFolders = response.data.folders
                this.moveFolderParent = response.data.parent
            }).finally(() => this.loading = false)
        },
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

        // rename folder
        const renameFolderForm = useForm({
            name: '',
        });

        const shareForm = useForm({
            type: '',
            role: [],
            user: []
        });

        const moveForm = useForm({
            to: ''
        });

        return { folderform, form, submit, renameFileForm, renameFolderForm, shareForm, moveForm }
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