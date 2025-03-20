<template>
    <div class="row">
      <div class="col-md-4 mb-3" v-for="product in filteredProducts" :key="product.id">
        <ProductItem :product="product" />
      </div>
    </div>
  </template>
  
  <script>
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import ProductItem from './ProductItem.vue';
  
  export default {
    components: { ProductItem },
    setup() {
      const store = useStore();
      
      onMounted(() => {
        store.dispatch('fetchProducts');
      });
  
      const filteredProducts = computed(() => store.getters.filteredProducts);
  
      return { filteredProducts };
    }
  };
  </script>
  