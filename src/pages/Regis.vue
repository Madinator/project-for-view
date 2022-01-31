<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { authStore } from "../services/stores/authStore";
import { mapState, mapWritableState, storeToRefs} from 'pinia';
import BaseInput from '../components/base/BaseInput.vue';
import BaseButton from '../components/base/BaseButton.vue';
import BaseSelect from '../components/base/BaseSelect.vue'
import ModalError from '../components/modals/ModalError.vue';
import { InputType, ButtonType } from "../utils/constants"

const AuthStore = authStore();
const { numberPhone, isRegister, status } = storeToRefs(AuthStore);


const Component = defineComponent({
    setup() {
        
    },
    components:  {
        BaseInput,
        BaseButton,
        ModalError
    },
})

let warningText = ref('');


async function RequestSmsCodeWeb() {
    await AuthStore.RequestSmsCodeWeb();

    if(status.value === 200) {
        alert("Вы авторизовались успешно")
    }

    if(status.value === 404) {
        warningText.value = "Введен неверный пароль"
        alert('User with this number does not exist')
    }

    if(status.value === 400) {
        warningText.value = "На этот номер не зарегистрировано ОСИ"
    } 
}

</script>

<template>
    
    <div class="flex-col center" target="frame">
        <label class="block text-center font-bold text-md">регистрация</label>
        <div class="mt-9 w-[23.25rem] h-[3.25rem]">
            <BaseInput placeholder="+7(___)-__-__" v-model="numberPhone" :type="InputType.Phone"/>
        </div>
        <div class="mt-8 w-[23.25rem] h-[3.25rem]">
            <BaseButton name="Запросить СМС код" :type="ButtonType.Primary" @click="RequestSmsCodeWeb"/>
        </div>
        <label class="block text-center mt-4 font-semibold text-base">Уже есть аккаунт</label>
    </div>

</template>