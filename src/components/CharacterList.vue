<template>
  <div class="container">
    <!-- Filtreleme Alanı -->
    <FilterBar :filters="filters" :applyFilters="applyFilters" />

    <!-- Karakter Grid Alanı -->
    <CharacterGrid :characters="characters" :openModal="openModal" />

    <!-- Pagination -->
    <Pagination 
      :currentPage="currentPage" 
      :totalPages="pageInfo.pages" 
      :changePage="changePage" 
      :getPageNumbers="getPageNumbers" 
    />

    <!-- Modal Bileşeni -->
    <CharacterModal
      :character="selectedCharacter"
      :isOpen="isModalOpen"
      @close="isModalOpen = false"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import FilterBar from './FilterBar.vue';
import CharacterGrid from './CharacterGrid.vue';
import Pagination from './Pagination.vue';
import CharacterModal from './CharacterModal.vue';

export default {
  name: 'CharacterList',
  components: {
    FilterBar,
    CharacterGrid,
    Pagination,
    CharacterModal,
  },
  setup() {
    const characters = ref([]);
    const pageInfo = ref({ pages: 1, next: null, prev: null });
    const currentPage = ref(1);
    const filters = ref({ name: '', status: '', species: '', gender: '' });
    const isModalOpen = ref(false);
    const selectedCharacter = ref(null);

    // API'den karakterleri çekme fonksiyonu
    const fetchCharacters = async (page = 1) => {
      try {
        let url = `https://rickandmortyapi.com/api/character?page=${page}`;
        let query = '';

        if (filters.value.name) query += `&name=${filters.value.name}`;
        if (filters.value.status) query += `&status=${filters.value.status}`;
        if (filters.value.species) query += `&species=${filters.value.species}`;
        if (filters.value.gender) query += `&gender=${filters.value.gender}`;

        if (query) url += query;

        const response = await axios.get(url);
        characters.value = response.data.results;
        pageInfo.value = response.data.info;
        currentPage.value = page; // Geçerli sayfa bilgisini güncelle
      } catch (error) {
        alert("Character not found.")
      }
    };

    // Filtreleri uygulama fonksiyonu
    const applyFilters = () => {
      fetchCharacters(1); // Filtre uygulandığında 1. sayfaya dön
    };

    // Sayfa numarası değiştiğinde sayfayı güncelleme fonksiyonu
    const changePage = (page) => {
      if (page >= 1 && page <= pageInfo.value.pages) {
        fetchCharacters(page);
      }
    };

    // Gösterilecek sayfa numaralarını belirleme
    const getPageNumbers = () => {
      const total = pageInfo.value.pages;
      const current = currentPage.value;
      const range = 5;

      let start = Math.max(1, current - range);
      let end = Math.min(total, current + range);

      return Array.from({ length: end - start + 1 }, (_, i) => i + start);
    };

    const openModal = (character) => {
      selectedCharacter.value = character;
      isModalOpen.value = true;
    };

    onMounted(() => {
      fetchCharacters();
    });

    return {
      characters,
      pageInfo,
      currentPage,
      filters,
      fetchCharacters,
      getPageNumbers,
      isModalOpen,
      selectedCharacter,
      openModal,
      applyFilters,
      changePage,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 20px 20px; /* Header altında boşluk */
  text-align: center;
  background-color: #2c2c2c;
  color: #fff;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .container {
    padding: 100px 20px 20px; /* Header altında boşluk */
  }
}

@media (max-width: 900px) {
  .container {
    padding: 100px 20px 20px; /* Header altında boşluk */
  }
}

@media (max-width: 600px) {
  .container {
    padding: 100px ; /* Header altında boşluk */
  }
}
</style>
