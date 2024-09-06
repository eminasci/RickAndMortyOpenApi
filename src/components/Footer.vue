<template>
    <footer class="footer">
      <div class="footer-container">
        <p><strong>Characters Count:</strong> {{ count }}</p>
        <p><strong>Pages:</strong> {{ pages }}</p>
        <a href="https://github.com/eminasci" target="_blank" rel="noopener noreferrer" class="github-link">
        <img src="https://img.icons8.com/?size=50&id=12599&format=png" alt="GitHub Logo" class="github-icon" />
        </a>
      </div>
    </footer>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    name: 'Footer',
    setup() {
      const count = ref(0);
      const pages = ref(0);
  
      const fetchFooterData = async () => {
        try {
          const response = await axios.get('https://rickandmortyapi.com/api/character');
          count.value = response.data.info.count;
          pages.value = response.data.info.pages;
        } catch (error) {
          console.error('Error fetching footer data:', error);
        }
      };
  
      onMounted(fetchFooterData);
  
      return {
        count,
        pages
      };
    }
  };
  </script>
  
  <style scoped>
.footer {
  background-color: #1b1b1b; /* Arka plan rengi */
  padding: 20px;
  text-align: center;
  color: #fff;
  position: relative;
  width: 100%; /* Tam genişlik */
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px; /* Yatay boşluk */
}

.github-link {
  display: flex;
  align-items: center;
}

.github-icon {
  width: 24px;
  height: 24px;
  filter: drop-shadow(0 0 5px #00ff00); /* Neon yeşil parıltı */
}

/* Responsive Design */
@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    align-items: center;
  }

  .footer-container p {
    margin: 10px 0; /* Paragraflar arasında boşluk */
  }

  .github-link {
    margin-top: 10px; /* GitHub linki ile üstteki içerik arasında boşluk */
  }
}
</style>