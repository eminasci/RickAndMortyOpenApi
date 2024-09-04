<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>
<template>
  <div>
    <h1>Character List</h1>
    <h2></h2>

    <ul>
      <li v-for="character in characters" :key="character.id">
        <img :src="character.image" :alt="character.name" />
        <h2>{{ character.name }}</h2>
        <p>Status: {{ character.status }}</p>
        <p>Species: {{ character.species }}</p>
        <p>Gender: {{ character.gender }}</p>
        <p>Origin: {{ character.origin.name }}</p>
        <p>Location: {{ character.location.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'CharacterList',
  setup() {
    const characters = ref([]);

    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character'); // Gerçek API URL'si ile değiştir
        const data = await response.json();
        characters.value = data.results; // `results` dizisini alıyoruz
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
img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}

h2 {
  margin: 10px 0 5px;
}

p {
  margin: 0;
}
</style>
