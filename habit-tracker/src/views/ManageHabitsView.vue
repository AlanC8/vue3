<script setup lang="ts">
import { ref, computed } from 'vue';
import { format } from 'date-fns';
import { useDashboard } from '../composables/useDashboard';

const { habits, addHabit, deleteHabit } = useDashboard();

const newHabit = ref({
  name: '',
  description: '',
  time: '09:00',
  date: format(new Date(), 'yyyy-MM-dd'),
});

function handleAddHabit() {
  if (!newHabit.value.name || !newHabit.value.date) {
    alert('Please fill in a name and date.');
    return;
  }
  addHabit(newHabit.value);
  newHabit.value.name = '';
  newHabit.value.description = '';
}

const groupedHabits = computed(() => {
    return [...habits.value]
      .sort((a, b) => b.date.localeCompare(a.date) || a.time.localeCompare(b.time))
      .reduce((acc, habit) => {
          (acc[habit.date] = acc[habit.date] || []).push(habit);
          return acc;
      }, {} as Record<string, typeof habits.value>);
});
</script>

<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold">Manage Habits</h1>

    <form @submit.prevent="handleAddHabit" class="p-6 bg-card border rounded-lg space-y-4">
      <h2 class="text-xl font-semibold">Add New Habit</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input v-model="newHabit.name" type="text" placeholder="Habit Name (e.g., Workout)" class="p-2 text-gray-500 bg-background border rounded-sm">
        <input v-model="newHabit.description" type="text" placeholder="Description" class="p-2 text-gray-500 bg-background border rounded-sm">
        <input v-model="newHabit.date" type="date" class="p-2 text-gray-500 bg-background border rounded-sm">
        <input v-model="newHabit.time" type="time" class="p-2 text-gray-500 bg-background border rounded-sm">
      </div>
      <button type="submit" class="w-full p-3 font-semibold rounded-lg bg-primary text-primary-foreground">Add Habit</button>
    </form>

    <div class="space-y-6">
        <div v-for="(dayHabits, date) in groupedHabits" :key="date">
            <h3 class="font-bold text-lg mb-2">{{ date }}</h3>
            <div class="space-y-2">
                <div v-for="habit in dayHabits" :key="habit.id" class="flex justify-between items-center p-3 bg-card rounded-md border">
                    <div>
                        <p>{{ habit.name }}</p>
                        <p class="text-sm text-muted-foreground">{{ habit.description }} @ {{ habit.time }}</p>
                    </div>
                    <button @click="deleteHabit(habit.id)" class="px-3 py-1 text-sm rounded-md bg-destructive text-destructive-foreground">Delete</button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>