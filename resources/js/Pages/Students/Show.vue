<template>
    <Head>
        <title>
            {{ student.full_name }}
        </title>
    </Head>

    <div class="px-4 py-6">
        <div class="uppercase font-bold dark:text-white">
            {{ `${student.last_name}, ${student.first_name} ${student.middle_name}` }}
        </div>
        <div class="text-sm font-semibold dark:text-white/80">
            {{ student.year }}
        </div>
    </div>
</template>

<script>
import { Head } from '@inertiajs/inertia-vue3';

export default {
    components: {
        Head,
    },
    props: {
        student: Object
    }
}
</script>