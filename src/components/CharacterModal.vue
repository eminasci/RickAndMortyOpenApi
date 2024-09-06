<template>
    <div v-if="isOpen" class="modal-backdrop" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-button" @click="closeModal">X</button>
        <img :src="character.image" :alt="character.name" class="modal-image" />
        <h2>{{ character.name }}</h2>
        <p><strong>Status:</strong> {{ character.status }}</p>
        <p><strong>Species:</strong> {{ character.species }}</p>
        <p><strong>Gender:</strong> {{ character.gender }}</p>
        <p><strong>Origin:</strong> {{ character.origin.name }}</p>
        <p><strong>Location:</strong> {{ character.location.name }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['character', 'isOpen'],
    methods: {
      closeModal() {
        this.$emit('close');
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8); /* Daha koyu bir arka plan */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: #1e1e1e; /* Uygun bir koyu arka plan rengi */
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    max-width: 90%; /* Küçük ekranlarda daha iyi görüntülenmesi için genişliği ayarladık */
    max-height: 90vh; /* Yükseklik ekranın %90'ını geçmesin */
    width: 100%;
    overflow-y: auto; /* Taşma olursa kaydırma özelliği ekle */
    position: relative;
    color: #fff; /* Beyaz metin rengi */
  }
  
  .modal-image {
    width: 100%;
    border-bottom: 4px solid #00ff00; /* Alt kısımda yeşil bir çizgi */
    margin-bottom: 20px;
    max-height: 300px; /* Resmin aşırı büyümemesini sağlıyoruz */
    object-fit: none; /* Görselin boyutlarına uygun şekilde sığdır */
  }
  
  h2 {
    color: #00ff00; /* Karakter ismi yeşil */
    margin-bottom: 20px;
  }
  
  p {
    margin: 10px 0;
    font-size: 1.1em;
    color: #f0f0f0;
  }
  
  strong {
    color: #ff00ff; /* Kalın yazılar mor */
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
    color: #ff0000; /* Kırmızı X butonu */
  }
  
  @media (max-width: 600px) {
    .modal-content {
      max-width: 95%; /* Mobilde biraz daha dar yapalım */
      padding: 10px;
    }
  
    .modal-image {
      max-height: 200px; /* Resim daha küçük olsun */
    }
  
    h2 {
      font-size: 1.5em; /* Mobilde yazılar daha küçük */
    }
  
    p {
      font-size: 1em;
    }
  }
  </style>
  