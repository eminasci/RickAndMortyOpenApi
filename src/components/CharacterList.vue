<template>
  <div class="container">
    <!-- Filtreleme Alanı -->
    <div class="filter-bar">
      <input v-model="filters.name" type="text" placeholder="Search by name" />
      <select v-model="filters.status">
        <option value="">Any status</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <select v-model="filters.species">
        <option value="">Any species</option>
        <option value="Human">Human</option>
        <option value="Alien">Alien</option>
        <!-- Diğer türler eklenebilir -->
      </select>
      <select v-model="filters.gender">
        <option value="">Any gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>
      <button @click="applyFilters">Apply Filters</button>
    </div>

    <!-- Karakter Grid Alanı -->
    <div class="character-grid">
      <div
        v-for="character in characters"
        :key="character.id"
        class="character-card"
        @click="openModal(character)"
      >
        <img
          :src="character.image"
          :alt="character.name"
          class="character-image"
        />
        <div class="character-details">
          <h2>{{ character.name }}</h2>
          <p class="character-status">
            <strong>Status:</strong>
            <span class="status-text">
              <span :class="`status-${character.status.toLowerCase()}`"></span>{{ character.status }}
            </span>
          </p>
          <p><strong>Species:</strong> {{ character.species }}</p>
          <p><strong>Gender:</strong> {{ character.gender }}</p>
          <p><strong>Origin:</strong> {{ character.origin.name }}</p>
          <p><strong>Location:</strong> {{ character.location.name }}</p>
        </div>
      </div>
    </div>

    <!-- Pagination -->
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
        :disabled="currentPage === pageInfo.pages"
      >
        Next
      </button>
      <div class="spaceButton"></div>
    </div>

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
import CharacterModal from './CharacterModal.vue';

export default {
  name: 'CharacterList',
  components: {
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
        console.error('Error fetching data:', error);
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

.character-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(250px, 1fr));
  gap: 20px;
}

.character-card {
  background-color: #2c2c2c;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  border: 4px solid transparent;
  border-image: linear-gradient(45deg, #4b4b4b, #b0b0b0);
  border-image-slice: 1;
}

.character-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
}

.character-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-bottom: 4px solid #a12fa1;
}

.character-details {
  padding: 20px;
  text-align: left;
  background-color: #2c2c2c;
}

.character-details h2 {
  margin-bottom: 15px;
  font-size: 1.75em;
  color: #00ff00;
  font-weight: bold;
  text-align: center;
}

.character-details p {
  margin: 10px 0;
  font-size: 1.1em;
  color: #f0f0f0;
}

.character-details p strong {
  color: #ff00ff;
}

.character-status {
  display: flex;
  align-items: center;
  font-size: 1.1em;
}

.character-status span {
  margin-right: 8px;
}

.character-status .status-text {
  margin-left: 8px;
}

.status-alive {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #00ff00;
}

.status-dead {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ff0000;
}

.status-unknown {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #808080;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .character-grid {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
  }
  .container {
 
 padding: 100px 20px 20px; /* Header altında boşluk */
 
}
}

@media (max-width: 900px) {
  .character-grid {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
  .container {
 
 padding: 100px 20px 20px; /* Header altında boşluk */
 
}
}

@media (max-width: 600px) {
  .character-grid {
    grid-template-columns: 1fr;
  }
  .container {
 
  padding: 100px ; /* Header altında boşluk */
  
}
}

.pagination button {
    padding: 10px 10px;
    font-size: 0.9em;
  }

  .page-numbers button {
    padding: 6px 8px;
    font-size: 0.9em;
  }


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
.spaceButton{
  padding: 40px 0px;
}
.filter-bar {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.filter-bar input,
.filter-bar select {
  padding: 10px;
  font-size: 1em;
}

.filter-bar button {
  padding: 10px 20px;
  background-color: #00ff00;
  border: none;
  color: #1b1b1b;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.filter-bar button:hover {
  background-color: #00cc00;
}
</style>
