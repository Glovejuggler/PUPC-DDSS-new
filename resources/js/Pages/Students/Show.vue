<template>
    <Head>
        <title>
            {{ student.full_name }}
        </title>
    </Head>

    <div class="px-4 py-6">
        <div class="uppercase font-bold dark:text-white text-xl">
            {{ student.formal_full_name }}
            <i @click="this.showEditModal = true"
                class="fa-solid fa-edit ml-2 hover:text-green-600 active:text-green-800 cursor-pointer"></i>
            <i @click="this.showDeleteModal = true"
                class="fa-solid fa-trash ml-2 hover:text-red-600 active:text-red-800 cursor-pointer"></i>
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
            <div v-for="item in data" class="flex justify-between items-center w-1/4">
                <div>
                    <i class="fa-solid w-6"
                        :class="studentHasFile(item) ? 'fa-check text-green-500' : 'fa-xmark text-red-500'"></i><span
                        class="dark:text-white">{{ item.name }}</span>
                </div>
                <div>
                    <a :href="route('studentfiles.download', studentHasFile(item).id)" v-if="studentHasFile(item)"
                        class="inline-flex justify-center items-center w-8 h-8 hover:bg-black/10 dark:hover:bg-white/20 rounded-full ml-2"><i
                            class="fa-regular fa-circle-down dark:text-white"></i></a>
                    <a :href="route('studentfiles.show', studentHasFile(item))" v-if="studentHasFile(item)" target="_blank"
                        class="inline-flex justify-center items-center w-8 h-8 hover:bg-black/10 dark:hover:bg-white/20 rounded-full ml-2"><i
                            class="fa-regular fa-eye dark:text-white"></i></a>
                </div>
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
                    <form @submit.prevent="fileform.post(route('studentfiles.store'), {
                        onSuccess: () => {
                            if (errors.length) {
                                this.showNewFileModal = true
                            } else {
                                this.showNewFileModal = false
                                fileform.reset()
                            }
                        },
                        preserveScroll: true,
                        preserveState: true
                    })">
                        <input required type="file" name="file" id="fileform" accept="application/pdf"
                            @input="fileform.file = $event.target.files[0]"
                            class="file:rounded-full file:text-xs file:bg-gray-800 file:border-0 file:text-white file:px-4 file:py-2 bg-slate-100 dark:text-black mr-2 rounded-full w-full" />
                        <span class="text-sm text-red-500">{{ errors.file }}</span>
                        <div class="mt-4">
                            <BreezeLabel for="requirement" value="File type" />
                            <select id="requirement" v-model="fileform.requirement" required
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

    <!-- Edit Student Modal -->
    <div>
        <Transition enter-active-class="duration-200 ease-out" enter-from-class="transform opacity-0 scale-75"
            enter-to-class="opacity-100 scale-100" leave-active-class="duration-200 ease-out"
            leave-from-class="opacity-100 scale-100" leave-to-class="transform opacity-0 scale-75">
            <div v-if="showEditModal" class="inset-0 fixed z-50 h-screen w-screen flex justify-center items-center"
                @click.self="this.showEditModal = false">
                <div
                    class="relative bg-white dark:bg-zinc-900 w-full lg:w-1/4 h-auto max-h-[80%] p-6 rounded-lg dark:text-white overflow-auto">
                    <span class="font-bold text-lg block mb-2">New student</span>
                    <form @submit.prevent="form.put(route('students.update', student), {
                        onSuccess: () => this.showEditModal = errors.length ? true : false,
                        preserveState: true,
                        preserveScroll: true,
                    })">
                        <div>
                            <BreezeLabel for="first_name" value="First name" />
                            <BreezeInput id="first_name" type="text" class="mt-1 block w-full" v-model="form.first_name"
                                required autofocus />
                        </div>

                        <div class="mt-4">
                            <BreezeLabel for="middle_name" value="Middle name" />
                            <BreezeInput id="middle_name" type="text" class="mt-1 block w-full"
                                v-model="form.middle_name" />
                        </div>

                        <div class="mt-4">
                            <BreezeLabel for="last_name" value="Last name" />
                            <BreezeInput id="last_name" type="text" class="mt-1 block w-full" v-model="form.last_name" />
                        </div>

                        <div class="mt-4 flex space-x-2">
                            <div class="w-full">
                                <BreezeLabel for="year" value="Year" />
                                <select id="year" v-model="form.year" required
                                    class="block rounded-lg dark:bg-zinc-800 text-sm dark:text-white text-gray-700 border-gray-300 dark:border-white/30 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 shadow-sm mt-2 w-full">
                                    <option value="" selected hidden disabled>Select year</option>
                                    <option v-for="year in years" :value="year">{{ year }}</option>
                                </select>
                            </div>

                            <div class="w-full">
                                <BreezeLabel for="course" value="Course" />
                                <select id="course" v-model="form.course" required
                                    class="block rounded-lg dark:bg-zinc-800 text-sm dark:text-white text-gray-700 border-gray-300 dark:border-white/30 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 shadow-sm mt-2 w-full">
                                    <option value="" selected hidden disabled>Select course</option>
                                    <option value="BSIT">BSIT</option>
                                    <option value="BSENT">BSENT</option>
                                    <option value="BTLED">BTLED</option>
                                </select>
                            </div>
                        </div>

                        <div class="mt-6 flex justify-end space-x-2">
                            <button @click="this.showEditModal = false" type="button"
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
            <div v-if="showEditModal" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"></div>
        </Transition>
    </div>

    <!-- Delete Student Modal -->
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
                        Are you sure you want to delete <span class="font-bold">{{ student.full_name }}</span>?
                    </div>
                    <div class="mt-4 flex justify-end space-x-2">
                        <button @click="this.showDeleteModal = false" type="button"
                            class="hover:underline text-sm px-3">Cancel</button>
                        <button :disabled="this.loading" @click.stop="this.$inertia.delete(route('students.destroy', student.id), {
                            onSuccess: () => { this.showDeleteModal = false, this.loading = false },
                            onStart: () => this.loading = true,
                            preserveScroll: true
                        })"
                            class="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 active:bg-red-900 text-sm"
                            :class="{ 'opacity-25': this.loading }">Delete</button>
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
import BreezeLabel from '@/Components/Label.vue';
import BreezeInput from '@/Components/Input.vue';
import { Head, useForm } from '@inertiajs/inertia-vue3';

export default {
    components: {
        Head, BreezeLabel, BreezeInput
    },
    data() {
        return {
            showNewFileModal: false,
            showDeleteModal: false,
            showEditModal: false,
            loading: false,
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
            return this.student.files.find((file) => file.requirement_id === requirement.id)
        },
        uploadFile() {
            this.showNewFileModal = true
            document.getElementById('fileform').click()
        }
    },
    setup(props) {
        const fileform = useForm({
            requirement: '',
            file: '',
            student_id: props.student.id
        })

        const form = useForm({
            first_name: props.student.first_name,
            last_name: props.student.last_name,
            middle_name: props.student.middle_name,
            year: props.student.year,
            course: props.student.course,
        })

        return { form, fileform }
    },
    computed: {
        years() {
            const year = new Date().getFullYear()
            return Array.from({ length: year - 2008 }, (value, index) => 2009 + index)
        }
    },
}
</script>