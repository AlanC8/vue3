<script setup lang="ts">
import { startOfToday } from 'date-fns';
import { useDashboard } from '../composables/useDashboard';
import HabitItem from '../components/dashboard/HabitItem.vue';

const { todayHabits, todayProgress, toggleHabitStatus } = useDashboard();
const today = startOfToday();
</script>

<template>
  <div class="flex flex-col h-full">
    <header class="flex justify-between items-baseline mb-8">
      <h1 class="text-4xl font-bold">Today</h1>
      <p class="text-2xl font-mono text-muted-foreground">
        <span class="text-foreground font-bold">{{ todayProgress.completed }}</span>
        /
        <span>{{ todayProgress.total }}</span>
      </p>
    </header>

    <div class="space-y-4">
      <HabitItem
        v-for="habit in todayHabits"
        :key="habit.id"
        :habit="habit"
        :is-future="false"
        @toggleStatus="toggleHabitStatus($event, today)"
      />
    </div>
  </div>
</template>