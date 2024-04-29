<script setup>
const props = defineProps({
    image: String,
    description: String,
    price: Number,
    isLiked: Boolean,
    isAdded: Boolean,
    onClickedAdd: Function,
    onClickedFavorite: Function,
    removeFavoriteItem: Function
})

const viewFavoriteButton = Boolean(props.onClickedFavorite)
const viewClickButton = Boolean(props.onClickedAdd)
const viewDeleteButton = Boolean(props.removeFavoriteItem)
</script>

<template>
    <div class="relative border bg-white border-slate-100 rounded-3xl cursor-pointer p-8 transition-all duration-300 ease hover:-translate-y-2 hover:shadow-xl">
        <img v-if="viewFavoriteButton" @click="onClickedFavorite" :src="!isLiked ? '/like-1.svg' : '/like-2.svg' " alt="Favourite" class="absolute top-8 left-8">
        <img :src="image" alt="Sneakers">

        <p class="mt-2">{{ description }}</p>

        <div class="flex justify-between mt-3">
            <div class="flex flex-col">
                <span class="text-slate-400">ЦЕНА: </span>
                <span class="font-bold">{{ price }} руб.</span>
            </div>
            <div>
                <img v-if="viewClickButton" @click="onClickedAdd" :src="!isAdded ? '/plus.svg' : '/checked.svg' " alt="Plus">
                <img v-if="viewDeleteButton" @click="removeFavoriteItem" src="/close.svg" alt="Close" class="mt-4">
            </div>
        </div>
    </div>
</template>