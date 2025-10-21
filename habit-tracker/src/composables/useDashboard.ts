import { ref, computed, onMounted } from 'vue';
import { format, startOfToday, isFuture, isSameDay, parseISO } from 'date-fns';

export interface Habit {
  id: number;
  name: string;
  description: string;
  time: string;
  completed: boolean;
  date: string; 
}

export interface DayData {
  date: Date;
  dayLabel: string;
  habits: Habit[];
  isFuture: boolean;
}

const STORAGE_KEY = 'my-habits-app'; 

export function useDashboard() {
  
  const habits = ref<Habit[]>([]);
  const userData = ref({ name: 'ALAN' });
  const today = startOfToday();

  function loadHabits() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      habits.value = JSON.parse(savedData);
    } else {
      initializeDemoData();
    }
  }

  function saveHabits() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits.value));
  }
  
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

  function addHabit(newHabitData: Omit<Habit, 'id' | 'completed'>) {
    const newHabit: Habit = {
      ...newHabitData,
      id: Date.now(),
      completed: false
    };
    habits.value.push(newHabit);
    saveHabits();
  }

  function deleteHabit(habitId: number) {
    habits.value = habits.value.filter(h => h.id !== habitId);
    saveHabits();
  }
  
  onMounted(loadHabits);

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

  const overviewProgressData = computed(() => {
    return dailyHabits.value.map(day => {
      if (day.habits.length === 0) return 0;
      const completedCount = day.habits.filter(h => h.completed).length;
      return Math.round((completedCount / day.habits.length) * 100);
    });
  });

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

  const todayHabits = computed(() => {
    const todayString = format(today, 'yyyy-MM-dd');
    return habits.value.filter(h => h.date === todayString);
  });
  
  const todayProgress = computed(() => {
    const total = todayHabits.value.length;
    if (total === 0) return { completed: 0, total: 0 };
    const completed = todayHabits.value.filter(h => h.completed).length;
    return { completed, total };
  });

  const getDayByDateString = (dateString: string) => {
    return dailyHabits.value.find(day => format(day.date, 'yyyy-MM-dd') === dateString);
  };

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