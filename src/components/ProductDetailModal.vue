<script setup>
import { defineProps } from 'vue';

defineProps(['product']);
</script>

<template>
  <div class="modal fade" id="productModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ product?.title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <img :src="product?.thumbnail" class="img-fluid mb-3" />
          <p>{{ product?.description }}</p>
          <p><strong>Price:</strong> ${{ product?.price }}</p>
          <p><strong>Stock:</strong> {{ product?.stock }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
