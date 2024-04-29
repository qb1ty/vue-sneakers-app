<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { email, helpers, maxLength, minLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import axios from 'axios'

import ProfileEmpty from './Profile-empty.vue'

const usernameField = ref('')
const emailField = ref('')
const passwordField = ref('')
const viewOrHide = ref(false)

const examDisabledButton = computed(() => {
    if (usernameField.value.trim().length && emailField.value.trim().length && passwordField.value.trim().length) {
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
    },
    usernameField: {
        minLength: helpers.withMessage(`Минимальная длинна: 3 символа`, minLength(3)),
        maxLength: helpers.withMessage(`Максимальная длинна: 12 символов`, maxLength(12))
    }
}))

const router = useRouter()
const submitHandler = async () => {
    try {
        const { data: register } = await axios.post(`https://c29c78ef6c87b399.mokky.dev/register`, {
            "fullname": usernameField.value,
            "email": emailField.value,
            "password": passwordField.value
        })
        
        localStorage.setItem('user-token', register.token)
        router.push('/')
    } catch (error) {
        console.log(error)
    }
}
const v = useVuelidate(rules, {passwordField, emailField, usernameField})
</script>

<template>
    <div>
        <form @submit.prevent="submitHandler">
            <div class="flex flex-col items-center relative">
                <div v-for="element of v.usernameField.$errors" :key="element.$uid" class="absolute top-[10px] left-3 text-red-600 text-base font-sans">{{ element.$message }}</div>
                <input type="text" v-model="v.usernameField.$model" name="username" autocomplete="off" class="font-sans bg-transparent outline-none mt-[29px] w-[280px] h-[52px] text-white text-xl px-[10px] border-b border-gray-700 transition duration-300 hover:border-gray-400 focus:border-gray-400 placeholder:text-slate-50" placeholder="Имя пользователя">
                <div v-for="element of v.emailField.$errors" :key="element.$uid" class="absolute top-[90px] left-3 text-red-600 text-base font-sans">{{ element.$message }}</div>
                <input type="email" v-model="v.emailField.$model" name="email" autocomplete="off" class="font-sans bg-transparent outline-none mt-[29px] w-[280px] h-[52px] text-white text-xl px-[10px] border-b border-gray-700 transition duration-300 hover:border-gray-400 focus:border-gray-400 placeholder:text-slate-50" placeholder="Элеткронная почта">
                <div v-for="element of v.passwordField.$errors" :key="element.$uid" class="absolute top-[170px] left-3 text-red-600 text-base font-sans">{{ element.$message }}</div>
                <input :type="viewOrHide ? 'text' : 'password'" v-model="v.passwordField.$model" name="password" autocomplete="on" class="font-sans bg-transparent outline-none mt-[29px] w-[280px] h-[52px] text-white text-xl px-[10px] border-b border-gray-700 transition duration-300 hover:border-gray-400 focus:border-gray-400 placeholder:text-slate-50" placeholder="Пароль">
                <img v-if="viewOrHide" @click="viewOrHide = false" src="/view.svg" alt="View" class="absolute w-8 top-[200px] right-3 cursor-pointer">
                <img v-if="!viewOrHide" @click="viewOrHide = true" src="/view-hide.svg" alt="View" class="absolute w-8 top-[200px] right-3 cursor-pointer">
            </div>
            <div class="flex items-center" type="submit">
                <button
                    :disabled="examDisabledButton"
                    class="h-[44px] w-[288px] mt-20 cursor-pointer bg-orange-200 border border-transparent rounded-3xl disabled:bg-slate-600 disabled:cursor-not-allowed"    
                >Зарегистрироваться</button>
            </div>
        </form>
        <profile-empty/>
    </div>
    
</template>