<script setup>
import { inject, computed, ref } from 'vue';
import axios from 'axios';

import DrawerHead from './Drawer-head.vue';
import CartItemList from './Cart-item-list.vue';
// import DrawerEmpty from './Drawer-empty-cart.vue';
import InfoBlock from './Info-block.vue'

const { drawerClosed, cartItems } = inject('context')

const props = defineProps({
    cartItems: Array,
    totalPrice: Number,
    vatPrice: Number
})

// Состояние управление отоброжение и скрытием заказа
const isCreatingOrder = ref(false)
// 
const orderId = ref(null)

// Проверка длинны массива "cartItems".
const cartIsEmpty = computed(() => cartItems.value.length === 0)

// Проверка неактивности кнопки «buttonDisabled»
const buttonDisabled = computed(() => isCreatingOrder.value || cartIsEmpty.value)

// создание заказа.
const createOrder = async () => {
  // Использование метода "trycatch".
  try {
    // Изменения состояния константы "isCreatingOrder" от «false» к «true»
    isCreatingOrder.value = true
    // Отправка данных заказа на сервер
    const { data: order } = await axios.post('https://c29c78ef6c87b399.mokky.dev/orders', {
      // В ключе «items» массив товаров корзины синхронизируется в момент отправки данных на сервер.
      items: cartItems.value,
      // Общая информация о товарах, находящихся в корзине на момент отправки данных на сервер.
      totalPrice: props.totalPrice
    })

    // Отчистка корзины
    cartItems.value = []

    orderId.value = order.id
  } catch (error) {
    console.log(error)
  } finally {
    // Изменения состояния константы "isCreatingOrder" от «true» к «false»
    isCreatingOrder.value = false
  }
}
</script>

<template>
    <div>
        <div @click="() => drawerClosed()" class="fixed top-0 left-0 h-full w-full bg-black opacity-70 z-20"></div>
        <div class="fixed top-0 right-0 z-30 h-full w-96 overflow-scroll bg-white p-8">
            <div v-if="cartItems.length" class="flex flex-col min-h-[93vh]">
                <div class="grow shrink-0 basis-auto">
                    <DrawerHead />
                    <CartItemList />
                </div>
                
                <div class="flex flex-col grow-0 flex-shrink-0 basis-auto gap-5 mt-7">
                    <div class="flex gap-2">
                        <span>Итого:</span>
                        <div class="flex-1 border-b border-dashed"></div>
                        <b>{{ totalPrice }} KZT.</b>
                    </div>

                    <div class="flex gap-2">
                        <span>Налог 5%:</span>
                        <div class="flex-1 border-b border-dashed"></div>
                        <b>{{ vatPrice }} KZT.</b>
                    </div>

                    <button
                        :disabled="buttonDisabled"
                        class="mt-4 transition bg-lime-500 w-full rounded-xl text-white py-3 disabled:bg-slate-300 hover:bg-lime-600 active:bg-lime-700 cursor-pointer"
                        @click="createOrder()"
                    >
                        Оформить заказ
                    </button>
                </div>
            </div>
            <div v-else-if="!totalPrice || orderId">
                <h3 class="text-2xl font-bold">Корзина</h3>

                <div class="flex flex-col items-center text-center mx-auto mt-[170px]">
                    <InfoBlock
                        v-if="!totalPrice && !orderId"
                        title="Корзина пустая"
                        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
                        image="/package-icon.png"
                        @drawer-closed="drawerClosed"
                    />
                    <InfoBlock
                        v-if="orderId"
                        title="Заказ оформлен!"
                        :description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`"
                        image="/order-success-icon.png"
                        @drawer-closed="drawerClosed"
                    />
                </div>
            </div>
        </div>
    </div>
</template>