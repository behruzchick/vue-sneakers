
<script setup>
import {inject} from 'vue';
import Card from "./Card.vue";

const props = defineProps({
    items:Array
})


const addFavorite = inject("addFavorite");
const addToCart = inject("onCLickAddPlus"); 

</script>


<template>
  <div class="grid grid-cols-4  gap-8 py-8 overflow-auto h-full custom-scrollbar max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1" v-auto-animate>
    <Card
      v-for="item in props.items"
      :key="item.id"
      :id="item.id"
      :isAdded="item.isAdded"
      :imageUrl="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :onCLickAdd="onCLickAdd"
      :isFavorite="item.isFavorite"
      :onCLickFavorite="() => addFavorite(item)"
      :onCLickAddToCart="() => addToCart(item)"
    />
  </div>
</template>

<style>
    .custom-scrollbar::-webkit-scrollbar{
      opacity: 0;
    }   
</style>