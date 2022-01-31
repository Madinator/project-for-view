<script setup lang="ts">
import { defineComponent } from 'vue';
import Login from "./pages/Login.vue";
import Regis from "./pages/Regis.vue";

const Component = defineComponent({
    components: {
      Login,
      Regis,
    }
})

</script>

<template>
  <Regis />
</template>

<style lang="scss">


</style>
