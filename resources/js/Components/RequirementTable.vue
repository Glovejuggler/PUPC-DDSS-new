<script setup>
import { ref } from 'vue';
import Expansion from './RequirementTR.vue';

const props = defineProps({
    requirements: Object,
    student: Object
})

const studentHasFile = (requirement) => {
    return props.student.files.find((file) => file.requirement_id === requirement.id)
}

const loading = ref(false)
const showDeleteModal = ref(false)
const fileToDelete = ref('')
const reqToDelete = ref('')

const deleteFile = (data, req) => {
    showDeleteModal.value = true
    fileToDelete.value = data
    reqToDelete.value = req
}
</script>

<template>
    <div v-for="(data, key) in requirements" class="mb-4">
        <div class="font-bold uppercase dark:text-white">{{ key }}</div>
        <div class="rounded-xl border lg:w-1/2 w-full mt-4 overflow-hidden">
            <table class="text-sm text-left w-full">
                <tbody>
                    <template v-for="item in data">
                        <Expansion v-if="item.sub.length">
                            <template #trigger>
                                <th colspan="2" class="px-6 py-2 font-medium">{{ item.name }}<i
                                        class="fa-solid ml-2 fa-angle-down"></i></th>
                            </template>

                            <template #content>
                                <tr class="border-b" v-for="item in item.sub">
                                    <th scope="row"
                                        class="pl-10 pr-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <i class="fa-solid w-6"
                                            :class="studentHasFile(item) ? 'fa-check text-green-500' : 'fa-xmark text-red-500'"></i>
                                        {{ item.name }}
                                    </th>
                                    <td class="px-6 py-2">
                                        <div>
                                            <a :href="route('studentfiles.download', studentHasFile(item).id)"
                                                v-if="studentHasFile(item)"
                                                class="inline-flex justify-center items-center w-8 h-8 hover:bg-black/10 dark:hover:bg-white/20 rounded-full ml-2"><i
                                                    class="fa-regular fa-circle-down dark:text-white"></i></a>
                                            <a :href="route('studentfiles.show', studentHasFile(item))"
                                                v-if="studentHasFile(item)" target="_blank"
                                                class="inline-flex justify-center items-center w-8 h-8 hover:bg-black/10 dark:hover:bg-white/20 rounded-full ml-2"><i
                                                    class="fa-regular fa-eye dark:text-white"></i></a>
                                            <button v-if="studentHasFile(item)"
                                                @click="deleteFile(studentHasFile(item), item)"
                                                class="inline-flex justify-center items-center w-8 h-8 hover:bg-black/10 dark:hover:bg-white/20 rounded-full ml-2"><i
                                                    class="fa-solid fa-trash"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            </template>
                        </Expansion>
                        <template v-else>
                            <tr class="border-b">
                                <th scope="row"
                                    class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <i class="fa-solid w-6"
                                        :class="studentHasFile(item) ? 'fa-check text-green-500' : 'fa-xmark text-red-500'"></i>
                                    {{ item.name }}
                                </th>
                                <td class="px-6 py-2">
                                    <div>
                                        <a :href="route('studentfiles.download', studentHasFile(item).id)"
                                            v-if="studentHasFile(item)"
                                            class="inline-flex justify-center items-center w-8 h-8 hover:bg-black/10 dark:hover:bg-white/20 rounded-full ml-2"><i
                                                class="fa-regular fa-circle-down dark:text-white"></i></a>
                                        <a :href="route('studentfiles.show', studentHasFile(item))"
                                            v-if="studentHasFile(item)" target="_blank"
                                            class="inline-flex justify-center items-center w-8 h-8 hover:bg-black/10 dark:hover:bg-white/20 rounded-full ml-2"><i
                                                class="fa-regular fa-eye dark:text-white"></i></a>
                                        <button v-if="studentHasFile(item)" @click="deleteFile(studentHasFile(item), item)"
                                            class="inline-flex justify-center items-center w-8 h-8 hover:bg-black/10 dark:hover:bg-white/20 rounded-full ml-2"><i
                                                class="fa-solid fa-trash"></i></button>
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </template>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Delete File Modal -->
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
                        Are you sure you want to delete <span class="font-bold">{{ reqToDelete.name }}</span>?
                    </div>
                    <div class="mt-4 flex justify-end space-x-2">
                        <button @click="showDeleteModal = false" type="button"
                            class="hover:underline text-sm px-3">Cancel</button>
                        <button :disabled="loading" @click.stop="this.$inertia.delete(route('studentfiles.destroy', fileToDelete.id), {
                            onSuccess: () => { showDeleteModal = false, loading = false },
                            onStart: () => loading = true,
                            preserveScroll: true
                        })"
                            class="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 active:bg-red-900 text-sm"
                            :class="{ 'opacity-25': loading }">Delete</button>
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