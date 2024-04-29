<script setup>
import { inject } from 'vue';
import CartItem from './Cart-item.vue';

const { cartItems, cartRemoved } = inject('context')
</script>

<template>
    <div class="flex flex-col flex-1 gap-4" v-auto-animate>
        <CartItem v-for="item in cartItems" :key="item.id" :title="item.title" :price="item.price" :image-url="item.imageUrl" @onClickRemove="() => cartRemoved(item)"/>
    </div>
</template>