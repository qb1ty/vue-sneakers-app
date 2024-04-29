<template>
    <header class="flex justify-between border-b border-slate-200 px-10 py-8">
      <router-link to="/">
        <div class="flex items-center gap-4">
          <img src="/logo.png" alt="Logo" class="w-10">
          <div>
            <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
            <p class="text-slate-400">Магазин лучших кросовок</p>
          </div>
        </div>
      </router-link>

      <ul class="flex items-center gap-10">
        <li class="transition-all flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black duration-100" @click="() => emit('changeDrawer')">
          <img src="/cart.svg" alt="Cart">
          <b>{{ totalPrice }} руб.</b>
        </li>
        <router-link to="/favorites">
          <li class="flex items-center cursor-pointer gap-3 text-gray-500">
            <img src="/heart.svg" alt="Favorite">
            <span>Закладки</span>
          </li>
        </router-link>
        <router-link to="/profile">
          <li class="flex items-center cursor-pointer gap-3 text-gray-500">
            <img src="/profile.svg" alt="Profile">
            <span>Профиль</span>
          </li>
        </router-link>
      </ul>
    </header>
</template>


<script setup>
const emit = defineEmits(['changeDrawer'])
defineProps({
  totalPrice: Number
})
</script>