<template>
    <Head>
        <title>
            {{ user.full_name }}
        </title>
    </Head>

    <div class="px-4 py-6 dark:bg-zinc-900 bg-white ease-in-out duration-300">
        <div class="flex space-x-4">
            <img :src="user.view_avatar" alt="" class="w-36 rounded-lg">
            <div>
                <div class="font-bold uppercase dark:text-white text-xl">
                    {{ user.formal_full_name }}
                    <i class="fa-solid fa-pen-to-square ml-2 cursor-pointer hover:text-green-600 active:text-green-800"
                        @click="this.showEditModal = true"></i>
                </div>
                <div class="opacity-70 dark:text-white text-sm">
                    {{ user.email }}
                </div>
                <div class="mt-7 flex flex-col dark:text-white/80">
                    <div>
                        <i
                            class="fa-solid fa-cake-candles text-pink-700 w-5 mr-3 inline-flex justify-center items-center"></i>{{
                                formatDate(user.birthday)
                            }}
                    </div>
                    <div>
                        <i
                            class="fa-solid fa-house text-emerald-800 w-5 mr-3 inline-flex justify-center items-center"></i>{{
                                user.address }}
                    </div>
                    <div>
                        <i class="fa-solid fa-phone text-indigo-800 w-5 mr-3 inline-flex justify-center items-center"></i>{{
                            user.contact }}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Files -->
    <div
        class="dark:text-white/80 px-4 py-2 sticky top-0 bg-white dark:bg-zinc-900 ease-in-out duration-300 font-bold flex justify-between items-center z-40">
        <span>Files</span>
        <i @click="toggleView()" :class="view === 'grid' ? 'fa-list' : 'fa-grip'" id="viewToggle"
            class="fa-solid dark:text-white dark:hover:bg-white/10 hover:bg-black/10 inline-flex items-center justify-center h-10 w-10 rounded-full cursor-pointer"></i>
    </div>
    <InfiniteScroll :loadMore="loadMoreFiles">
        <div v-if="view === 'grid'" class="pb-8">
            <section v-if="visibleFiles.data.length">
                <!-- Grid -->
                <div class="grid gap-2 grid-cols-6 px-4 mt-8">
                    <div v-for="(file) in visibleFiles.data" @contextmenu.prevent="contextMenu"
                        @click="$event.target.focus()" tabindex="-1" @focusin="fileSelect(file)" @focusout="unselect"
                        :id="`file${file.id}`"
                        class="w-full h-56 overflow-hidden border border-black/30 focus:ring-blue-700 focus:ring-1 dark:border-zinc-900 [&>div:nth-child(2)]:dark:focus:bg-blue-900 [&>div:nth-child(2)]:focus:bg-blue-100 rounded-lg text-sm relative select-none cursor-pointer">
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

    <!-- Edit -->
    <div>
        <Transition enter-active-class="duration-200 ease-out" enter-from-class="transform opacity-0 scale-75"
            enter-to-class="opacity-100 scale-100" leave-active-class="duration-200 ease-out"
            leave-from-class="opacity-100 scale-100" leave-to-class="transform opacity-0 scale-75">
            <div v-if="showEditModal" class="inset-0 fixed z-50 h-screen w-screen flex justify-center items-center"
                @click.self="this.showEditModal = false">
                <div
                    class="relative bg-white dark:bg-zinc-900 w-full lg:w-1/3 h-auto max-h-[80%] p-6 rounded-lg dark:text-white overflow-auto">
                    <span class="font-bold text-lg block mb-2">Edit</span>
                    <form @submit.prevent="form.put(route('users.update', user.id), {
                        onSuccess: () => this.showEditModal = errors.length ? true : false,
                        preserveScroll: true,
                        preserveState: true
                    })">
                        <div class="grid grid-flow-col space-x-2">
                            <div>
                                <BreezeLabel for="first_name" value="First name" />
                                <BreezeInput id="first_name" type="text" class="mt-1 block w-full" v-model="form.first_name"
                                    required autofocus />
                                <span v-if="errors.first_name" class="text-xs text-red-500">{{ errors.first_name }}</span>
                            </div>

                            <div>
                                <BreezeLabel for="last_name" value="Last name" />
                                <BreezeInput id="last_name" type="text" class="mt-1 block w-full" v-model="form.last_name"
                                    required />
                                <span v-if="errors.last_name" class="text-xs text-red-500">{{ errors.last_name }}</span>
                            </div>
                        </div>


                        <div class="mt-4">
                            <BreezeLabel for="middle_name" value="Middle name" />
                            <BreezeInput id="middle_name" type="text" class="mt-1 block w-full"
                                v-model="form.middle_name" />
                        </div>

                        <div class="mt-4 grid grid-flow-col space-x-2">
                            <div>
                                <BreezeLabel for="birthday" value="Birthday" />
                                <BreezeInput id="birthday" type="date" class="mt-1 block w-full dark:text-white/70"
                                    v-model="form.birthday" required />
                                <span v-if="errors.birthday" class="text-xs text-red-500">{{ errors.birthday }}</span>
                            </div>

                            <div>
                                <BreezeLabel for="contact" value="Contact number" />
                                <BreezeInput id="contact" type="text" class="mt-1 block w-full" v-model="form.contact"
                                    required />
                                <span v-if="errors.contact" class="text-xs text-red-500">{{ errors.contact }}</span>
                            </div>
                        </div>

                        <div class="mt-4">
                            <BreezeLabel for="Address" value="Address" />
                            <BreezeInput id="Address" type="text" class="mt-1 block w-full" v-model="form.address"
                                required />
                            <span v-if="errors.address" class="text-xs text-red-500">{{ errors.address }}</span>
                        </div>

                        <div class="mt-4">
                            <BreezeLabel for="role" value="Role" />
                            <select id="role" v-model="form.role_id" required
                                class="block rounded-lg dark:bg-zinc-800 text-sm dark:text-white/70 text-gray-700 border-gray-300 dark:border-white/30 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 shadow-sm mt-2 w-full">
                                <option v-for="role in roles" :value="role.id">{{ role.name }}</option>
                            </select>
                            <span v-if="errors.role_id" class="text-xs text-red-500">{{ errors.role_id }}</span>
                        </div>

                        <div class="mt-4 grid grid-flow-col space-x-2">
                            <div>
                                <BreezeLabel for="email" value="Email" />
                                <BreezeInput id="email" type="email" class="mt-1 block w-full" v-model="form.email"
                                    required />
                                <span v-if="errors.email" class="text-xs text-red-500">{{ errors.email }}</span>
                            </div>

                            <div>
                                <BreezeLabel for="password" value="Password" />
                                <BreezeInput id="password" type="password" class="mt-1 block w-full"
                                    v-model="form.password" />
                                <span v-if="errors.password" class="text-xs text-red-500">{{ errors.password }}</span>
                            </div>
                        </div>

                        <div class="mt-6 flex justify-end space-x-2">
                            <button @click="this.showEditModal = false" type="button"
                                class="hover:underline dark:text-white/80">Cancel</button>
                            <button type="submit"
                                class="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-900 text-sm rounded-lg">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>
        <Transition enter-active-class="duration-200 ease opacity-0" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="duration-200 ease opacity-90" leave-from-class="opacity-90"
            leave-to-class="transform opacity-0" appear>
            <div v-if="showEditModal" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"></div>
        </Transition>
    </div>
</template>

<script>
import { Head, useForm } from '@inertiajs/inertia-vue3';
import InfiniteScroll from '@/Components/InfiniteScroll.vue';
import BreezeInput from '@/Components/Input.vue';
import BreezeLabel from '@/Components/Label.vue';

export default {
    components: {
        Head, InfiniteScroll, BreezeInput, BreezeLabel
    },
    props: {
        user: Object,
        files: Object,
        errors: Object,
        roles: Object
    },
    data() {
        return {
            visibleFiles: this.files,
            view: localStorage.getItem('view'),
            showEditModal: false,
        }
    },
    methods: {
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
        toggleView() {
            this.view = localStorage.getItem('view') === 'list' ? 'grid' : 'list'
            localStorage.setItem('view', this.view)
        },
        humanFileSize(size) {
            var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
            return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
        },
    },
    setup(props) {
        const form = useForm({
            first_name: props.user.first_name,
            middle_name: props.user.middle_name,
            last_name: props.user.last_name,
            birthday: props.user.birthday,
            address: props.user.address,
            contact: props.user.contact,
            role_id: props.user.role_id,
            email: props.user.email,
            password: '',
        })

        return { form }
    }
}
</script>