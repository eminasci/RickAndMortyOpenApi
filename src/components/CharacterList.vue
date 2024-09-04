<template>
    <div class="container">
      <h1 class="title">Character List</h1>
      <div class="character-grid">
        <div v-for="character in characters" :key="character.id" class="character-card">
          <img :src="character.image" :alt="character.name" class="character-image" />
          <div class="character-details">
            <h2>{{ character.name }}</h2>
            <p><strong>Status:</strong> {{ character.status }}</p>
            <p><strong>Species:</strong> {{ character.species }}</p>
            <p><strong>Gender:</strong> {{ character.gender }}</p>
            <p><strong>Origin:</strong> {{ character.origin.name }}</p>
            <p><strong>Location:</strong> {{ character.location.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    name: 'CharacterList',
    setup() {
      const characters = ref([]);
  
      const fetchCharacters = async () => {
        try {
          const response = await axios.get('https://rickandmortyapi.com/api/character');
          characters.value = response.data.results;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      onMounted(fetchCharacters);
  
      return {
        characters
      };
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    background-color: #1b1b1b; /*Siyah arka plan */
    color: #fff; /* Beyaz metin */
  }
  
  .title {
    font-size: 2.5em;
    margin-bottom: 20px;
    color: #00ff00; /* Neon yeşil başlık */
  }
  
  .character-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .character-card {
    background-color: #2c2c2c; /* Koyu gri arka plan */
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }
  
  .character-card:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
  }
  
  .character-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-bottom: 4px solid #ff00ff; /* Neon mor alt çizgi */
  }
  
  .character-details {
    padding: 15px;
    text-align: left;
    background-color: #1f1f1f; /* Daha koyu arka plan */
  }
  
  .character-details h2 {
    margin-bottom: 10px;
    font-size: 1.5em;
    color: #00ff00; /* Neon yeşil karakter ismi */
  }
  
  .character-details p {
    margin: 5px 0;
    font-size: 1em;
    color: #f0f0f0; /* Açık gri metin */
  }
  
  .character-details p strong {
    color: #ff00ff; /* Neon mor vurgu */
  }
  </style>
  