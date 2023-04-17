<script setup>
import { ref } from 'vue';
import BreezeDropdown from '@/Components/Dropdown.vue';
import BreezeDropdownLink from '@/Components/DropdownLink.vue';
import BreezeResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import { Link } from '@inertiajs/inertia-vue3';

const showingNavigationDropdown = ref(false);

</script>

<template>
    <div :class="dark ? 'dark' : ''">
        <div
            class="inset-y-0 left-0 fixed bg-gray-800 dark:bg-zinc-900 w-64 lg:flex flex-col hidden py-6 duration-300 ease-in-out">
            <div class="text-white px-4 font-bold text-lg">
                PUPC
            </div>
            <div class="mt-8 text-white space-y-3">
                <Link :href="route('files')" class="px-6 py-2 hover:bg-white/10 flex w-[90%] rounded-r-full"
                    :class="route().current('files') ? 'dark:bg-zinc-700 bg-black/20' : ''">
                <div>
                    <i class="fa-solid fa-file w-10"></i>Files
                </div>
                </Link>

                <Link v-if="this.$page.props.auth.user.role_id !== 1" :href="route('share.index')"
                    class="px-6 py-2 hover:bg-white/10 flex w-[90%] rounded-r-full"
                    :class="route().current('share.index') ? 'dark:bg-zinc-700 bg-black/20' : ''">
                <div>
                    <i class="fa-solid fa-share-nodes w-10"></i>Shared Files
                </div>
                </Link>

                <Link :href="route('trash')" class="px-6 py-2 hover:bg-white/10 flex w-[90%] rounded-r-full"
                    :class="{ 'dark:bg-zinc-700 bg-black/20': route().current('trash') }">
                <div>
                    <i class="fa-solid fa-trash w-10"></i>Trash
                </div>
                </Link>
            </div>
            <hr class="opacity-25 mt-6">
            <div class="mt-6 text-white px-3 space-y-3">
                <Link v-if="this.$page.props.auth.user.role_id === 1" :href="route('roles.index')"
                    :class="{ 'dark:bg-zinc-700 bg-black/20': route().current('roles.*') }"
                    class="px-4 py-2 hover:bg-white/10 flex rounded-lg">
                Roles
                </Link>
                <Link v-if="this.$page.props.auth.user.role_id === 1" :href="route('users.index')"
                    :class="{ 'dark:bg-zinc-700 bg-black/20': route().current('users.*') }"
                    class="px-4 py-2 hover:bg-white/10 flex rounded-lg">
                Users
                </Link>
                <Link v-if="this.$page.props.auth.user.role_id === 2" :href="route('students.index')"
                    :class="{ 'dark:bg-zinc-700 bg-black/20': route().current('students.*') }"
                    class="px-4 py-2 hover:bg-white/10 flex rounded-lg">
                Students
                </Link>
            </div>


            <div @click="toggleDarkMode"
                class="left-2 bottom-2 absolute p-3 rounded-full flex items-center justify-center hover:bg-white/10 h-10 w-10 cursor-pointer">
                <i class="text-white fa-regular" :class="!dark ? 'fa-moon' : 'fa-lightbulb'" id="toggleIcon"></i>
            </div>
        </div>
        <div class="min-h-screen bg-white dark:bg-zinc-800 duration-300 ease-in-out lg:pl-64">
            <nav
                class="bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-transparent duration-300 ease-in-out">
                <!-- Primary Navigation Menu -->
                <div class="px-4">
                    <div class="flex justify-end h-16">
                        <div class="hidden sm:flex sm:items-center sm:ml-6">
                            <!-- Settings Dropdown -->
                            <div class="ml-3 relative">
                                <BreezeDropdown align="right" width="48">
                                    <template #trigger>
                                        <span class="inline-flex rounded-md">
                                            <button type="button"
                                                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-white/80 bg-white dark:bg-zinc-900 hover:text-gray-700 focus:outline-none transition ease-in-out duration-300">
                                                {{ $page.props.auth.user.full_name }}

                                                <svg class="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </template>

                                    <template #content>
                                        <BreezeDropdownLink :href="route('logout')" method="post" as="button">
                                            Log Out
                                        </BreezeDropdownLink>
                                    </template>
                                </BreezeDropdown>
                            </div>
                        </div>

                        <!-- Hamburger -->
                        <div class="-mr-2 flex items-center sm:hidden">
                            <button @click="showingNavigationDropdown = !showingNavigationDropdown"
                                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                                <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        :class="{ 'hidden': showingNavigationDropdown, 'inline-flex': !showingNavigationDropdown }"
                                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 6h16M4 12h16M4 18h16" />
                                    <path
                                        :class="{ 'hidden': !showingNavigationDropdown, 'inline-flex': showingNavigationDropdown }"
                                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Responsive Navigation Menu -->
                <div :class="{ 'block': showingNavigationDropdown, 'hidden': !showingNavigationDropdown }"
                    class="sm:hidden">
                    <div class="pt-2 pb-3 space-y-1">
                        <BreezeResponsiveNavLink :href="route('files')" :active="route().current('files')">
                            Files
                        </BreezeResponsiveNavLink>
                    </div>

                    <!-- Responsive Settings Options -->
                    <div class="pt-4 pb-1 border-t border-gray-200">
                        <div class="px-4">
                            <div class="font-medium text-base text-gray-800">{{ $page.props.auth.user.name }}</div>
                            <div class="font-medium text-sm text-gray-500">{{ $page.props.auth.user.email }}</div>
                        </div>

                        <div class="mt-3 space-y-1">
                            <BreezeResponsiveNavLink :href="route('logout')" method="post" as="button">
                                Log Out
                            </BreezeResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Page Content -->
            <main id="slot">
                <slot />
            </main>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dark: localStorage.getItem('theme') === 'dark'
        }
    },
    methods: {
        toggleDarkMode() {
            if (!this.dark) {
                localStorage.setItem('theme', 'dark')
            } else {
                localStorage.removeItem('theme')
            }
            this.dark = !this.dark
        }
    }
}
</script>