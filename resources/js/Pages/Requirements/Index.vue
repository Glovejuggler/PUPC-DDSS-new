<template>
    <Head>
        <title>
            Requirements
        </title>
    </Head>

    <div class="px-4 py-2 border-b dark:border-b-black/50">
        <Dropdown align="left">
            <template #trigger>
                <button
                    class="text-lg p-1 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-gray-700 dark:text-white dark:hover:bg-white/10">
                    <span>Requirements <i class="fa-solid fa-caret-down ml-2"></i></span>
                </button>
            </template>

            <template #content>
                <div class="py-2">
                    <div @click="this.showNewRequirementModal = true"
                        class="text-sm px-4 p-1 dark:text-white cursor-pointer hover:bg-black/10 dark:hover:bg-white/20">
                        Add
                    </div>
                </div>
            </template>
        </Dropdown>
    </div>

    <!-- Requirements -->
    <div>
        <table class="w-full dark:text-white text-left select-none mt-4">
            <thead class="border-b dark:border-white/30 sticky top-16 bg-white dark:bg-zinc-800 duration-300 ease-in-out">
                <tr>
                    <th class="text-xs font-bold pb-3 pl-4">Requirement</th>
                    <th class="text-xs font-bold pb-3">Category</th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-sm border-b dark:border-white/30 hover:bg-black/10 dark:hover:bg-white/20 cursor-pointer"
                    v-for="requirement in requirements">
                    <td class="py-2 pl-4">{{ requirement.name }}</td>
                    <td class="py-2">{{ requirement.category }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- New Requirement Modal -->
    <div>
        <Transition enter-active-class="duration-200 ease-out" enter-from-class="transform opacity-0 scale-75"
            enter-to-class="opacity-100 scale-100" leave-active-class="duration-200 ease-out"
            leave-from-class="opacity-100 scale-100" leave-to-class="transform opacity-0 scale-75">
            <div v-if="showNewRequirementModal"
                class="inset-0 fixed z-50 h-screen w-screen flex justify-center items-center"
                @click.self="this.showNewRequirementModal = false">
                <div
                    class="relative bg-white dark:bg-zinc-900 w-full lg:w-1/4 h-auto max-h-[80%] p-6 rounded-lg dark:text-white overflow-auto">
                    <span class="font-bold text-lg block mb-2">New requirement</span>
                    <form @submit.prevent="form.post(route('requirements.store'), {
                        onSuccess: () => this.showNewRequirementModal = errors.length ? true : false,
                        preserveState: true,
                        preserveScroll: true
                    })">
                        <div>
                            <BreezeLabel for="name" value="Requirement" />
                            <BreezeInput id="name" type="text" class="mt-1 block w-full" v-model="form.name" required
                                autofocus />
                            <span v-if="errors.name" class="text-xs text-red-500">{{ errors.name }}</span>
                        </div>

                        <div class="mt-4">
                            <BreezeLabel for="category" value="Category" />
                            <select id="category" v-model="form.category" required
                                class="block rounded-lg dark:bg-zinc-800 text-sm dark:text-white/70 text-gray-700 border-gray-300 dark:border-white/30 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 shadow-sm mt-2 w-full">
                                <option value="" selected hidden disabled>Select one</option>
                                <option value="Personal Information">Personal Information</option>
                                <option value="Entry Requirement">Entry Requirement</option>
                            </select>
                            <span v-if="errors.category" class="text-xs text-red-500">{{ errors.category }}</span>
                        </div>

                        <div class="mt-6 flex justify-end space-x-2">
                            <button @click="this.showNewRequirementModal = false" type="button"
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
            <div v-if="showNewRequirementModal" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"></div>
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
            showNewRequirementModal: false,
        }
    },
    props: {
        requirements: Object,
        errors: Object,
    },
    methods: {

    },
    setup() {
        const form = useForm({
            category: '',
            name: ''
        })

        return { form }
    }
}
</script>