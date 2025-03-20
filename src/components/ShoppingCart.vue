<template>
    <div class="card">
      <div class="card-header">Shopping Basket</div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item d-flex justify-content-between align-items-center" v-for="item in cart" :key="item.id">
          {{ item.title }} (x{{ item.quantity }}) - ${{ item.price * item.quantity }}
          <button class="btn btn-danger btn-sm" @click="removeFromCart(item.id)">Remove</button>
        </li>
      </ul>
      <div class="card-footer text-end">
        <strong>Total: ${{ cartTotal }}</strong>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    setup() {
      const store = useStore();
      const cart = computed(() => store.state.cart);
      const cartTotal = computed(() => store.getters.cartTotal);
  
      const removeFromCart = id => {
        store.commit('removeFromCart', id);
      };
  
      return { cart, cartTotal, removeFromCart };
    }
  };
  </script>
  