<script setup>
import FormLoginEmpty from '../components/Form-login-empty.vue'
</script>


<template>
    <div>
        <div class="fixed top-0 bottom-0 left-0 right-0 bg-[url('/sneakers-background.png')] bg-no-repeat bg-center bg-cover z-[100] overflow-scroll">
            <div class="mx-auto mt-[80px] mb-[20px] bg-[#000000ee] w-[410px] h-[500px] border border-transparent rounded-lg">
                <div class="flex flex-col items-center w-[300px] h-[585px] mx-auto py-[30px]">
                    <div class="mb-2 mt-5">
                        <router-link to="/">
                            <img src="/logo.png" alt="Logo">
                        </router-link>
                    </div>
                    <form-login-empty />
                </div>
            </div>
        </div>
    </div>
</template>