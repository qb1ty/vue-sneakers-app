<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { email, helpers, maxLength, minLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import axios from 'axios'

import ProfileLoginEmpty from './Profile-login-empty.vue';

const emailField = ref('')
const passwordField = ref('')
const viewOrHide = ref(false)
const errorStatus = ref(0)

const examDisabledButton = computed(() => {
    if (emailField.value.trim().length && passwordField.value.trim().length) {
        if (v.value.$error === false) {
            return false
        } else if (v.value.$error === true) {
            return true
        }
    } else {
        return true;
    }
})

const rules = computed(() => ({
    passwordField: {
        minLength: helpers.withMessage(`Минимальная длинна: 3 символа`, minLength(3)),
        maxLength: helpers.withMessage(`Максимальная длинна: 12 символов`, maxLength(12))
    },
    emailField: {
        email: helpers.withMessage(`Некорректная почта`, email)
    }
}))

const router = useRouter()
const submitHandler = async () => {
    try {
        const { data: register } = await axios.post(`https://c29c78ef6c87b399.mokky.dev/auth`, {
            "email": emailField.value,
            "password": passwordField.value
        })
        
        errorStatus.value = ''
        localStorage.setItem('user-token', register.token)
        router.push('/')
    } catch (error) {
        errorStatus.value = error.response.status
        emailField.value = ''
        passwordField.value = ''
        console.log(errorStatus.value)
    }
}

const v = useVuelidate(rules, {passwordField, emailField})
</script>

<template>
    <div>
        <form @submit.prevent="submitHandler">
            <div class="flex flex-col items-center relative">
                <div v-for="element of v.emailField.$errors" :key="element.$uid" class="absolute top-[10px] left-3 text-red-600 text-base font-sans">{{ element.$message }}</div>
                <input type="email" v-model="v.emailField.$model" name="email" autocomplete="off" class="font-sans bg-transparent outline-none mt-[29px] w-[280px] h-[52px] text-white text-xl px-[10px] border-b border-gray-700 transition duration-300 hover:border-gray-400 focus:border-gray-400 placeholder:text-slate-50" placeholder="Элеткронная почта">
                <div v-for="element of v.passwordField.$errors" :key="element.$uid" class="absolute top-[90px] left-3 text-red-600 text-base font-sans">{{ element.$message }}</div>
                <input :type="viewOrHide ? 'text' : 'password'" v-model="v.passwordField.$model" name="password" autocomplete="on" class="font-sans bg-transparent outline-none mt-[29px] w-[280px] h-[52px] text-white text-xl px-[10px] border-b border-gray-700 transition duration-300 hover:border-gray-400 focus:border-gray-400 placeholder:text-slate-50" placeholder="Пароль">
                <img v-if="viewOrHide" @click="viewOrHide = false" src="/view.svg" alt="View" class="absolute w-8 top-[120px] right-2 cursor-pointer">
                <img v-if="!viewOrHide" @click="viewOrHide = true" src="/view-hide.svg" alt="View" class="absolute w-8 top-[120px] right-2 cursor-pointer">
            </div>
            <div v-if="errorStatus === 401" class="relative">
                <div class="absolute top-7 left-5 text-red-600">
                    <span>Несовподение почты или паролья</span>
                </div>
            </div>
            <div class="flex items-center" type="submit">
                <button
                    :disabled="examDisabledButton"
                    class="h-[44px] w-[288px] mt-20 cursor-pointer bg-orange-200 border border-transparent rounded-3xl disabled:bg-slate-600 disabled:cursor-not-allowed"    
                >Войти</button>
            </div>
        </form>
        <profile-login-empty />
    </div>

</template>