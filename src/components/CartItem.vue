<script setup>
    defineProps({
        title:String,
        price:Number,
        imageUrl:String,
        onClickRemove:Function,
        removeFromCart:Function
    })
</script>

<template>
  <div class="flex border border-slate-200 p-4 rounded-xl gap-4">

    <img class="w-16 h-16 mr-3" :src="imageUrl" alt="Sneaker" />

    <div class="flex justify-between flex-col">

      <p>{{title}}</p>

      <div class="flex justify-between">
        <b>{{price}} руб.</b>
        <img @click="removeFromCart" class="cursor-pointer opacity-40 hover:opacity-100 transition" src="/close.svg" alt="" />
      </div>

    </div>

  </div>
</template>