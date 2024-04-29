<script setup>
import axios from 'axios';
import debounce from 'lodash.debounce';
import { ref, inject, onMounted, watch, reactive } from 'vue';

import CardList from '../components/Card-list.vue';
import FilterItems from '../components/Filter-items.vue';
import Carousel from '../components/Carousel.vue';

// Все товары сайта.
const items = ref([])
// Изъятие данных из провайдера.
const { cartAdded, cartRemoved, cartItems } = inject('context')

// Методы для фильтрации всех товаров сайта.
const filters = reactive({
  // Метод для фильтрации с помощью селеткора (select).
  sortBy: '',
  // Метод для фильтрации с помощью поисковика (input).
  searchQuery: ''
})

// Функция для удаления или добавления товара в корзину.
const onClickCartAdd = (item) => {
    // Если значение конкретного товара "isAdded" находится в состоянии "false".
    if (!item.isAdded) {
        // Тогда добовляем в корзину товар
        cartAdded(item)
        // Если значение конкретного товара "isAdded" находится в состоянии "true".
    } else {
        // Тогда удаляем товар из корзины
        cartRemoved(item)
    }
}

// Сортировка по выброннаму "options" из "select".
const onChangeSelect = event => {
    // Пресваеваем значение "options" в "sortBy".
    filters.sortBy = event.target.value
}

// Поисковик, debounce - исскуственная задержка (0.500 секунд) для оптимизации.
const onChangeSeacrh = debounce((event) => {
  // Пресваеваем значение "input" в "searchQuery".
  filters.searchQuery = event.target.value
}, 500)

// Добавление закладок.
const addFavorite = async (item) => {
    // Использование "trycatch".
    try {
        // Проверка, находится ли товар уже в закладках.
        if (!item.isFavorite) {
            // Объект для передачи на сервер.
            const sneaker = {
              item_id: item.id,
            }
            // Изменение состояния "isFavorite" от "false" к "true".
            item.isFavorite = true

            // Отправка данных на сервер.
            const { data } = await axios.post('https://c29c78ef6c87b399.mokky.dev/favorites', sneaker)
            // Меняем значение "favId" на значение "data.id"
            item.favId = data.id
        } else {
            // Изменение состояния "isFavorite" от "true" к "false".
            item.isFavorite = false
            // Удаляем элемент из закладок по "id" с помощью "favId"
            await axios.delete(`https://c29c78ef6c87b399.mokky.dev/favorites/${item.favId}`)
            // Меняем значение "favId" на значение "null"
            item.favId = null
        }
    } catch (error) {
        console.log(error)
    }
}

// Получяем данные о закладках.
const fetchFavorite = async () => {
  // Запрашиваем с сервера данные.
  const { data: favorites } = await axios.get('https://c29c78ef6c87b399.mokky.dev/favorites')

  // Меняем знаечние "items.value" при условии что в "favorites" есть элемент который есть и у "items.value".
  items.value = items.value.map((item) => {
    const favorite = favorites.find((fav) => fav.item_id === item.id);
    // Если таких элементов нет, то просто возврощяем сами элементы (ничего не меняем).
    if (!favorite) return item;

    // Если такие элименты есть, добовляем некоторые ключий.
    return {
      ...item,
      isFavorite: true,
      favId: favorite.id
    }
  })
}

// Получяем данные о всех товарах.
const fetchItems = async () => {
  // Использование "trycatch".
  try {
    // Запрашиваем с сервера данные.
    const { data } = await axios.get(`https://c29c78ef6c87b399.mokky.dev/items?title=*${filters.searchQuery}*&sortBy=${filters.sortBy}`);

    // Добовляем нашим объектам товаров некоторые ключи.
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favId: null,
      isAdded: false
    }))
  } catch (error) {
    console.log(error)
  }
}

// После рендера компонента срабатывает данный скрипт
onMounted(async () => {
  // Сохроняем массив данных корзины в "localStorage"
  const localCart = localStorage.getItem('cart')
  // 
  cartItems.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavorite()

  items.value = items.value.map((item) => {
    return {
      ...item,
      isAdded: cartItems.value.some((cart) => cart.id === item.id) ? true : false
    }
  })
})

// Неглубокое наблюдение за изменением значении "reactive" объекта "filters".
watch(filters, fetchItems)

// Неглубокое наблюдение за изменением массива "cartItems".
watch(cartItems, () => {
  items.value = items.value.map((item) => {
    // Меняем значение "isAdded" от "true" к "false"
    return {
      ...item,
      isAdded: false
    }
  })
})
</script>

<template>
    <div>
        <Carousel />
        <div class="flex justify-between items-center">
            <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>
            <FilterItems :onChangeSelect="onChangeSelect" :onChangeSeacrh="onChangeSeacrh"/>
        </div>
        
        <div class="mt-10">
            <CardList :items="items" @add-favorite="addFavorite" @cart-added="onClickCartAdd" :is-favorites="false" :is-two-level-props="false"/>
            <div v-if="!items.length">
                Данный товар не найден
            </div>
        </div>
    </div>
    
</template>