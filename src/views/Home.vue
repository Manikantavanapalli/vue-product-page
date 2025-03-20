<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import ProductList from '../components/ProductList.vue';
import ProductFilters from '../components/ProductFilters.vue';
import ShoppingCart from '../components/ShoppingCart.vue';

const store = useStore();

onMounted(() => {
  store.dispatch('fetchProducts'); 
});
</script>

<template>
  <div class="container mt-4">
    <h1 class="text-center">Product Catalog</h1>
    <ProductFilters />
    <ProductList />
    <ShoppingCart />
  </div>
</template>
