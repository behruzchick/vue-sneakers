<script setup>
    import {inject,ref} from 'vue';
    import CardList from '../components/OrderList.vue'
    import InfoBlock from "../components/ComponentInfoBlock.vue";


    const ord = ref([]);
    const {orders} = inject('cart');


</script>


<template>
    <div class="p-10">
        <InfoBlock title="У вас нет заказов" description="Вы нищеброд? Оформите хотя бы один заказ." imageUrl="/emoji-2.png" v-if="ord === []"/>
        <CardList :items="orders" />
    </div>
</template>