<template>
  <div
    v-show="!window.minimized"
    class="window"
    :class="{ maximized: window.maximized, inactive: !isActive }"
    :style="windowStyle"
    @mousedown="handleFocus"
  >
    <!-- Title Bar -->
    <div class="window-titlebar" @mousedown="startDrag">
      <div class="window-title">
        <span>📁</span>
        <span>{{ window.title }}</span>
      </div>
      <div class="window-controls">
        <div class="window-control-btn" @click.stop="$emit('minimize')">
          <span>_</span>
        </div>
        <div class="window-control-btn" @click.stop="$emit('maximize')">
          <span v-if="!window.maximized">□</span>
          <span v-else>❐</span>
        </div>
        <div class="window-control-btn close" @click.stop="$emit('close')">
          <span>×</span>
        </div>
      </div>
    </div>

    <!-- Menu Bar -->
    <div class="window-menubar">
      <span>File</span>
      <span>Edit</span>
      <span>View</span>
      <span>Favorites</span>
      <span>Tools</span>
      <span>Help</span>
    </div>

    <!-- Toolbar (for explorer windows) -->
    <div v-if="window.content.type === 'explorer'" class="window-toolbar">
      <div class="toolbar-button">
        <span>⬅️</span>
      </div>
      <div class="toolbar-button">
        <span>➡️</span>
      </div>
      <div
        class="toolbar-separator"
        style="width: 1px; height: 20px; background: #c0c0c0; margin: 0 4px"
      ></div>
      <div class="toolbar-button">
        <span>🔍</span>
        <span>Search</span>
      </div>
      <div class="toolbar-button">
        <span>📁</span>
        <span>Folders</span>
      </div>
    </div>

    <!-- Content -->
    <div class="window-content">
      <!-- Explorer Content -->
      <div v-if="window.content.type === 'explorer'" class="explorer-content">
        <div
          v-for="item in window.content.items"
          :key="item.id"
          class="explorer-item"
          @dblclick="openExplorerItem(item)"
        >
          <div class="explorer-item-icon" v-html="item.icon"></div>
          <div class="explorer-item-label">{{ item.label }}</div>
        </div>
      </div>

      <!-- PDF Content -->
      <div
        v-else-if="window.content.type === 'pdf'"
        style="width: 100%; height: 100%"
      >
        <iframe
          :src="window.content.url"
          class="pdf-viewer"
          frameborder="0"
        ></iframe>
      </div>

      <!-- Text Content -->
      <div v-else-if="window.content.type === 'text'" class="text-content">
        <pre>{{ window.content.text }}</pre>
      </div>

      <!-- Default Content -->
      <div v-else>
        <p>{{ window.content }}</p>
      </div>
    </div>

    <!-- Status Bar -->
    <div class="window-statusbar">
      <span v-if="window.content.type === 'explorer'">
        {{ window.content.items?.length || 0 }} object(s)
      </span>
      <span v-else>Ready</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  window: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits([
  "close",
  "focus",
  "minimize",
  "maximize",
  "update-position",
  "update-size",
]);

const isDragging = ref(false);
const dragStartX = ref(0);
const dragStartY = ref(0);
const windowStartX = ref(0);
const windowStartY = ref(0);

const isActive = computed(() => {
  // Cửa sổ được coi là active nếu có zIndex cao nhất
  return true; // Simplified - parent component handles this
});

const windowStyle = computed(() => {
  if (props.window.maximized) {
    return {
      zIndex: props.window.zIndex || 100,
    };
  }

  return {
    left: `${props.window.x}px`,
    top: `${props.window.y}px`,
    width: `${props.window.width}px`,
    height: `${props.window.height}px`,
    zIndex: props.window.zIndex || 100,
  };
});

const handleFocus = () => {
  emit("focus");
};

const startDrag = (e) => {
  if (props.window.maximized) return;

  isDragging.value = true;
  dragStartX.value = e.clientX;
  dragStartY.value = e.clientY;
  windowStartX.value = props.window.x;
  windowStartY.value = props.window.y;

  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);

  e.preventDefault();
};

const onDrag = (e) => {
  if (!isDragging.value) return;

  const deltaX = e.clientX - dragStartX.value;
  const deltaY = e.clientY - dragStartY.value;

  props.window.x = windowStartX.value + deltaX;
  props.window.y = windowStartY.value + deltaY;
};

const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
};

const openExplorerItem = (item) => {
  if (item.url) {
    window.open(item.url, "_blank");
  }
};
</script>
