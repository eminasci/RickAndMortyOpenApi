<template>
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
  </template>
  
  <script>
  export default {
    props: {
      characters: Array,
      openModal: Function,
    },
  };
  </script>
  
  <style scoped>
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
  </style>
  