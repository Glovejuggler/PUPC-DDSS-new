<template>
    <Head>
        <title>
            Roles
        </title>
    </Head>

    <div
        class="px-4 py-2 border-b dark:border-b-black/50 sticky top-0 bg-white dark:bg-zinc-900 z-40 duration-300 ease-in-out">
        <Dropdown align="left">
            <template #trigger>
                <button
                    class="text-lg p-1 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-gray-700 dark:text-white dark:hover:bg-white/10">
                    <span>Roles <i class="fa-solid fa-caret-down ml-2"></i></span>
                </button>
            </template>

            <template #content>
                <div class="py-2">
                    <div @click="this.showNewRoleModal = true"
                        class="text-sm px-4 p-1 dark:text-white cursor-pointer hover:bg-black/10 dark:hover:bg-white/20">
                        Add new role
                    </div>
                </div>
            </template>
        </Dropdown>
    </div>

    <!-- Users -->
    <div>
        <table class="w-full dark:text-white text-left select-none">
            <thead class="border-b dark:border-white/30 sticky top-14 bg-white dark:bg-zinc-900 duration-300 ease-in-out">
                <tr>
                    <th class="text-xs font-bold py-3 pl-4">Name</th>
                    <th class="text-xs font-bold py-3"></th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-sm border-b dark:border-white/30 hover:bg-black/10 dark:hover:bg-white/20 cursor-pointer"
                    v-for="role in roles">
                    <td class="py-2 pl-4">{{ role.name }}</td>
                    <td class="py-2">
                        <div class="space-x-2">
                            <template v-if="role.id > 3">
                                <button type="button" @click="edit(role)"
                                    class="px-4 py-1 text-xs border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white active:bg-blue-700 active:border-blue-700">Edit</button>
                                <button type="button" @click="deleteData(role)"
                                    class="px-4 py-1 text-xs border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white active:bg-red-700 active:border-red-700">Delete</button>
                            </template>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- New Role Modal -->
    <div>
        <Transition enter-active-class="duration-200 ease-out" enter-from-class="transform opacity-0 scale-75"
            enter-to-class="opacity-100 scale-100" leave-active-class="duration-200 ease-out"
            leave-from-class="opacity-100 scale-100" leave-to-class="transform opacity-0 scale-75">
            <div v-if="showNewRoleModal" class="inset-0 fixed z-50 h-screen w-screen flex justify-center items-center"
                @click.self="this.showNewRoleModal = false">
                <div
                    class="relative bg-white dark:bg-zinc-900 w-full lg:w-1/6 h-auto max-h-[80%] p-6 rounded-lg dark:text-white overflow-auto">
                    <span class="font-bold text-lg block mb-2">New role</span>
                    <form @submit.prevent="form.post(route('roles.store'), {
                        onSuccess: () => this.showNewRoleModal = errors.length ? true : false,
                        preserveState: true,
                        preserveScroll: true,
                    })">

                        <div class="mt-4">
                            <BreezeLabel for="name" value="Role name" />
                            <BreezeInput id="name" type="text" class="mt-1 block w-full" v-model="form.name" autofocus />
                            <span class="text-red-500 text-sm" v-if="errors.name">{{ errors.name }}</span>
                        </div>

                        <div class="mt-6 flex justify-end space-x-2">
                            <button @click="this.showNewRoleModal = false" type="button"
                                class="hover:underline dark:text-white/80">Cancel</button>
                            <button type="submit" :disabled="form.processing" :class="{ 'opacity-25': form.processing }"
                                class="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-900 text-sm rounded-lg">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>
        <Transition enter-active-class="duration-200 ease opacity-0" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="duration-200 ease opacity-90" leave-from-class="opacity-90"
            leave-to-class="transform opacity-0" appear>
            <div v-if="showNewRoleModal" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"></div>
        </Transition>
    </div>

    <!-- Edit Role Modal -->
    <div>
        <Transition enter-active-class="duration-200 ease-out" enter-from-class="transform opacity-0 scale-75"
            enter-to-class="opacity-100 scale-100" leave-active-class="duration-200 ease-out"
            leave-from-class="opacity-100 scale-100" leave-to-class="transform opacity-0 scale-75">
            <div v-if="showEditRoleModal" class="inset-0 fixed z-50 h-screen w-screen flex justify-center items-center"
                @click.self="this.showEditRoleModal = false">
                <div
                    class="relative bg-white dark:bg-zinc-900 w-full lg:w-1/6 h-auto max-h-[80%] p-6 rounded-lg dark:text-white overflow-auto">
                    <span class="font-bold text-lg block mb-2">New role</span>
                    <form @submit.prevent="editForm.put(route('roles.update', this.editRole.id), {
                        onSuccess: () => this.showEditRoleModal = errors.length ? true : false,
                        preserveState: true,
                        preserveScroll: true,
                    })">

                        <div class="mt-4">
                            <BreezeLabel for="name" value="Role name" />
                            <BreezeInput id="name" type="text" class="mt-1 block w-full" v-model="editForm.name"
                                autofocus />
                        </div>

                        <div class="mt-6 flex justify-end space-x-2">
                            <button @click="this.showEditRoleModal = false" type="button"
                                class="hover:underline dark:text-white/80">Cancel</button>
                            <button type="submit" :disabled="editForm.processing"
                                :class="{ 'opacity-25': editForm.processing }"
                                class="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-900 text-sm rounded-lg">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>
        <Transition enter-active-class="duration-200 ease opacity-0" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="duration-200 ease opacity-90" leave-from-class="opacity-90"
            leave-to-class="transform opacity-0" appear>
            <div v-if="showEditRoleModal" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"></div>
        </Transition>
    </div>

    <!-- Delete Role Modal -->
    <div>
        <Transition enter-active-class="duration-200 ease-out" enter-from-class="transform opacity-0 scale-75"
            enter-to-class="opacity-100 scale-100" leave-active-class="duration-200 ease-out"
            leave-from-class="opacity-100 scale-100" leave-to-class="transform opacity-0 scale-75">
            <div v-if="showDeleteModal"
                class="overflow-auto inset-0 fixed z-50 h-screen w-screen flex justify-center items-center"
                @click.self="this.showDeleteModal = false">
                <div
                    class="relative bg-white dark:bg-zinc-900 w-full lg:w-96 h-auto max-h-[80%] p-6 rounded-lg dark:text-white">
                    <span class="font-bold text-lg block mb-2">Confirmation</span>
                    <div class="break-words">
                        Are you sure you want to delete <span class="font-semibold">{{ deleteRole.name }}</span>?
                    </div>
                    <div class="mt-4 flex justify-end space-x-2">
                        <button @click="this.showDeleteModal = false" type="button"
                            class="hover:underline text-sm px-3">Cancel</button>
                        <button @click.stop="this.$inertia.delete(route('roles.destroy', deleteRole.id), {
                            onSuccess: () => { this.showDeleteModal = false, this.deleteRole = '', this.loading = false },
                            onStart: () => this.loading = true,
                            preserveScroll: true
                        })" :disabled="this.loading" :class="{ 'opacity-25': this.loading }"
                            class="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 active:bg-red-900 text-sm">Delete</button>
                    </div>
                </div>
            </div>
        </Transition>
        <Transition enter-active-class="duration-200 ease opacity-0" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="duration-200 ease opacity-90" leave-from-class="opacity-90"
            leave-to-class="transform opacity-0" appear>
            <div v-if="showDeleteModal" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"></div>
        </Transition>
    </div>
</template>

<script>
import Dropdown from '@/Components/Dropdown.vue';
import BreezeInput from '@/Components/Input.vue';
import BreezeLabel from '@/Components/Label.vue';
import { useForm, Head } from '@inertiajs/inertia-vue3';

export default {
    components: {
        Dropdown,
        BreezeInput,
        BreezeLabel,
        Head
    },
    data() {
        return {
            showNewRoleModal: false,
            showEditRoleModal: false,
            showDeleteModal: false,
            editRole: '',
            deleteRole: '',
            loading: false
        }
    },
    props: {
        users: Object,
        roles: Object,
        errors: Object,
    },
    methods: {
        edit(data) {
            this.showEditRoleModal = true
            this.editRole = data
            this.editForm.name = this.editRole.name
        },
        deleteData(data) {
            this.deleteRole = data
            this.showDeleteModal = true
        }
    },
    setup() {
        const form = useForm({
            name: ''
        })

        const editForm = useForm({
            name: ''
        });

        return { form, editForm }
    }
}
</script>