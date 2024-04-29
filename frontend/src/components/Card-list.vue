<script setup>
import Card from './Card.vue'

defineProps({
    items: Array,
    isFavorites: Boolean,
    isTwoLevelProps: Boolean
})

const emit = defineEmits(['addFavorite', 'cartAdded', 'removeFavoriteItem'])
</script>

<template>
    <div class="grid grid-cols-4 gap-5" v-auto-animate>
        <Card
            v-for="item in items"
            :key="item.id"
            :image="isTwoLevelProps ? item.item.imageUrl : item.imageUrl"
            :description="isTwoLevelProps ? item.item.title : item.title"
            :price="isTwoLevelProps ? item.item.price : item.price"
            :isLiked="item.isFavorite"
            :isAdded="item.isAdded"
            :onClickedFavorite="isFavorites ? null : () => emit('addFavorite', item)"
            :onClickedAdd="isFavorites ? null : () => emit('cartAdded', item)"
            :removeFavoriteItem="isFavorites ? () => emit('removeFavoriteItem', item) : null"
        />
    </div>
</template>

