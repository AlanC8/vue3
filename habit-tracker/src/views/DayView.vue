<!-- src/views/DayView.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'; // <-- Импортируем ref
import { useRoute } from 'vue-router';
import { format } from 'date-fns';
import { useDashboard, type Habit } from '../composables/useDashboard'; // <-- Импортируем тип Habit
import HabitItem from '../components/dashboard/HabitItem.vue';

const route = useRoute();
const { getDayByDateString, toggleHabitStatus } = useDashboard();

// --- 1. Состояние для поиска ---
const searchQuery = ref('');

const dateString = computed(() => route.params.date as string);
const dayData = computed(() => getDayByDateString(dateString.value));

// --- 2. Фильтрованный список привычек (реактивный) ---
const filteredHabits = computed(() => {
  // Если данных еще нет, возвращаем пустой массив
  if (!dayData.value?.habits) {
    return [];
  }
  
  // Убираем пробелы и приводим к нижнему регистру для поиска без учета регистра
  const query = searchQuery.value.toLowerCase().trim();
  
  // Если поле поиска пустое, показываем все привычки
  if (!query) {
    return dayData.value.habits;
  }
  
  // Фильтруем массив по имени или описанию
  return dayData.value.habits.filter(habit => 
    habit.name.toLowerCase().includes(query) ||
    habit.description.toLowerCase().includes(query)
  );
});

const dayProgress = computed(() => {
    // Используем отфильтрованный список для подсчета прогресса
    const habits = filteredHabits.value;
    if (habits.length === 0) return { completed: 0, total: 0 };
    const completed = habits.filter((h: Habit) => h.completed).length; // <-- Используем импортированный тип Habit
    return { completed, total: habits.length };
});

const pageTitle = computed(() => {
    if (!dayData.value) return 'Day not found';
    return format(dayData.value.date, 'EEEE, MMMM d');
});
</script>

<template>
<div v-if="dayData" class="flex flex-col h-full">
    <header class="flex justify-between items-baseline mb-8">
        <h1 class="text-4xl font-bold">{{ pageTitle }}</h1>
        <p class="text-2xl font-mono text-muted-foreground">
            <span class="text-foreground font-bold">{{ dayProgress.completed }}</span>
            /
            <span>{{ dayProgress.total }}</span>
        </p>
    </header>

    <div class="mb-8">
        <input 
            v-model="searchQuery"
            type="text"
            placeholder="Search by name or description..."
            class="w-full p-3 bg-card border border-input rounded-sm focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
        />
    </div>

    <!-- Сообщение, если ничего не найдено -->
    <div v-if="filteredHabits.length === 0" class="text-center text-muted-foreground py-10">
        <p class="text-lg">No habits found.</p>
        <p v-if="searchQuery">Try a different search term.</p>
    </div>

    <!-- 4. Отображаем отфильтрованный список -->
    <div v-else class="space-y-4">
        <HabitItem 
            v-for="habit in filteredHabits" 
            :key="habit.id" 
            :habit="habit" 
            :is-future="dayData.isFuture"
            @toggleStatus="toggleHabitStatus($event, dayData.date)" 
        />
    </div>
</div>
<div v-else class="text-center text-muted-foreground">
    <h1 class="text-2xl">Day not found</h1>
    <router-link to="/" class="text-primary hover:underline">Go back to Dashboard</router-link>
</div>
</template>