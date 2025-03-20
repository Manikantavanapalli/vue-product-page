import { createStore } from 'vuex';

export default createStore({
  state: {
    products: [],
    cart: [],
    searchQuery: '',
    selectedCategory: '',
    sortOption: '', // Sorting state
    currentPage: 1,
    itemsPerPage: 6, // Number of products per page
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    addToCart(state, product) {
      const item = state.cart.find(p => p.id === product.id);
      item ? item.quantity++ : state.cart.push({ ...product, quantity: 1 });
    },
    updateSearchQuery(state, query) {
      state.searchQuery = query;
    },
    updateCategory(state, category) {
      state.selectedCategory = category;
    },
    updateSortOption(state, option) {
      state.sortOption = option;
    },
    updatePage(state, page) {
      state.currentPage = page;
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId);
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      const res = await fetch('https://dummyjson.com/products');
      const data = await res.json();
      commit('setProducts', data.products);
    },
  },
  getters: {
    filteredProducts(state) {
      let products = state.products.filter(product =>
        product.title.toLowerCase().includes(state.searchQuery.toLowerCase()) &&
        (state.selectedCategory ? product.category === state.selectedCategory : true)
      );
  
      // Sorting logic
      if (state.sortOption === 'price-low') {
        products.sort((a, b) => a.price - b.price);
      } else if (state.sortOption === 'price-high') {
        products.sort((a, b) => b.price - a.price);
      } else if (state.sortOption === 'name') {
        products.sort((a, b) => a.title.localeCompare(b.title));
      }
  
      // Calculate total pages based on filtered products (not all products)
      const totalFilteredPages = Math.ceil(products.length / state.itemsPerPage);
      state.totalPages = totalFilteredPages; // Ensure Vuex knows total pages dynamically
  
      // Apply pagination after filtering and sorting
      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = start + state.itemsPerPage;
      return products.slice(start, end);
    },
    totalPages(state) {
      return Math.ceil(
        state.products.filter(product =>
          product.title.toLowerCase().includes(state.searchQuery.toLowerCase())
        ).length / state.itemsPerPage
      );
    }
  }
  
});