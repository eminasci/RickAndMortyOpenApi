<template>
  <div class="filter-bar">
    <div class="search-container">
      <input v-model="filters.name" type="text" placeholder="Search by name" @input="updateSuggestions" />
      <ul v-if="suggestions.length" class="suggestions-list">
        <li v-for="suggestion in suggestions" :key="suggestion" @click="selectSuggestion(suggestion)">
          {{ suggestion }}
        </li>
      </ul>
    </div>
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
</template>

<script>
import axios from 'axios';
import { warn } from 'vue';

export default {
  props: {
    filters: Object,
    applyFilters: Function,
  },
  data() {
    return {
      suggestions: [],
      allNames: []
    };
  },
  methods: {
    async fetchNames(query) {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/character', {
          params: { name: query }
        });
        this.allNames = response.data.results.map(character => character.name);
      } catch (error) {
        
      }
    },
    updateSuggestions() {
      const query = this.filters.name.toLowerCase();
      if (query.length > 0) {
        this.fetchNames(query).then(() => {
          this.suggestions = this.allNames.filter(name =>
            name.toLowerCase().includes(query)
          );
        });
      } else {
        this.suggestions = [];
      }
    },
    selectSuggestion(suggestion) {
      this.filters.name = suggestion;
      this.suggestions = [];
    }
  }
};
</script>

<style scoped>
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
  padding: 10px;
  background: #333;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.search-container {
  position: relative;
}

.search-container input {
  padding: 12px;
  font-size: 1em;
  border: 1px solid #444;
  border-radius: 5px;
  background: #222;
  color: #fff;
  transition: background-color 0.3s, border-color 0.3s;
}

.search-container input::placeholder {
  color: #888;
}

.search-container input:focus {
  background-color: #333;
  border-color: #00ff00;
  outline: none;
}

.suggestions-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #222;
  border: 1px solid #444;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
}

.suggestions-list li {
  padding: 10px;
  cursor: pointer;
  color: #fff;
}

.suggestions-list li:hover {
  background: #00ff00;
  color: #1b1b1b;
}

.filter-bar select {
  padding: 12px;
  font-size: 1em;
  border: 1px solid #444;
  border-radius: 5px;
  background: #222;
  color: #fff;
  transition: background-color 0.3s, border-color 0.3s;
}

.filter-bar button {
  padding: 12px 25px;
  background-color: #00ff00;
  border: none;
  color: #1b1b1b;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1em;
  transition: background-color 0.3s, transform 0.2s;
}

.filter-bar button:hover {
  background-color: #00cc00;
  transform: scale(1.05);
}

@media (max-width: 600px) {
  .filter-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-bar input,
  .filter-bar select,
  .filter-bar button {
    width: 100%;
    box-sizing: border-box;
  }

  .filter-bar button {
    margin-top: 10px;
  }
}
</style>
