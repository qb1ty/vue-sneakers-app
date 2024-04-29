<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import FormLoginEmpty from '@/components/Form-register-empty.vue';
import InfoBlock from '@/components/Info-block.vue';

const router = useRouter()
const userToken = ref(localStorage.getItem('user-token'))

const exitProfile = () => {
    localStorage.removeItem('user-token')
    router.push('/')
}
</script>

<template>
    <div>
        <div v-if="!userToken" class="fixed top-0 bottom-0 left-0 right-0 bg-[url('/sneakers-background.png')] bg-no-repeat bg-center bg-cover z-[100] overflow-scroll">
            <div class="mx-auto mt-[40px] mb-[20px] bg-[#000000ee] w-[410px] h-[720px] border border-transparent rounded-lg">
                <div class="flex flex-col items-center w-[300px] h-[585px] mx-auto py-[30px]">
                    <div class="mb-2">
                        <router-link to="/">
                            <img src="/logo.png" alt="Logo">
                        </router-link>
                    </div>
                    <form-login-empty/>
                </div>
            </div>
        </div>
        <div v-else class="relative h-[75vh] w-full flex items-center justify-center text-center">
            <img src="/exit.svg" alt="Exit" class="absolute top-[-10px] right-[85px] w-6 z-[10] cursor-pointer" @click="exitProfile">
            <div class="absolute top-[-20px] right-0 bg-red-500 py-2 pl-14 pr-5 border border-transparent rounded-lg cursor-pointer" @click="exitProfile">
                <button type="button">
                    Выйти
                </button>
            </div>
            <div class="ml-10">
                <info-block title="Вы успешно зашли!" description="Вы можете заказывать товары нашего интернет-магазина" image="/emoji-3.png" :isClose="true"/>
            </div>
        </div>
    </div>
</template>
