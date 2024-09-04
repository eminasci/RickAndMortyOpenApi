<script setup>
import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios';
import CharacterList from './components/CharacterList.vue';

</script>
<template>
   <div id="app">
   <CharacterList />
  </div>
</template>
<script>
import CharacterList from './components/CharacterList.vue';

export default {
  name: 'App',
  components: {
    CharacterList
  }
};
</script>

<style>
/* Global stiller buraya eklenebilir */
</style>

