<script setup>
import DrawerHead from "./DrawerHead.vue";
import CartItemList from "./CartItemList.vue";
import InfoBlock from "./InfoBlock.vue";
defineProps({
  totalPrice:String,
  vatPrice:String,
  createOrder:Function,
  ordered:Boolean
})

</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-50"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-10">
    <DrawerHead />

    <InfoBlock title="Корзина пустая" imageUrl="/package-icon.png" description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ." v-if="totalPrice === 0"/>
    <InfoBlock title="Заказ оформлен!" imageUrl="/order-success-icon.png" description="Ваш заказ #18 скоро будет передан курьерской доставке" v-if="ordered === true"/>

    <CartItemList v-if="totalPrice"/>


    <div v-if="totalPrice" class="flex flex-col my-7">
      <div class="flex gap-2 mb-4">
        <span>Итого: </span>
        <div class="flex-1 border-b borde-dashed"></div>
        <b>{{totalPrice}} руб. </b>
      </div>

      <div class="flex gap-2">
        <span>Налог 5%: </span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{vatPrice}} руб. </b>
      </div>

      <button
        :disabled="totalPrice === 0"
        @click="createOrder"
        class="bg-lime-500 text-white rounded-xl py-4 w-full mt-4 hover:bg-lime-600 active:bg-lime-700 transition cursor-pointer disabled:bg-slate-300"
      >
        Оформить заказ
      </button>
    </div>
  </div>
</template>