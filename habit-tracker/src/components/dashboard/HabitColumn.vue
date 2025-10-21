<script setup lang="ts">
import { computed } from 'vue';
import { format } from 'date-fns';
import HabitItem from './HabitItem.vue';
import type { DayData } from '../../composables/useDashboard';

const props = defineProps<{
  dayData: DayData
}>();

const emit = defineEmits(['toggleHabitStatus']);

function handleToggle(habitId: number) {
  emit('toggleHabitStatus', habitId, props.dayData.date);
}

const dayUrl = computed(() => {
  return `/day/${format(props.dayData.date, 'yyyy-MM-dd')}`;
});
</script>

<template>
  <div class="bg-card border border-border rounded-xl p-4 flex flex-col gap-3">
    <router-link :to="dayUrl" class="text-left underline font-bold text-muted-foreground mb-2 hover:text-primary transition-colors">
      <h3>{{ dayData.dayLabel }}</h3>
    </router-link>

    <HabitItem 
      v-for="habit in dayData.habits" 
      :key="habit.id" 
      :habit="habit"
      :is-future="dayData.isFuture"
      @toggleStatus="handleToggle" 
    />
  </div>
</template>