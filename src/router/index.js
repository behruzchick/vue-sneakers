import {createWebHistory,createRouter} from 'vue-router'
import Home from "../views/Home.vue";
import Favorites from "../views/Favorites.vue";
import Orders from "../views/Orders.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: Favorites,
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
  },
];

const router = createRouter({
  history:createWebHistory(),
  routes
})


export default router;