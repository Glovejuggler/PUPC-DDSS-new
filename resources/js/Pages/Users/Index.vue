<template>
    <Head title="Users" />

    <div class="px-4 py-2 border-b dark:border-b-black/50">
        <Dropdown align="left">
            <template #trigger>
                <button
                    class="text-lg p-1 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-gray-700 dark:text-white dark:hover:bg-white/10">
                    <span>Users <i class="fa-solid fa-caret-down ml-2"></i></span>
                </button>
            </template>

            <template #content>
                <div class="py-2">
                    <div @click="this.showNewUserModal = true"
                        class="text-sm px-4 p-1 dark:text-white cursor-pointer hover:bg-black/10 dark:hover:bg-white/20">
                        Add new user
                    </div>
                </div>
            </template>
        </Dropdown>
    </div>

    <!-- Users -->
    <div>
        <table class="w-full dark:text-white text-left select-none mt-4">
            <thead class="border-b dark:border-white/30 sticky top-16 bg-white dark:bg-zinc-800 duration-300 ease-in-out">
                <tr>
                    <th class="text-xs font-bold pb-3 pl-4">Name</th>
                    <th class="text-xs font-bold pb-3">Role</th>
                </tr>
            </thead>
            <tbody>
                <tr @click="this.$inertia.get(route('users.show', user))"
                    class="text-sm border-b dark:border-white/30 hover:bg-black/10 dark:hover:bg-white/20 cursor-pointer"
                    v-for="user in users">
                    <td class="py-2 pl-4">{{ user.full_name }}</td>
                    <td class="py-2">{{ user.role }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- New User Modal -->
    <div>
        <Transition enter-active-class="duration-200 ease-out" enter-from-class="transform opacity-0 scale-75"
            enter-to-class="opacity-100 scale-100" leave-active-class="duration-200 ease-out"
            leave-from-class="opacity-100 scale-100" leave-to-class="transform opacity-0 scale-75">
            <div v-if="showNewUserModal" class="inset-0 fixed z-50 h-screen w-screen flex justify-center items-center"
                @click.self="this.showNewUserModal = false">
                <div
                    class="relative bg-white dark:bg-zinc-900 w-full lg:w-1/3 h-auto max-h-[80%] p-6 rounded-lg dark:text-white overflow-auto">
                    <span class="font-bold text-lg block mb-2">New user</span>
                    <form @submit.prevent="form.post(route('users.store'), {
                        onSuccess: () => this.showNewUserModal = errors.length ? true : false,
                        preserveState: true,
                        preserveScroll: true,
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
                                <option value="" selected hidden disabled>Select one</option>
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
                                <BreezeInput id="password" type="password" class="mt-1 block w-full" v-model="form.password"
                                    required />
                                <span v-if="errors.password" class="text-xs text-red-500">{{ errors.password }}</span>
                            </div>
                        </div>


                        <div class="mt-6 flex justify-end space-x-2">
                            <button @click="this.showNewUserModal = false" type="button"
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
            <div v-if="showNewUserModal" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"></div>
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
            showNewUserModal: false,
        }
    },
    props: {
        users: Object,
        roles: Object,
        errors: Object,
    },
    methods: {

    },
    setup() {
        const form = useForm({
            first_name: '',
            middle_name: '',
            last_name: '',
            birthday: '',
            address: '',
            contact: '',
            role_id: '',
            email: '',
            password: '',
        })

        return { form }
    }
}
</script>