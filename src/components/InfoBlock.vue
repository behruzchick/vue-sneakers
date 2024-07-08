<script setup>
defineProps({
  title: String,
  description: String,
  imageUrl: String,
});
</script>


<template>
  <div class="h-screen flex items-center justify-center flex-col">
    <div class="text-center flex items-center flex-col">
      <img :src="imageUrl" alt="" />
      <b class="font-xl">{{ title }}</b>
      <p class="text-slate-500">{{ description }}</p>
    </div>
    <router-link to="/">
      <button
        class="bg-lime-500 flex items-center py-4 pb-4 rounded-2xl text-white p-4 my-8 hover:bg-lime-600 transition"
      >
        <img class="rotate-180 mr-2" src="/arrow-next.svg" alt="" />
        Вернуться назад
      </button>
    </router-link>
  </div>
</template>