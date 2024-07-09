
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
  <div v-for="order in props.items" class="grid grid-cols-4  gap-8 py-8 overflow-auto h-full custom-scrollbar max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1" v-auto-animate>
    
        <b>Сумма в итоге:  {{order.totalPrice}} рублей</b>
        <Card
          v-for="item in order.items"
          :id="item.id"
          :isAdded="null"
          :imageUrl="item.imageUrl"
          :title="item.title"
          :price="item.price"
          :isFavorite="null"
          @clickAdd="() => onClickAdd(item)"
          @clickFavorite="() => addFavorite(item)"
          @clickAddToCart="() => addToCart(item)"
        />
  </div>


</template>
