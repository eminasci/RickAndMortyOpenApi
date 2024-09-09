<template>
    <div class="pagination">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
        Previous
      </button>
      <div class="spaceButton"></div>
      <div class="page-numbers">
        <button
          v-for="page in getPageNumbers()"
          :key="page"
          @click="changePage(page)"
          :class="{ active: page === currentPage }"
        >
          {{ page }}
        </button>
      </div>
      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
      <div class="spaceButton"></div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      currentPage: Number,
      totalPages: Number,
      changePage: Function,
      getPageNumbers: Function,
    },
  };
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    flex-wrap: wrap; /* Sayfa numaralarının taşmasını önler */
    justify-content: center;
    align-items: center;
    margin: 10px 0;
  }
  
  .pagination button {
    background-color: #00ff00;
    border: none;
    color: #1b1b1b;
    padding: 10px 25px;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1em;
    transition: background-color 0.3s;
  }
  
  .pagination button:hover:not(:disabled) {
    background-color: #00cc00;
  }
  
  .pagination button:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
  
  .page-numbers {
    display: flex;
    flex-wrap: wrap; /* Sayfa numaralarının taşmasını önler */
    gap: 5px;
    justify-content: center;
  }
  
  .page-numbers button {
    background-color: #1b1b1b;
    color: #f0f0f0;
    padding: 8px 12px;
  }
  
  .page-numbers button.active {
    background-color: #00ff00;
    color: #1b1b1b;
  }
  
  .pagination span {
    font-size: 1.1em;
    color: #fff;
    margin: 10px 10px;
  }
  
  .spaceButton {
    padding: 40px 0px;
  }
  </style>
  