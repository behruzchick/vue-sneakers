<script setup>
import { inject } from "vue";
import CardList from "../components/CardList.vue";
import InfoBlock from "../components/ComponentInfoBlock.vue";

const { favorites } = inject("cart");

console.log(favorites.value);
</script>


<template>
  <div class="p-10">
    <h2 class="text-3xl font-bold">Закладки</h2>
    <InfoBlock title="Закладок нет :(" description="Вы ничего не добавляли в закладки" imageUrl="/emoji-1.png" v-if="favorites.length === 0"/>
    <CardList :items="favorites" />
  </div>
</template>