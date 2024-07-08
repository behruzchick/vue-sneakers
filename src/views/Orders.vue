<script setup>
    import {inject,ref} from 'vue';
    import CardList from '../components/OrderList.vue'


    const ord = ref([]);
    const {orders} = inject('cart');
    console.log(orders);


</script>


<template>
    <div class="p-10">
        <CardList :items="orders" />
    </div>
</template>