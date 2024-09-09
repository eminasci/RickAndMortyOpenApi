<template>
  <div v-if="isOpen" class="modal-backdrop" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="close-button" @click="closeModal">✖</button>
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
  watch: {
    isOpen(newVal) {
      document.body.style.overflow = newVal ? 'hidden' : 'auto';
    }
  },
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
  background-color: #1e1e1e; /* Koyu arka plan rengi */
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  max-width: 50%; /* Küçük ekranlarda daha iyi görüntülenmesi için genişliği ayarladık */
  max-height: 80vh; /* Yükseklik ekranın %90'ını geçmesin */
  width: 50%;
  overflow: auto; /* Taşma olursa kaydırma özelliği ekle */
  position: relative;
  color: #fff; /* Beyaz metin rengi */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5); /* Gölge efekti */
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out; /* Animasyon */
}

.modal-content.fade-enter-active, .modal-content.fade-leave-active {
  opacity: 1;
}

.modal-content.fade-enter, .modal-content.fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: scale(0.95);
}

.modal-image {
  width: 50%;
  max-height: 250px; /* Resim daha küçük olsun */
  border-radius: 10px;
  border-bottom: 5px solid #00ff00; /* Alt kısımda yeşil bir çizgi */
  margin-bottom: 20px;
  object-fit: none; /* Görselin boyutlarına uygun şekilde sığdır */
}

h2 {
  color: #00ff00; /* Karakter ismi yeşil */
  margin-bottom: 20px;
  font-size: 2em; /* Başlık daha büyük ve dikkat çekici */
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
  background: #ff0000; /* Kırmızı arka plan */
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5em;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease; /* Animasyon */
}

.close-button:hover {
  background-color: #cc0000; /* Hover efekti */
  transform: scale(1.1); /* Büyüme efekti */
}


 



@media (max-width: 600px) {
  .modal-content {
    max-width: 95%; /* Mobilde biraz daha dar yapalım */
    padding: 15px;
  }

  .modal-image {
    max-height: 250px; /* Resim daha küçük olsun */
  }

  h2 {
    font-size: 1.5em; /* Mobilde yazılar daha küçük */
  }

  p {
    font-size: 1em;
  }

  .close-button {
    width: 35px;
    height: 35px;
    font-size: 1.2em;
  }
}
</style>
