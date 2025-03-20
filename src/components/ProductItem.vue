<script setup>
import { defineProps, ref } from 'vue';
import { useStore } from 'vuex';
import ProductDetailModal from './ProductDetailModal.vue';

const props = defineProps(['product']);
const store = useStore();

const addToCart = () => {
  store.commit('addToCart', props.product);
};

// Store the selected product for the modal
const selectedProduct = ref(null);

const openModal = () => {
  selectedProduct.value = props.product;
  const modal = new bootstrap.Modal(document.getElementById('productModal'));
  modal.show();
};
</script>

<template>
  <div class="card">
    <img :src="product.thumbnail" class="card-img-top" @click="openModal" style="cursor: pointer;" />
    <div class="card-body">
      <h5 class="card-title">{{ product.title }}</h5>
      <p class="card-text">${{ product.price }}</p>
      <button class="btn btn-primary w-100" @click="addToCart">Add to Basket</button>
    </div>
  </div>

  <!-- Product Detail Modal -->
  <ProductDetailModal v-if="selectedProduct" :product="selectedProduct" />
</template>
