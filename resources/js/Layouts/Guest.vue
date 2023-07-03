<template>
    <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
        <img src="logo.png" alt="PUPC Logo" class="w-32 h-auto">
        <p class="font-bold text-2xl mt-4">Digitalized Document Storage System</p>
        <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
            <slot />
        </div>
    </div>
</template>
