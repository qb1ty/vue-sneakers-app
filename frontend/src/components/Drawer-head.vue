<template>
    <div class="flex items-center gap-5 mt-2 mb-8">
        <div @click="() => drawerClosed()" class="transition hover:-translate-x-1">
            <svg class="transition-all duration-200 ease opacity-30 cursor-pointer rotate-180 ml-3 hover:opacity-100" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7H14.7143" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <h2 class="text-2xl font-bold">Корзина</h2>
    </div>
</template>


<script setup>
import { inject } from 'vue';

const { drawerClosed } = inject('context')
</script>