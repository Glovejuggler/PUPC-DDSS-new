<script setup>
import { ref } from 'vue';

const open = ref(false)
</script>

<template>
    <tr @click="open = !open" class="border-b">
        <slot name="trigger" />
    </tr>

    <template v-if="open">
        <slot name="content" />
    </template>
</template>