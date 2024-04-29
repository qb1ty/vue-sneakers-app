<script setup>
defineProps({
    title: String,
    description: String,
    image: String,
    isClose: Boolean
})

const emit = defineEmits(['drawerClosed'])
</script>

<template>
    <div>
        <img :src="image" alt="Icon" class="w-28 mx-auto">
        <div class="mt-7">
            <span class="font-bold text-2xl">{{ title }}</span>
        </div>
        <div class="mt-3 max-w-[300px]">
            <span class="text-lg text-slate-800 opacity-50">
                {{ description }}
            </span>
        </div>
        <div class="mt-10 relative">
            <button v-if="!isClose" @click="() => emit('drawerClosed')" class="bg-lime-500 w-[245px] h-[55px] text-white border rounded-2xl">
                <svg class="rotate-180 absolute top-[21px] left-[65px]" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 7H14.7143" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="ml-5">Вернуться назад</span>
            </button>
            <router-link to="/" v-else>
                <button @click="() => emit('drawerClosed')" class="bg-lime-500 w-[245px] h-[55px] text-white border rounded-2xl">
                    <svg class="rotate-180 absolute top-[21px] left-[60px]" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 7H14.7143" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="ml-5">Вернуться назад</span>
                </button>
            </router-link>
        </div>
    </div>
</template>