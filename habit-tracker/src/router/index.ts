import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import DashboardView from '../views/DashboardView.vue';
import TodayView from '@/views/TodayView.vue';
import DayView from '@/views/DayView.vue';
import ManageHabitsView from '@/views/ManageHabitsView.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: DashboardView,
      },
      {
        path: '/today',
        name: 'Today',
        component: TodayView,
      },
      {
        path: '/day/:date', 
        name: 'DayView',
        component: DayView,
      },
      {
        path: '/manage',
        name: 'ManageHabits',
        component: ManageHabitsView,
      },
      // { path: 'settings', component: SettingsView },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;