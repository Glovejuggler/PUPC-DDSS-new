<script setup>
import Toast from './Toast.vue';
import { onUnmounted } from 'vue';
import { usePage } from '@inertiajs/inertia-vue3';
import { Inertia } from '@inertiajs/inertia';
import toast from '@/Stores/toast';
function remove(index) {
    toast.remove(index)
}
const page = usePage();
let removeFinishEventListener = Inertia.on('finish', () => {
    if (page.props.value.flash) {
        toast.add({
            message: page.props.value.flash[1],
            type: page.props.value.flash[0]
        })
    }
})
onUnmounted(() => {
    removeFinishEventListener();
});
</script>

<template>
    <TransitionGroup tag="div" enter-from-class="translate-x-full opacity-0" enter-active-class="duration-300 ease-in-out"
        leave-active-class="duration-500 ease-in-out" leave-to-class="translate-x-full opacity-0"
        class="fixed bottom-4 right-4 max-w-xs w-full z-[999] space-y-3">
        <Toast v-for="(item, index) in toast.items" :key="item.key" :message="item.message" :type="item.type"
            @remove="remove(index)" />
    </TransitionGroup>
</template>