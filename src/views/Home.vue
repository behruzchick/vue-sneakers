<script setup>
import { inject } from "vue";
import axios from "axios";

import Header from "../components/Header.vue";
import CardList from "../components/CardList.vue";
import Drawer from "../components/Drawer.vue";

const {items} = inject('cart')
const {onChangeSearch} = inject('cart')
const {onChangeSelect} = inject('cart')

</script>

<template>
  <!-- <Drawer v-if="drawerOpen" :totalPrice="totalPrice" :vatPrice="vatPrice" :createOrder="createOrder" :ordered="ordered"/> -->
  <!-- <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14"> -->
    <div class="p-10">
      <div class="flex justify-between">
        <h2 class="text-3xl font-bold max-lg:text-xl max-sm:text-xs">Все кроссовки</h2>

        <div class="flex gap-4 items-center">
          <select
            @change="onChangeSelect"
            class="py-2 px-3 border rounded-md outline-none max-lg:text-xs max-lg:hidden"
          >
            <option value="name">По названию</option>
            <option value="price">По цене(дешевые)</option>
            <option value="-price">По цене(дорогие)</option>
          </select>

          <div class="relative">
            <img class="absolute top-3 left-5" src="/search.svg" alt="Search" />
            <input
              @keyup.enter="onChangeSearch"
              type="text"
              class="z-3 border border-gray-200 rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400 transition max-lg:py-1 pl-11 max-md:py-2 pr-2"
            />
          </div>
        </div>
      </div>

      <div class="mt-10 h-[370px] overflow-hidden max-lg:overflow-visible max-md:h-screen">
        <CardList :items="items" />
      </div>
    <!-- </div> -->
  </div>
</template>

