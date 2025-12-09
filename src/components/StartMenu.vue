<template>
  <div class="start-menu" @click.stop>
    <div class="start-menu-left">Windows XP</div>
    <div class="start-menu-right">
      <div class="start-menu-items">
        <div
          v-for="item in menuItems"
          :key="item.id"
          class="start-menu-item"
          @click="handleAction(item)"
        >
          <div class="icon" v-html="item.icon"></div>
          <span>{{ item.label }}</span>
        </div>
        <div class="start-menu-separator"></div>
        <div
          v-for="item in bottomItems"
          :key="item.id"
          class="start-menu-item"
          @click="handleAction(item)"
        >
          <div class="icon" v-html="item.icon"></div>
          <span>{{ item.label }}</span>
        </div>
      </div>
      <div class="start-menu-footer" @click="handleAction('shutdown')">
        <span>⏻</span>
        <span>Turn Off Computer</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const emit = defineEmits(["close", "action"]);

const getAssetUrl = (path) => {
  return import.meta.env.BASE_URL + path.replace(/^\//, '');
};

const menuItems = [
  {
    id: "github",
    label: "GitHub Profile",
    icon: `<img src="${getAssetUrl('github.png')}" style="width: 24px; height: 24px; object-fit: contain;" />`,
    url: "https://github.com/LAT-06/",
  },
  {
    id: "tryhackme",
    label: "TryHackMe",
    icon: `<img src="${getAssetUrl('thm.png')}" style="width: 24px; height: 24px; object-fit: contain;" />`,
    url: "https://tryhackme.com/p/LAT",
  },
  {
    id: "medium",
    label: "Medium Blog",
    icon: `<img src="${getAssetUrl('medium.png')}" style="width: 24px; height: 24px; object-fit: contain;" />`,
    url: "https://medium.com/@nagatodeptrai",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: `<img src="${getAssetUrl('linkedin.png')}" style="width: 24px; height: 24px; object-fit: contain;" />`,
    url: "https://www.linkedin.com/in/lat06/",
  },
  {
    id: "my-computer",
    label: "My Computer",
    icon: `<img src="${getAssetUrl('mycomputer.png')}" style="width: 24px; height: 24px; object-fit: contain;" />`,
    action: "my-computer",
  },
];

const bottomItems = [
  {
    id: "cv",
    label: "View CV",
    icon: "📄",
    action: "cv",
  },
  {
    id: "email",
    label: "Email Me",
    icon: "✉️",
    url: "mailto:thinhlam06@outlook.com",
  },
  {
    id: "portfolio",
    label: "About Me",
    icon: "🌐",
    action: "about-me",
  },
];

const handleAction = (item) => {
  if (item.url) {
    window.open(item.url, "_blank");
    emit("close");
  } else if (item.action) {
    emit("action", item.action);
    emit("close");
  }
};
</script>
