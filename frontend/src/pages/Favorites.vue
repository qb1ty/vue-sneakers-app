<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

import CardList from '@/components/Card-list.vue';
import InfoBlock from '../components/Info-block.vue';

// Массив закладок.
const favorites = ref([])

onMounted(async () => {
  // Метод "trycatch".
  try {
        // Запрос на сервер для получения товаров.
        const { data: favoritesItems } = await axios.get('https://c29c78ef6c87b399.mokky.dev/favorites?_relations=items')

        // Внесение данных с сервера в константу «Избранное».
        favorites.value = favoritesItems
  } catch (error) {
        // Вывод ошибки в консоль.
        console.log(error)
  }
})

// Функция для удалиение элемента.
const removeFavoriteItem = async (fav) => {
    // Используем "trycatch".
    try {
        // Удаляем элемент на сервере по "id" с помощью "fav.id".
        const { data } = await axios.delete(`https://c29c78ef6c87b399.mokky.dev/favorites/${fav.id}`)
        // Удаляем элемент на frontend части сайта.
        favorites.value.splice(favorites.value.indexOf(fav), 1)
        return data
    } catch (error) {
        console.log(error)
    }
}
</script>

<template>
    <div>
        <div v-if="favorites.length">
            <h2 class="text-3xl font-bold mb-8">Мои закладки</h2>
            <CardList :items="favorites" :is-favorites="true" :is-two-level-props="true" @remove-favorite-item="removeFavoriteItem"/>
        </div>
        <div v-else class="flex items-center justify-center text-center h-[75vh] w-full">
            <div class="ml-10">
                <InfoBlock title="Закладок нет :(" description="Вы ничего не добавляли в закладки" image="/emoji-1.png" :isClose="true"/>
            </div>
        </div>
    </div>
</template>