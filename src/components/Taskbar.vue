<template>
  <div class="taskbar">
    <!-- Start Button -->
    <div class="start-button" @click.stop="$emit('toggle-start-menu')">
      <img :src="startIconUrl" alt="Start" class="start-icon" />
      <span>start</span>
    </div>

    <!-- Window List -->
    <div class="taskbar-window-list">
      <div
        v-for="window in visibleWindows"
        :key="window.id"
        class="taskbar-item"
        :class="{
          active: isActiveWindow(window.id),
          minimized: window.minimized,
        }"
        @click="$emit('focus-window', window.id)"
      >
        <span v-if="window.content?.type === 'pdf'">📄</span>
        <span v-else>📁</span>
        <span>{{ window.title }}</span>
      </div>
    </div>

    <!-- System Tray -->
    <div class="system-tray">
      <div class="system-tray-icons">
        <span class="system-tray-icon">🔊</span>
        <span class="system-tray-icon">🌐</span>
      </div>
      <div class="system-tray-time" @click.stop="toggleCalendar">
        {{ currentTime }}
      </div>
    </div>

    <!-- Calendar Popup -->
    <div v-if="showCalendar" class="calendar-popup" @click.stop>
      <div class="calendar-header">
        <button @click="previousMonth">◀</button>
        <span>{{ monthNames[currentMonth] }} {{ currentYear }}</span>
        <button @click="nextMonth">▶</button>
      </div>
      <div class="calendar-weekdays">
        <span v-for="day in weekDays" :key="day">{{ day }}</span>
      </div>
      <div class="calendar-days">
        <span
          v-for="(day, index) in calendarDays"
          :key="index"
          :class="{
            'calendar-day': day > 0,
            'calendar-empty': day === 0,
            'calendar-today':
              day === today &&
              currentMonth === new Date().getMonth() &&
              currentYear === new Date().getFullYear(),
          }"
        >
          {{ day || "" }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  windows: {
    type: Array,
    default: () => [],
  },
  showStartMenu: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["toggle-start-menu", "focus-window", "start-menu-action"]);

const currentTime = ref("");
const showCalendar = ref(false);
const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());
const today = new Date().getDate();

const startIconUrl = computed(() => {
  return import.meta.env.BASE_URL + "start.png";
});

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const visibleWindows = computed(() => {
  // Hiển thị tất cả windows trên taskbar, không filter minimized
  return props.windows;
});

const calendarDays = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay();
  const daysInMonth = new Date(
    currentYear.value,
    currentMonth.value + 1,
    0
  ).getDate();

  const days = [];
  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(0);
  }
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  return days;
});

const isActiveWindow = (id) => {
  if (props.windows.length === 0) return false;
  const maxZ = Math.max(...props.windows.map((w) => w.zIndex || 100));
  const activeWindow = props.windows.find((w) => w.zIndex === maxZ);
  return activeWindow?.id === id;
};

const updateTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  currentTime.value = `${hours}:${minutes}`;
};

const toggleCalendar = () => {
  showCalendar.value = !showCalendar.value;
};

const previousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

let timeInterval;

onMounted(() => {
  updateTime();
  timeInterval = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval);
  }
});
</script>
