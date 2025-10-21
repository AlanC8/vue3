<script setup lang="ts">
import DashboardHeader from '../components/dashboard/DashboardHeader.vue';
import HabitColumn from '../components/dashboard/HabitColumn.vue';
import ProgressWater from '../components/ui/ProgressWater.vue';
import { useDashboard } from '../composables/useDashboard';

const { userData, dailyHabits, overviewProgressData, toggleHabitStatus, streak } = useDashboard();
</script>

<template>
  <div class="flex flex-col h-full">
    <DashboardHeader :user="userData" :streak="streak" />

    <div class="grid grid-cols-5 gap-6 mt-8 flex-grow">
      <HabitColumn 
        v-for="dayData in dailyHabits" 
        :key="dayData.date.toISOString()" 
        :day-data="dayData"
        @toggleHabitStatus="toggleHabitStatus"
      />
    </div>

    <div class="grid grid-cols-5 gap-6 mt-8">
      <ProgressWater 
        v-for="(percent, index) in overviewProgressData" 
        :key="index" 
        :percentage="percent" 
      />
    </div>
  </div>
</template>