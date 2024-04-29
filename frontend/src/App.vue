<script setup>
import { computed, provide, ref, watch } from 'vue';

import Header from './components/Header.vue';
import Drawer from './components/Drawer.vue';

/* Корзина [START] */
// Массив элементов корзины.
const cartItems = ref([])
// Состояние управление открытием и закрытием корзины.
const drawerOpen = ref(false)
// Суммарная стоимость элементов корзины.
const totalPrice = computed(() => cartItems.value.reduce((acc, item) => acc + item.price , 0))
// Вычесление 5% от суммарной стоимостьи всех элементов корзины.
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

// открытие корзины.
const drawerOpened = () => {
  // Изменение постоянного состояния для отображения корзины
  drawerOpen.value = true
}

// Закрытие корзины.
const drawerClosed = () => {
  // Изменение постоянного состояния, чтобы скрыть корзину
  drawerOpen.value = false
}

// Добавление товара в корзину.
const cartAdded = (item) => {
  // Изменение состояния значения ключа «isAdded» с «false» на «true» для отображение правильной иконки.
  item.isAdded = true
  // Добавление нового элемента в массив "cartItems".
  cartItems.value.push(item)
}

// удаление товаров из корзины.
const cartRemoved = (item) => {
  // Изменение состояния значения ключа «isAdded» с «true» на «false» для отображение правильной иконки.
  item.isAdded = false
  // Удаление выбранного элемента из массива "cartItems".
  cartItems.value.splice(cartItems.value.indexOf(item), 1)
}

// Углубленный мониторинг изменений в массиве "cartItems".
watch(cartItems, () => {
  // Добавление, изменение массива корзины "cartItems" в "localStorage"
  localStorage.setItem('cart', JSON.stringify(cartItems.value))
}, { deep: true })
/* Корзина [END] */

// Передача данных дочерним элементам, чтобы избежать многоуровневой передачи реквизитов(props).
provide('context', {
  cartItems,
  drawerClosed,
  cartRemoved,
  cartAdded
})
</script>

<template>
  <div>
    <Drawer v-if="drawerOpen" :cartItems="cartItems" :totalPrice="totalPrice" :vatPrice="vatPrice"/>
    <div class="m-auto w-4/5 bg-white rounded-xl shadow-xl mt-14">
      <Header :total-price="totalPrice" @change-drawer="drawerOpened" />
      
      <div class="p-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>