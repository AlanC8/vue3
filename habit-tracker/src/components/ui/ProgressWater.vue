<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  percentage: {
    type: Number,
    required: true,
    default: 0,
  },
});

const waterStyle = computed(() => ({
  height: `${props.percentage}%`,
}));
</script>

<template>
  <div class="bg-card border border-border rounded-xl h-24 p-2 flex flex-col-reverse relative overflow-hidden">
    <div 
      class="bg-primary/50 rounded-md transition-all duration-700 ease-out" 
      :style="waterStyle"
    ></div>
    <span class="absolute inset-0 flex items-center justify-center text-2xl font-bold text-foreground">
      {{ percentage }}%
    </span>
  </div>
</template>