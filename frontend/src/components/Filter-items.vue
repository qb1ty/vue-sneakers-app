<template>
    <div class="flex gap-4">
        <select @change="onChangeSelect($event)" class="py-2 px-3 border rounded-md outline-none">
            <option>По умолчанию</option>
            <option value="title">По названию</option>
            <option value="price">По цене (дешевые)</option>
            <option value="-price">По цене (дорогие)</option>
        </select>

        <div class="relative">
            <img src="/search.svg" alt="Search" class="absolute left-4 top-3">
            <input type="text"
            class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
            placeholder="Поиск..."
            @input="onChangeSeacrh($event)"
            />
        </div>
    </div>
</template>

<script setup>
defineProps({
    onChangeSelect: Function,
    onChangeSeacrh: Function
})
</script>