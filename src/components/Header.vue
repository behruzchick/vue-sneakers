<script setup>
import { defineEmits, ref } from "vue";
const emit = defineEmits(["openDrawer"]);

defineProps({
  totalPrice: Number,
  loading: Boolean,
});

const openMenu = ref(false);

const onClickOpenMenu = () => {
  openMenu.value = true;
};

const onClickCloseMenu = () => {
  openMenu.value = false;
};
const onClickHandler = () => {
  emit('openDrawer');
  onClickCloseMenu();
};
</script>



<template>
  <header
    class="relative flex justify-between border-b border-slate-300 px-8 py-8"
  >
    <div class="flex items-center gap-4 max-lg:gap-2">
      <img src="/logo.png" alt="Logo" class="w-10 mr-5" />
      <div>
        <h2 class="text-xl font-bold uppercase max-lg:text-sm">Vue Sneakers</h2>
        <p class="text-slate-600 max-lg:text-sm">Магазин лучших кроссовок</p>
      </div>
    </div>

    <ul class="flex items-center gap-10 max-lg:hidden">
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center cursor-pointer gap-3"
      >
        <img src="/cart.svg" alt="" />
        <b>{{ totalPrice }} руб.</b>
      </li>

      <router-link to="/">
        <li
          class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black"
        >
          <b>Кросовки</b>
        </li>
      </router-link>

      <router-link to="/favorites">
        <li
          class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black"
        >
          <img src="/heart.svg" alt="" />
          <b>Закладки</b>
        </li>
      </router-link>

      <router-link to="/orders">
        <li
          class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black"
        >
          <b>Мои заказы</b>
        </li>
      </router-link>
    </ul>

    <ul class="hidden max-lg:block">
      <li>
        <img
          src="/hamburger.png"
          alt="hamburger"
          class="w-11 h-11 transition active:bg-slate-300"
          @click="onClickOpenMenu"
        />
      </li>

      <div
        class="w-full h-[500px] bg-gray-400 absolute top-0 right-0 roundedx-xl z-30 flex items-center flex-col gap-11 py-12"
        v-if="openMenu === true"
      >
        <img src="/x-icon.png" class="absolute right-0 top-0 w-[100px] h-[100px] active:bg-slate-500" alt="closeBtn" @click="onClickCloseMenu" />

        <li
          @click="onClickHandler"
          class="flex items-center cursor-pointer gap-3 text-bold text-5xl mt-10"
        >
          <b>Корзина</b>
        </li>

        <router-link to="/">
          <li
            @click="onClickCloseMenu"
            class="flex items-center cursor-pointer gap-3 text-bold text-5xl text-black hover:text-gray-500"
          >
            <b>Кросовки</b>
          </li>
        </router-link>

        <router-link to="/favorites">
          <li
            @click="onClickCloseMenu"
            class="flex items-center cursor-pointer gap-3 text-bold text-5xl text-black hover:text-gray-500"
          >
            <b>Закладки</b>
          </li>
        </router-link>

        <router-link to="/orders">
          <li
            @click="onClickCloseMenu"
            class="flex items-center cursor-pointer gap-3 text-bold text-5xl text-black hover:text-gray-500"
          >
            <b>Мои заказы</b>
          </li>
        </router-link>
      </div>
    </ul>
  </header>
</template>