// src/composables/useDashboard.ts

import { ref, computed, onMounted } from 'vue';
import { format, startOfToday, isFuture, isSameDay, parseISO } from 'date-fns';

// --- ИНТЕРФЕЙСЫ ---
export interface Habit {
  id: number;
  name: string;
  description: string;
  time: string;
  completed: boolean;
  date: string; // Храним дату как строку 'YYYY-MM-DD' для удобства
}

export interface DayData {
  date: Date;
  dayLabel: string;
  habits: Habit[];
  isFuture: boolean;
}

const STORAGE_KEY = 'my-habits-app'; // Ключ для хранения в localStorage

// --- ГЛАВНАЯ COMPOSABLE ФУНКЦИЯ ---
export function useDashboard() {
  
  // --- РЕАКТИВНОЕ СОСТОЯНИЕ ---
  const habits = ref<Habit[]>([]); // Основной массив для всех привычек
  const userData = ref({ name: 'ALAN' });
  const today = startOfToday();

  // --- ЛОГИКА РАБОТЫ С LOCALSTORAGE (CRUD) ---

  // 1. ПОЛУЧЕНИЕ (Read)
  function loadHabits() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      habits.value = JSON.parse(savedData);
    } else {
      initializeDemoData();
    }
  }

  // Вспомогательная функция для сохранения
  function saveHabits() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits.value));
  }
  
  // 2. ОБНОВЛЕНИЕ (Update)
  function toggleHabitStatus(habitId: number) {
    const habit = habits.value.find(h => h.id === habitId);
    if (!habit) return;
    
    if (isFuture(parseISO(habit.date))) {
      console.warn("Cannot modify future habits");
      return;
    }

    habit.completed = !habit.completed;
    saveHabits();
  }

  // 3. ДОБАВЛЕНИЕ (Create)
  function addHabit(newHabitData: Omit<Habit, 'id' | 'completed'>) {
    const newHabit: Habit = {
      ...newHabitData,
      id: Date.now(),
      completed: false
    };
    habits.value.push(newHabit);
    saveHabits();
  }

  // 4. УДАЛЕНИЕ (Delete)
  function deleteHabit(habitId: number) {
    habits.value = habits.value.filter(h => h.id !== habitId);
    saveHabits();
  }
  
  // Вызываем загрузку данных один раз при первом использовании
  onMounted(loadHabits);

  // --- COMPUTED СВОЙСТВА ---

  // Для DashboardView: генерируем 5 дней и фильтруем для них привычки
  const dailyHabits = computed<DayData[]>(() => {
    const result: DayData[] = [];
    for (let i = -2; i <= 2; i++) {
      const date = new Date(today.getTime());
      date.setDate(today.getDate() + i);
      const dateString = format(date, 'yyyy-MM-dd');
      
      result.push({
        date: date,
        dayLabel: format(date, 'eee').toUpperCase(),
        habits: habits.value.filter(h => h.date === dateString).sort((a, b) => a.time.localeCompare(b.time)),
        isFuture: isFuture(date),
      });
    }
    return result;
  });

  // Для DashboardView: вычисляем прогресс для каждого из 5 дней
  const overviewProgressData = computed(() => {
    return dailyHabits.value.map(day => {
      if (day.habits.length === 0) return 0;
      const completedCount = day.habits.filter(h => h.completed).length;
      return Math.round((completedCount / day.habits.length) * 100);
    });
  });

  // Для DashboardView: вычисляем стрик
  const streak = computed(() => {
    let currentStreak = 0;
    const todayDataIndex = dailyHabits.value.findIndex(d => isSameDay(d.date, today));
    for (let i = todayDataIndex; i >= 0; i--) {
      const day = dailyHabits.value[i];
      if (day.habits.length > 0 && day.habits.every(h => h.completed)) {
        currentStreak++;
      } else {
        break;
      }
    }
    return currentStreak;
  });

  // Для TodayView: получаем привычки только на сегодня
  const todayHabits = computed(() => {
    const todayString = format(today, 'yyyy-MM-dd');
    return habits.value.filter(h => h.date === todayString);
  });
  
  // Для TodayView: считаем прогресс на сегодня
  const todayProgress = computed(() => {
    const total = todayHabits.value.length;
    if (total === 0) return { completed: 0, total: 0 };
    const completed = todayHabits.value.filter(h => h.completed).length;
    return { completed, total };
  });

  // Для DayView: функция для поиска дня по строке даты
  const getDayByDateString = (dateString: string) => {
    return dailyHabits.value.find(day => format(day.date, 'yyyy-MM-dd') === dateString);
  };

  // --- Функция для создания демо-данных, если localStorage пуст ---
  function initializeDemoData() {
    const demoHabits: Habit[] = [];
    for (let i = -2; i <= 2; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dateString = format(date, 'yyyy-MM-dd');
      
      demoHabits.push({
        id: Date.now() + Math.random(), name: 'Morning Workout', description: 'Full body routine', time: '08:00', completed: i < 0, date: dateString
      });
      demoHabits.push({
        id: Date.now() + Math.random(), name: 'Work on Vue Project', description: 'Focus on routing', time: '10:00', completed: i < 0, date: dateString
      });
    }
    habits.value = demoHabits;
    saveHabits();
  }
  
  // --- ВОЗВРАЩАЕМ ВСЕ НЕОБХОДИМЫЕ ДАННЫЕ И ФУНКЦИИ ---
  return {
    // Общие данные и CRUD
    habits,
    userData,
    toggleHabitStatus,
    addHabit,
    deleteHabit,
    
    // Для DashboardView (/)
    dailyHabits,
    overviewProgressData,
    streak,

    // Для TodayView (/today)
    todayHabits,
    todayProgress,

    // Для DayView (/day/:date)
    getDayByDateString,
  };
}