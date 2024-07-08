<script setup>
    import DrawerHead from './DrawerHead.vue';
    import CartItem from './CartItem.vue';
    import {inject} from 'vue';

    const {cart} = inject('cart');
    const {removeFromCart} = inject('cart');

 </script>

<template>
    <div class="flex flex-col overflow-auto gap-4 h-[75%] custom-scrollbar" v-auto-animate>
        <CartItem 
            v-for="item in cart"
            :key="item.id"
            :title="item.title"
            :price="item.price"
            :imageUrl="item.imageUrl"
            :removeFromCart="() => removeFromCart(item)"
        />
    </div>
</template>