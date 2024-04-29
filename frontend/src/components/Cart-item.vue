<template>
    <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
        <img :src="imageUrl" alt="Sneakers" class="w-20 h-20">

        <div class="flex flex-col flex-1">
            <p>{{ title }}</p>

            <div class="flex justify-between mt-2">
                <b class="flex-1">{{ price }} KZT.</b>
                <div @click="() => emit('onClickRemove')">
                    <img src="/close.svg" alt="Close" class="opacity-100 cursor-pointer">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    id: Number,
    title: String,
    price: Number,
    imageUrl: String
})

const emit = defineEmits(['onClickRemove'])
</script>