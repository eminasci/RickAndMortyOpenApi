<template>
  <header class="header">
    <div class="header-container">
      <a href="#" @click="reloadPage"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg"
          alt="Rick and Morty Logo" class="logo"></a>
      <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle navigation">
        <span class="menu-icon"></span>
        <span class="menu-icon"></span>
        <span class="menu-icon"></span>
      </button>
      <nav class="nav" :class="{ 'nav-open': isMenuOpen }">
        <ul>
          
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/characters">Characters</router-link></li>
          <li><router-link to="/episodes">Episodes</router-link></li>
          <li><router-link to="/about">About</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
  <RouterView></RouterView>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isMenuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    reloadPage() {
      if (this.$route.path === '/home') {
      window.location.reload();
    } else {
      this.$router.push('/home');
    }
    }
  }
};
</script>

<style scoped>
/* Genel Header stil ayarları */
.header {
  background-color: #1b1b1b;
  /* Siyah arka plan */
  padding: 20px 0;
  position: relative;
  /* Sabit pozisyon yok */
  width: 100%;
  /* Tam genişlik */
  top: 0;
  left: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  /* Gölge efekti */
  z-index: 1000;
  /* Diğer içeriklerin üstünde kalmasını sağlar */
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: top 0.3s;
  /* Header kaydırma efektini ayarlar */
}

/* İçerik hizalama */
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  /* Maksimum genişlik */
  margin: 0 auto;
  /* Ortalanmış */
  padding: 0 20px;
  /* Yatay boşluk */
  width: 100%;
}

/* Logo stili */
.logo {
  height: 60px;
  filter: drop-shadow(0 0 10px #00ff00);
  /* Neon yeşil parıltı */
}

/* Menü butonu */
.menu-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1001;
}

/* Menü ikonları */
.menu-icon {
  background: #fff;
  height: 3px;
  width: 25px;
  margin: 3px 0;
  border-radius: 3px;
}

/* Navigasyon menüsü */
.nav {
  display: flex;
}

.nav ul {
  display: flex;
  list-style: none;
  /* Noktaları kaldırır */
  margin: 0;
  padding: 0;
}

.nav ul li {
  margin-left: 20px;
  /* Her bir menü öğesi arasındaki boşluk */
}

.nav ul li a {
  color: #fff;
  /* Beyaz metin */
  font-size: 1.2em;
  /* Yazı boyutu */
  text-decoration: none;
  /* Alt çizgi yok */
  padding: 10px 15px;
  /* Yatay ve dikey boşluk */
  border-radius: 5px;
  /* Köşe yuvarlatma */
  transition: background-color 0.3s, transform 0.3s;
  /* Geçiş efektleri */
  font-family: 'Roboto', sans-serif;
  /* Yazı tipi */
  letter-spacing: 1.5px;
  /* Harf aralığı */
  text-transform: uppercase;
  /* Büyük harf */
}

.nav ul li a:hover {
  background-color: #00ff00;
  /* Hover durumunda arka plan rengi */
  color: #1b1b1b;
  /* Hover durumunda metin rengi */
  transform: scale(1.1);
  /* Hover durumunda büyütme efekti */
}

.nav ul li a:active {
  transform: scale(0.9);
  /* Tıklama durumunda küçültme efekti */
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .menu-toggle {
    display: flex;
  }

  .nav {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #1b1b1b;
    transition: max-height 0.3s ease;
    overflow: hidden;
    max-height: 0;
  }

  .nav.nav-open {
    max-height: 300px;
    /* Menü yüksekliğini ayarla */
  }

  .nav ul {
    flex-direction: column;
    width: 100%;
    margin: 0;
  }

  .nav ul li {
    margin: 10px 0;
  }

  .nav ul li a {
    padding: 10px;
    width: 100%;
    text-align: center;
  }
}
</style>
