<script setup>
import Home from "./views/Home.vue";
import Header from "./components/Header.vue";
import Drawer from "./components/Drawer.vue";

import { onMounted, ref, watch, reactive, provide, computed, inject } from "vue";
import axios from "axios";

const cart = ref([]);
const ordered = ref(false);
const items = ref([]);
const favorites = ref([]);
const orders = ref([]);
const loading = ref(true);

const addToCart = async (item) => {
  const obj = {
    parentId: item.id,
  };
  item.isAdded = true;

  await axios.post("https://c1b414132df832ee.mokky.dev/trash", obj);

  fetchTrash();
};

const createOrder = async() => {
  try {
    const { data } = await axios.post(`https://c1b414132df832ee.mokky.dev/orders`, {
      items: cart.value,
      totalPrice: totalPrice.value
    });

    const deletePromises = cart.value.map((crt) => {
      return axios.delete(`https://c1b414132df832ee.mokky.dev/trash/${crt.trashId}`);
    });

    await Promise.all(deletePromises);

    cart.value = [];

    items.value = cart.value.map((item) => ({
      ...item,
      isAdded: false
    }));

    fetchItems();
    fetchOrders();

    return data;
  } catch (error) {
    console.log('Error in createOrder:', error);
  }
}


const fetchOrders = async() => {
  try {
      const {data} = await axios.get("https://c1b414132df832ee.mokky.dev/orders")

      orders.value = data;

      return {
        data
      }
  } catch (error) {
    console.log(error);
  }
}

const removeFromCart = async (item) => {
  await axios.delete(
    `https://c1b414132df832ee.mokky.dev/trash/${item.trashId}`
  );
  item.isAdded = false;
  fetchTrash();
};

const onCLickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item);
  } else {
    removeFromCart(item);
  }
};

const drawerOpen = ref(false);


const closeDrawer = () => {
  drawerOpen.value = false;
};

const openDrawer = () => {
  drawerOpen.value = true;
  console.log(drawerOpen.value);
};

const filters = reactive({
  sortBy: "title",
  searchQuery: "",
});

const onChangeSelect = (e) => {
  filters.sortBy = e.target.value;
};

const onChangeSearch = (e) => {
  filters.searchQuery = e.target.value;
  // fetchItems();
};

const fetchTrash = async () => {
  try {
    const { data: trashItem } = await axios.get(
      "https://c1b414132df832ee.mokky.dev/trash"
    );

    items.value = items.value.map((item) => {
      const trash = trashItem.find((tr) => tr.parentId === item.id);

      if (!trash) {
        return item;
      }

      return {
        ...item,
        isAdded: true,
        trashId: trash.id,
      };
    });

    cart.value = items.value.filter((item) => item.isAdded === true);


  } catch (error) {
    console.log(error);
  }
};

const totalPrice = computed(()=> cart.value.reduce((acc, item) => acc + item.price, 0));
const vatPrice = computed(()=> Math.round((totalPrice.value * 5) / 100 ));

const fetchFavorites = async () => {
  try {
    const { data: favor } = await axios.get(
      `https://c1b414132df832ee.mokky.dev/favorites`
    );

    items.value = items.value.map((item) => {
      const favorite = favor.find(
        (favorite) => favorite.parentId === item.id
      );

      if (!favorite) {
        return item;
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id,
      };
    });
    favorites.value = items.value.filter((item) => item.isFavorite === true);
  } catch (error) {
    console.log(error);
  }
};
const addFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id,
      };

      item.isFavorite = true;

      const { data } = await axios.post(
        "https://c1b414132df832ee.mokky.dev/favorites",
        obj
      );

      item.favoriteId = data.id;
    } else {
      item.isFavorite = false;
      await axios.delete(
        `https://c1b414132df832ee.mokky.dev/favorites/${item.favoriteId}`
      );
      item.favoriteId = null;
    }
    fetchItems()
  } catch (error) {
    console.log(error);
  }
};



const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
    };

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}`;
    }

    const { data } = await axios.get(
      `https://c1b414132df832ee.mokky.dev/items`,
      {
        params,
      }
    );

    items.value = data.map((obj) => ({
      ...obj,
      isAdded: false,
      isFavorite: false,
    }));


    fetchFavorites();
    fetchOrders();
    fetchTrash();

  } catch (error) {
    console.log(error);
  }finally{
    loading.value = false
  }
};
onMounted(async () => {
  await fetchItems(), await fetchFavorites();
  await fetchTrash() , await fetchOrders()
});

watch(filters, fetchItems, fetchTrash, fetchFavorites);

provide("addFavorite", addFavorite);
provide("onCLickAddPlus", onCLickAddPlus);

provide("cart", {
  cart,
  items,
  orders,
  favorites,
  onChangeSearch,
  closeDrawer,
  openDrawer,
  onChangeSelect,
  addToCart,
  removeFromCart, 
  loading
});

</script>

<template>
<div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14 max-md:w-full max-md:mt-0">
    <Drawer v-if="drawerOpen" :totalPrice="totalPrice" :vatPrice="vatPrice" :createOrder="createOrder"/>
    <Header @openDrawer="openDrawer" :totalPrice="totalPrice" :loading="loading"/>
    <router-view></router-view>
</div>

</template>

