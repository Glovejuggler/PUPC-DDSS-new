<script setup>
import { onMounted } from 'vue';
const props = defineProps({
    message: String,
    type: String
})
const emit = defineEmits(['remove'])
onMounted(() => {
    setTimeout(() => emit("remove"), 7000);
})
</script>

<template>
    <div v-if="message && type"
        class="font-semibold text-sm shadow-lg bg-white shadow-black/30 py-2 px-4 rounded-lg flex justify-between items-center mt-3">
        <div>
            {{ `${message}` }}
        </div>
        <button @click="emit('remove')">
            <i
                class="fa-solid fa-x inline-flex text-xs justify-center items-center rounded-full hover:bg-black/10 w-8 h-8 opacity-50 hover:opacity-100"></i>
        </button>
    </div>
</template>