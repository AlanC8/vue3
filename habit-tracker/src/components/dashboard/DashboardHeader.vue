<script setup lang="ts">
defineProps<{
  user: { name: string },
  streak: number
}>();
</script>

<template>
  <div class="bg-card border border-border rounded-xl p-6 flex justify-between items-center">
    <div>
      <h2 class="text-3xl font-bold">{{ user.name }}</h2>
      <p class="text-muted-foreground">Keep going!</p>
    </div>
    <div class="text-right">
      <p class="text-muted-foreground">Streak 🔥</p>
      <p class="text-4xl font-bold text-primary">{{ streak }}</p>
    </div>
  </div>
</template>