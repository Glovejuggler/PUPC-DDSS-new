<script setup>
import { Head } from '@inertiajs/inertia-vue3';

const props = defineProps({

})
</script>

<template>

    <Head title="Dashboard" />

    <div class="py-4">
        <div class="sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-zinc-900 overflow-hidden shadow-sm sm:rounded-lg">
                <div
                    class="p-6 bg-white dark:text-white dark:bg-zinc-900 border-b border-gray-200 dark:border-transparent">
                    {{ $page.props.auth.user.full_name }}
                </div>
            </div>
        </div>
    </div>
</template>
