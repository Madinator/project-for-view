<script setup lang="ts">
import { authStore } from "../services/stores/authStore";
import { storeToRefs} from 'pinia';
import { createApp } from "vue";

const main = authStore();

const { username, password } = storeToRefs(main);

const app = createApp({

})

</script>

<template>
    
    <div class="form-horizontal" target="frame">
        <div>
            <label for="username">Username</label>
            <input class="border-gray-500 border-4" name="username" type="text" v-model="username">
        </div>
        <div>
            <label for="password">Password</label>
            <input name="password" class="border-gray-500 border-4" type="text" v-model="password">
        </div>
        <button class="btn btn-" @click="main.login">Войти</button>
    </div>

</template>