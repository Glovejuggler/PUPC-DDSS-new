<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
    align: {
        default: 'right'
    },
    width: {
        default: '48'
    },
    contentClasses: {
        default: () => ['py-1', 'bg-white', 'dark:bg-zinc-600']
    }
});

const closeOnEscape = (e) => {
    if (open.value && e.key === 'Escape') {
        open.value = false;
    }
};

onMounted(() => document.addEventListener('keydown', closeOnEscape));
onUnmounted(() => document.removeEventListener('keydown', closeOnEscape));

const widthClass = computed(() => {
    return {
        '48': 'w-48',
    }[props.width.toString()];
});

const alignmentClasses = computed(() => {
    if (props.align === 'left') {
        return 'origin-top-left left-0';
    } else if (props.align === 'right') {
        return 'origin-top-right right-0';
    } else {
        return 'origin-top';
    }
});

const open = ref(false);
</script>

<template>
    <div @click="open = !open">
        <slot name="trigger" />
    </div>

    <!-- Full Screen Dropdown Overlay -->
    <!-- <div v-show="open" class="fixed inset-0 z-40" @click="open = false"></div>

                <transition enter-active-class="transition ease-out duration-200"
                    enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95">
                    <div v-show="open" class="absolute z-50 mt-2 rounded-md shadow-lg" :class="[widthClass, alignmentClasses]"
                        style="display: none;" @click="open = false">
                        <div class="rounded-md ring-1 ring-black ring-opacity-5" :class="contentClasses">
                            <slot name="content" />
                        </div>
                    </div>
                </transition> -->

    <Transition enter-active-class="duration-200 ease-out" enter-from-class="transform opacity-0 scale-75"
        enter-to-class="opacity-100 scale-100" leave-active-class="duration-200 ease-out"
        leave-from-class="opacity-100 scale-100" leave-to-class="transform opacity-0 scale-75">
        <div v-show="open" class="overflow-auto inset-0 fixed z-[70] h-screen w-screen flex justify-center items-center"
            @click.self="open = false">
            <slot name="content" />
        </div>
    </Transition>

    <Transition enter-active-class="duration-200 ease opacity-0" enter-from-class="opacity-0" enter-to-class="opacity-100"
        leave-active-class="duration-200 ease opacity-90" leave-from-class="opacity-90" leave-to-class="transform opacity-0"
        appear>
        <div v-show="open" class="fixed inset-0 z-[60] bg-black/50 backdrop-blur-md"></div>
    </Transition>
</template>
