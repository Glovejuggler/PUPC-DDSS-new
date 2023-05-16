<template>
    <Head>
        <title>
            Students
        </title>
    </Head>

    <div
        class="px-4 py-2 border-b dark:border-b-black/50 flex justify-between items-center sticky top-0 bg-white dark:bg-zinc-900 z-40 duration-300 ease-in-out">
        <Dropdown align="left">
            <template #trigger>
                <button
                    class="text-lg p-1 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-gray-700 dark:text-white dark:hover:bg-white/10">
                    <span>Students <i class="fa-solid fa-caret-down ml-2"></i></span>
                </button>
            </template>

            <template #content>
                <div class="py-2">
                    <div @click="this.showNewStudentModal = true"
                        class="text-sm px-4 p-1 dark:text-white cursor-pointer hover:bg-black/10 dark:hover:bg-white/20">
                        Add new student
                    </div>

                    <div @click="this.$inertia.get(route('requirements.index'))"
                        class="text-sm px-4 p-1 dark:text-white cursor-pointer hover:bg-black/10 dark:hover:bg-white/20">
                        Requirements
                    </div>
                </div>
            </template>
        </Dropdown>

        <div>
            <label class="relative block">
                <i class='fa-solid fa-search dark:text-white/20 absolute inset-y-0 left-0 flex items-center pl-3'></i>
                <input v-model="form.search"
                    class="duration-300 ease-in-out placeholder:italic placeholder:text-slate-400 dark:placeholder:text-gray-500 dark:text-white/80 block bg-white dark:bg-zinc-900 w-96 border-slate-300 dark:border-slate-300/20 rounded-md py-2 pl-9 pr-3 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring focus:ring-opacity-50 sm:text-sm"
                    placeholder="Search..." type="text" name="search" />
            </label>
        </div>

        <div>
            <select id="filterBy" v-model="form.filterBy"
                class="block rounded-lg dark:bg-zinc-800 text-sm dark:text-white text-gray-700 border-gray-300 dark:border-white/30 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 shadow-sm w-full">
                <option value="">All</option>
                <option v-for="requirement in requirements" :value="requirement.name">{{ requirement.name }}</option>
            </select>
        </div>
    </div>

    <!-- Students -->
    <InfiniteScroll :loadMore="loadMoreStudents">
        <table class="w-full dark:text-white text-left select-none">
            <thead class="border-b dark:border-white/30 sticky top-14 bg-white dark:bg-zinc-900 duration-300 ease-in-out">
                <tr>
                    <th class="text-xs font-bold py-3 pl-4 cursor-pointer" @click="form.sortBy = form.sortBy === 1 ? 2 : 1">
                        <span class="mr-3">Name</span>
                        <i class="fa-solid"
                            :class="form.sortBy === 2 ? 'fa-arrow-up' : form.sortBy === 1 ? 'fa-arrow-down' : ''"></i>
                    </th>
                    <th class="text-xs font-bold py-3 cursor-pointer"
                        @click="form.sortBy = form.sortBy === 0 || form.sortBy === undefined ? 3 : 0">
                        <span class="mr-3">Year</span>
                        <i class="fa-solid"
                            :class="form.sortBy === 3 ? 'fa-arrow-up' : form.sortBy === 0 || form.sortBy === undefined ? 'fa-arrow-down' : ''"></i>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr @click="this.$inertia.get(route('students.show', student))"
                    class="text-sm border-b dark:border-white/30 hover:bg-black/10 dark:hover:bg-white/20 cursor-pointer"
                    v-for="student in visibleStudents.data">
                    <td class="py-1 pl-4"><span class="rounded-full w-3 h-3 inline-flex self-center place-self-center mr-3"
                            :class="student.course === 'BSIT' ? 'bg-orange-400' : student.course === 'BSENT' ? 'bg-yellow-300' : student.course === 'BTLED' ? 'bg-blue-500' : 'bg-white'"></span>{{
                                student.formal_full_name }}</td>
                    <td class="py-1">{{ student.year }}</td>
                </tr>
            </tbody>
        </table>
    </InfiniteScroll>
    <div v-if="!visibleStudents.data.length" class="flex justify-center mt-8">
        <div class="flex flex-col items-center">
            <div class="rounded-full bg-gray-800 dark:bg-zinc-900 h-28 w-28 items-center flex justify-center">
                <i class="fas fa-user text-white text-5xl"></i>
            </div>
            <span class="text-slate-400 dark:text-white/50">No student found</span>
        </div>
    </div>

    <!-- New Student Modal -->
    <div>
        <Transition enter-active-class="duration-200 ease-out" enter-from-class="transform opacity-0 scale-75"
            enter-to-class="opacity-100 scale-100" leave-active-class="duration-200 ease-out"
            leave-from-class="opacity-100 scale-100" leave-to-class="transform opacity-0 scale-75">
            <div v-if="showNewStudentModal" class="inset-0 fixed z-50 h-screen w-screen flex justify-center items-center"
                @click.self="this.showNewStudentModal = false">
                <div
                    class="relative bg-white dark:bg-zinc-900 w-full lg:w-1/4 h-auto max-h-[80%] p-6 rounded-lg dark:text-white overflow-auto">
                    <span class="font-bold text-lg block mb-2">New student</span>
                    <form @submit.prevent="newform.post(route('students.store'), {
                        onSuccess: () => {
                            if (!errors.length) {
                                this.showNewStudentModal = false
                                newform.reset()
                            } else {
                                this.showNewStudentModal = true
                            }
                            this.visibleStudents = this.students
                        },
                        preserveState: true,
                        preserveScroll: true,
                    })">
                        <div>
                            <BreezeLabel for="first_name" value="First name" />
                            <BreezeInput id="first_name" type="text" class="mt-1 block w-full" v-model="newform.first_name"
                                required autofocus />
                        </div>

                        <div class="mt-4">
                            <BreezeLabel for="middle_name" value="Middle name" />
                            <BreezeInput id="middle_name" type="text" class="mt-1 block w-full"
                                v-model="newform.middle_name" />
                        </div>

                        <div class="mt-4">
                            <BreezeLabel for="last_name" value="Last name" />
                            <BreezeInput id="last_name" type="text" class="mt-1 block w-full" v-model="newform.last_name" />
                        </div>

                        <div class="mt-4 flex space-x-2">
                            <div class="w-full">
                                <BreezeLabel for="year" value="Year" />
                                <select id="year" v-model="newform.year" required
                                    class="block rounded-lg dark:bg-zinc-800 text-sm dark:text-white text-gray-700 border-gray-300 dark:border-white/30 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 shadow-sm mt-2 w-full">
                                    <option value="" selected hidden disabled>Select year</option>
                                    <option v-for="year in years" :value="year">{{ year }}</option>
                                </select>
                            </div>

                            <div class="w-full">
                                <BreezeLabel for="course" value="Course" />
                                <select id="course" v-model="newform.course" required
                                    class="block rounded-lg dark:bg-zinc-800 text-sm dark:text-white text-gray-700 border-gray-300 dark:border-white/30 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 shadow-sm mt-2 w-full">
                                    <option value="" selected hidden disabled>Select course</option>
                                    <option value="BSIT">BSIT</option>
                                    <option value="BSENT">BSENT</option>
                                    <option value="BTLED">BTLED</option>
                                </select>
                            </div>
                        </div>

                        <div class="mt-6 flex justify-end space-x-2">
                            <button @click="this.showNewStudentModal = false" type="button"
                                class="hover:underline dark:text-white/80">Cancel</button>
                            <button type="submit" :disabled="newform.processing"
                                :class="{ 'opacity-25': newform.processing }"
                                class="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-900 text-sm rounded-lg">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>
        <Transition enter-active-class="duration-200 ease opacity-0" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="duration-200 ease opacity-90" leave-from-class="opacity-90"
            leave-to-class="transform opacity-0" appear>
            <div v-if="showNewStudentModal" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"></div>
        </Transition>
    </div>
