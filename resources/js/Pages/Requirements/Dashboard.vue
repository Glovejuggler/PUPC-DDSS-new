<template>
    <title>
        Dashboard
    </title>
    <div class="max-w-screen-2xl px-8 mx-auto grid grid-cols-4 gap-2 mt-4 mb-6">
        <div
            class="rounded-lg dark:text-white text-black flex bg-white dark:bg-zinc-900 overflow-hidden border dark:border-zinc-600">
            <i class="fa-solid fa-user-group text-white text-7xl p-4 bg-blue-600"></i>
            <div class="p-4 flex-grow">
                <span class="">Students</span>
                <div class="flex justify-end">
                    <p class="text-5xl font-bold">{{ studentCount }}</p>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-screen-2xl px-8 mx-auto grid grid-cols-4 gap-2 my-4">
        <div v-for="requirement in requirements"
            class="border rounded-lg p-4 cursor-pointer dark:text-white dark:bg-zinc-900 dark:border-zinc-600"
            @click="$inertia.get(`/students?filterBy=${requirement.id}`)">
            <p class="font-bold text-lg">{{ requirement.name }}</p>
            <div>
                {{ `${requirement.students_count}/${studentCount}` }}
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        requirements: Object,
        studentCount: Number,
    }
}
</script>