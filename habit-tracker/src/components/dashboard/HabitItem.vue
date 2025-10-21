<script setup lang="ts">
import { computed } from 'vue';
import type { Habit } from '../../composables/useDashboard';

const props = defineProps<{
  habit: Habit,
  isFuture: boolean
}>();

const emit = defineEmits(['toggleStatus']);

const itemClasses = computed(() => [
  'flex items-center justify-between p-4 rounded-sm border transition-all duration-300',
  props.isFuture 
    ? 'cursor-not-allowed opacity-50 bg-background/50'
    : 'cursor-pointer transform hover:border-primary',
  !props.isFuture && (props.habit.completed
    ? 'bg-primary/10 border-primary'
    : 'bg-card border-border'),
]);
</script>

<template>
  <div :class="itemClasses" @click="emit('toggleStatus', habit.id)">
    <div class="flex items-center gap-4">
      <div 
        class="w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors"
        :class="habit.completed ? 'bg-primary border-primary' : 'border-muted-foreground/50'"
      >
        <svg v-if="habit.completed" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-primary-foreground">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <div>
        <p 
          class="font-semibold text-foreground transition-colors"
          :class="{ 'line-through text-muted-foreground': habit.completed }"
        >
          {{ habit.name }}
        </p>
        <p class="text-sm text-muted-foreground">{{ habit.description }}</p>
      </div>
    </div>
    <div class="font-mono text-sm text-muted-foreground">
      {{ habit.time }}
    </div>
  </div>
</template>