import { createRouter, createWebHistory } from 'vue-router';
import MainPageView from '@/views/MainPageView.vue';
import LocationsPageView from '@/views/LocationsPageView.vue';
import EpisodesPageView from '@/views/EpisodesPageView.vue';
import AboutPageView from '@/views/AboutPageView.vue';
import App from '@/App.vue';

const routes = [
  {
    path:'/',
    name:'app',
    component: App,
  },
  {
    path: '/home',
    name: 'Home',
    component: MainPageView,
  },
 
  {
    path: '/about',
    name: 'About',
    component: AboutPageView,
  },
  {
    path: '/locations',
    name: 'Locations',
    component: LocationsPageView,
  },
  {
    path: '/episodes',
    name: 'Episodes',
    component: EpisodesPageView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next('/home');
  } else {
    next();
  }
});

export default router;