import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import FeedbackWithKey from '@/views/FeedbackWithKey.vue';
import FeedbackWithoutKey from '@/views/FeedbackWithoutKey.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/feedback/:key',
      name: 'feedback-with-key',
      component: FeedbackWithKey,
    },
    {
      path: '/feedback',
      name: 'feedback-without-key',
      component: FeedbackWithoutKey,
    },
  ],
});
