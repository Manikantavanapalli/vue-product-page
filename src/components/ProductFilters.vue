<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const searchQuery = computed({
  get: () => store.state.searchQuery,
  set: value => store.commit('updateSearchQuery', value)
});

const sortOption = computed({
  get: () => store.state.sortOption,
  set: value => store.commit('updateSortOption', value)
});

const currentPage = computed(() => store.state.currentPage);
const totalPages = computed(() => store.getters.totalPages);

const setPage = page => {
  store.commit('updatePage', page);
};
</script>

<template>
  <div class="d-flex justify-content-between align-items-center mb-3">
    <input
      v-model="searchQuery"
      class="form-control w-25"
      placeholder="Search products..."
    />

    <select v-model="sortOption" class="form-select w-25">
      <option value="">Sort By</option>
      <option value="price-low">Price: Low to High</option>
      <option value="price-high">Price: High to Low</option>
      <option value="name">Name</option>
    </select>
  </div>

  <!-- Pagination -->
  <div class="pagination d-flex justify-content-center mt-3">
    <button class="btn btn-outline-primary me-2" :disabled="currentPage === 1" @click="setPage(currentPage - 1)">
      Prev
    </button>
    <span class="mx-2">Page {{ currentPage }} of {{ totalPages }}</span>
    <button class="btn btn-outline-primary ms-2" :disabled="currentPage === totalPages" @click="setPage(currentPage + 1)">
      Next
    </button>
  </div>
</template>
