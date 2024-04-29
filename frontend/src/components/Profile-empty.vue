<template>
    <div>
        <div class="text-gray-500 mt-10 w-[300px] h-[80px] text-center">
            <span class="text-xs">
                Нажимая кнопку «Зарегистрироваться», Вы принимаете условия <a href="#" class="underline underline-offset-1">Пользовательского соглашения</a> и соглашаетесь с <a href="#" class="underline underline-offset-1">Политикой конфиденциальности</a>.
            </span>
        </div>
        <div class="text-gray-500 text-center mt-16 text-sm">
            <span>
                Уже зарегистрированы? 
                <router-link to="/profile/login">
                    <span class="cursor-pointer">Войти тут</span>
                </router-link>
            </span>
        </div>
    </div>
</template>