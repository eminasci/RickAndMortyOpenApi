<template>
  <div class="about-container">
    <h1>About Page</h1>
    <p>
      This project was developed using the Rick and Morty Open API. The project provides features such as filtering, pagination and detailed information about characters in the Rick and Morty universe. The filtering system works dynamically with Vue.js according to the data coming from the API. The page is designed as fully responsive.
    </p>
    <p class="developer-info">
      Developed by: <strong>Emin Aşcı</strong>
      <a href="https://github.com/eminasci" target="_blank">
        <img src="https://img.icons8.com/?size=50&id=12599&format=png" alt="GitHub" class="github-icon" />
      </a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'AboutPageView'
};
</script>

<style scoped>
.about-container {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  color: #333;
}

h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

p {
  font-size: 1.2rem;
  color: #555;
  line-height: 1.6;
}

.developer-info {
  font-size: 1.5rem;
  margin-top: 1.5rem;
}

strong {
  font-size: 1.8rem;
}

.github-icon {
  width: 30px;
  height: 30px;
  margin-left: 10px;
  vertical-align: middle;
}
</style>
