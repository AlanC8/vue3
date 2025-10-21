<script setup lang="ts">
import Sidebar from '../components/sidebar/Sidebar.vue';
</script>

<template>
  <div class="flex h-screen bg-background text-foreground">
    <Sidebar />

    <main class="flex-1 p-8 overflow-y-auto">
      <router-view />
    </main>
  </div>
</template>