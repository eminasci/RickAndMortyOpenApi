<script setup>
import { RouterLink, RouterView } from 'vue-router';
import CharacterList from './components/CharacterList.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div id="app">
    <Header />
    
 
    <main class="content">
     
      
 
      <CharacterList />
    
      
    </main>
    <Footer />
  
    
  </div>
</template>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Tüm ekranı kapla */
}

.content {
  flex: 1; /* İçerik esneklik gösterir */
  padding-top: 20px; /* Header'ın yüksekliği kadar padding ver */
}



</style>