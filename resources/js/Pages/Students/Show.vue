<template>
    <Head>
        <title>
            {{ student.full_name }}
        </title>
    </Head>

    <div class="px-4 py-6">
        <div class="uppercase font-bold dark:text-white text-xl">
            {{ student.formal_full_name }}
        </div>
        <div class="text-sm font-semibold dark:text-white/80">
            {{ `${student.course} - ${student.year}` }}
        </div>
    </div>

    <div class="mt-7 border-b border-black/20 dark:border-white/10 flex items-center">
        <div class="dark:text-white px-4 py-3 font-bold text-lg">
            Files
        </div>
        <i @click="uploadFile" v-if="reqops.length"
            class="fa-solid fa-plus p-3 rounded-full hover:bg-blue-100 hover:text-blue-700 inline-flex cursor-pointer dark:text-white dark:hover:text-blue-400 dark:hover:bg-blue-400/10"></i>
    </div>

    <div class="my-4 px-4">
        <div v-for="(data, key) in requirements" class="mb-4 flex flex-col">
            <div class="font-bold uppercase dark:text-white">
                {{ key }}
            </div>
            <div v-for="item in data" class="flex justify-between items-center w-64">
                <div>
                    <i class="fa-solid w-6"
                        :class="studentHasFile(item) ? 'fa-check text-green-500' : 'fa-xmark text-red-500'"></i><span
                        class="dark:text-white">{{ item.name }}</span>
                </div>
                <a :href="route('studentfiles.download', studentHasFile(item).id)" v-if="studentHasFile(item)"
                    class="inline-flex justify-center items-center w-8 h-8 hover:bg-black/10 dark:hover:bg-white/20 rounded-full ml-2"><i
                        class="fa-regular fa-circle-down dark:text-white"></i></a>
            </div>
        </div>
    </div>

    <!-- New File -->
    <div>
        <Transition enter-active-class="duration-200 ease-out" enter-from-class="transform opacity-0 scale-75"
            enter-to-class="opacity-100 scale-100" leave-active-class="duration-200 ease-out"
            leave-from-class="opacity-100 scale-100" leave-to-class="transform opacity-0 scale-75">
            <div v-show="showNewFileModal" class="inset-0 fixed z-50 h-screen w-screen flex justify-center items-center"
                @click.self="this.showNewFileModal = false">
                <div
                    class="relative bg-white dark:bg-zinc-900 w-full lg:w-1/4 h-auto max-h-[80%] p-6 rounded-lg dark:text-white overflow-auto">
                    <div class="flex justify-between items-center">
                        <span class="font-bold text-lg block mb-2">Submit file</span>
                        <i @click="this.showNewFileModal = false"
                            class="fa-solid fa-xmark inline-flex w-8 h-8 items-center justify-center cursor-pointer hover:bg-black/10 dark:hover:bg-white/20 hover:text-red-500 rounded-full"></i>
                    </div>
                    <form @submit.prevent="form.post(route('studentfiles.store'), {
                        onSuccess: () => this.showNewFileModal = errors.length ? true : false,
                        preserveScroll: true,
                        preserveState: true
                    })">
                        <input required type="file" name="file" id="fileform" @input="form.file = $event.target.files[0]"
                            class="block w-full text-sm text-slate-500 dark:text-white/70
                                                                                                                                                                                                                                                                file:mr-4 file:py-2 file:px-4 mt-4
                                                                                                                                                                                                                                                                file:rounded-full file:border-0
                                                                                                                                                                                                                                                                file:text-xs file:font-semibold
                                                                                                                                                                                                                                                                file:bg-theme-50 file:text-theme-700 dark:file:text-white/70 dark:file:bg-zinc-600
                                                                                                                                                                                                                                                                hover:file:bg-theme-100/20
                                                                                                                                                                                                                                                                " />
                        <div class="mt-4">
                            <BreezeLabel for="requirement" value="File type" />
                            <select id="requirement" v-model="form.requirement" required
                                class="block rounded-lg dark:bg-zinc-800 text-sm dark:text-white/70 text-gray-700 border-gray-300 dark:border-white/30 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 shadow-sm mt-2 w-full">
                                <option value="" selected hidden disabled>Select one</option>
                                <option v-for="requirement in reqops" :value="requirement.id">{{ requirement.name }}
                                </option>
                            </select>
                        </div>

                        <div class="mt-6 flex justify-end space-x-2">
                            <button @click="this.showNewFileModal = false" type="button"
                                class="hover:underline dark:text-white/80">Cancel</button>
                            <button type="submit"
                                class="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-900 text-sm rounded-lg">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>
        <Transition enter-active-class="duration-200 ease opacity-0" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="duration-200 ease opacity-90" leave-from-class="opacity-90"
            leave-to-class="transform opacity-0" appear>
            <div v-show="showNewFileModal" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"></div>
        </Transition>
    </div>
</template>

<script>
import BreezeLabel from '@/Components/Label.vue';
import { Head, useForm } from '@inertiajs/inertia-vue3';

export default {
    components: {
        Head, BreezeLabel
    },
    data() {
        return {
            showNewFileModal: false,
        }
    },
    props: {
        student: Object,
        requirements: Object,
        errors: Object,
        reqops: Object
    },
    methods: {
        studentHasFile(requirement) {
            return this.student.files.find((file) => file.type === requirement.name)
        },
        uploadFile() {
            this.showNewFileModal = true
            document.getElementById('fileform').click()
        }
    },
    setup(props) {
        const form = useForm({
            requirement: '',
            file: '',
            student_id: props.student.id
        })

        return { form }
    }
}
</script>