</template>

<script>
import Dropdown from '@/Components/Dropdown.vue';
import BreezeInput from '@/Components/Input.vue';
import BreezeLabel from '@/Components/Label.vue';
import { useForm, Head } from '@inertiajs/inertia-vue3';
import InfiniteScroll from '@/Components/InfiniteScroll.vue';
import throttle from 'lodash/throttle';
import pickBy from 'lodash/pickBy';

export default {
    components: {
        Dropdown,
        BreezeInput,
        BreezeLabel,
        Head,
        InfiniteScroll
    },
    data() {
        return {
            showNewStudentModal: false,
            form: {
                search: this.filters.search,
                sortBy: this.filters.sortBy,
                filterBy: this.filters.filterBy ?? '',
            },
            visibleStudents: this.students,
        }
    },
    props: {
        students: Object,
        errors: Object,
        filters: Object,
        requirements: Object
    },
    methods: {
        loadMoreStudents() {
            if (!this.visibleStudents.next_page_url) {
                return Promise.resolve();
            }

            return axios.get(this.visibleStudents.next_page_url).then(response => {
                this.visibleStudents = {
                    ...response.data,
                    data: [...this.visibleStudents.data, ...response.data.data]
                }
            });
        }
    },
    setup() {
        const newform = useForm({
            first_name: '',
            middle_name: '',
            last_name: '',
            year: '',
            course: ''
        })

        return { newform }
    },
    computed: {
        years() {
            const year = new Date().getFullYear()
            return Array.from({ length: year - 2008 }, (value, index) => 2009 + index)
        }
    },
    watch: {
        form: {
            deep: true,
            handler: throttle(function () {
                this.$inertia.get('/students', pickBy(this.form), {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                    onSuccess: () => this.visibleStudents = this.students
                });
            }, 150),
        }
    },
}
</script>