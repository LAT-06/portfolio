<template>
  <div class="desktop" @click="handleDesktopClick">
    <!-- Desktop Icons -->
    <div class="desktop-icons">
      <div
        v-for="icon in desktopIcons"
        :key="icon.id"
        class="desktop-icon"
        :class="{ selected: selectedIcon === icon.id }"
        @click.stop="selectIcon(icon.id)"
        @dblclick="openIcon(icon)"
      >
        <div class="desktop-icon-image">
          <img :src="icon.iconSrc" :alt="icon.label" />
        </div>
        <div class="desktop-icon-label">{{ icon.label }}</div>
      </div>
    </div>

    <!-- Windows -->
    <Window
      v-for="window in windows"
      :key="window.id"
      :window="window"
      @close="closeWindow(window.id)"
      @focus="focusWindow(window.id)"
      @minimize="minimizeWindow(window.id)"
      @maximize="maximizeWindow(window.id)"
    />

    <!-- Taskbar -->
    <Taskbar
      :windows="windows"
      :showStartMenu="showStartMenu"
      @toggle-start-menu="showStartMenu = !showStartMenu"
      @focus-window="focusWindow"
      @start-menu-action="handleStartMenuAction"
    />

    <!-- Start Menu -->
    <StartMenu
      v-if="showStartMenu"
      @close="showStartMenu = false"
      @action="handleStartMenuAction"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Taskbar from "./Taskbar.vue";
import StartMenu from "./StartMenu.vue";
import Window from "./Window.vue";

const selectedIcon = ref(null);
const showStartMenu = ref(false);
const windows = ref([]);
let windowIdCounter = 0;

const desktopIcons = [
  {
    id: "my-computer",
    label: "My Computer",
    iconSrc: "/mycomputer.png",
    type: "explorer",
  },
  {
    id: "recycle-bin",
    label: "Recycle Bin",
    iconSrc: "/recycle.png",
    type: "folder",
  },
  {
    id: "my-cv",
    label: "My_CV.pdf",
    iconSrc: "/pdf.png",
    type: "pdf",
  },
];

const handleDesktopClick = () => {
  selectedIcon.value = null;
  showStartMenu.value = false;
};

const selectIcon = (iconId) => {
  selectedIcon.value = iconId;
};

const openIcon = (icon) => {
  showStartMenu.value = false;

  if (icon.type === "explorer") {
    openMyComputer();
  } else if (icon.type === "pdf") {
    openPDF();
  }
};

const openMyComputer = () => {
  const explorerContent = {
    type: "explorer",
    items: [
      {
        id: "github",
        label: "GitHub",
        icon: '<img src="/github.png" style="width: 48px; height: 48px; object-fit: contain;" />',
        url: "https://github.com/LAT-06/",
      },
      {
        id: "tryhackme",
        label: "TryHackMe",
        icon: '<img src="/thm.png" style="width: 48px; height: 48px; object-fit: contain;" />',
        url: "https://tryhackme.com/p/LAT",
      },
      {
        id: "medium",
        label: "Medium",
        icon: '<img src="/medium.png" style="width: 48px; height: 48px; object-fit: contain;" />',
        url: "https://medium.com/@nagatodeptrai", 
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        icon: '<img src="/linkedin.png" style="width: 48px; height: 48px; object-fit: contain;" />',
        url: "https://www.linkedin.com/in/lat06/",
      },
    ],
  };

  createWindow("My Computer", explorerContent, 600, 400);
};

const openPDF = () => {
  const pdfContent = {
    type: "pdf",
    url: "/main.pdf",
  };

  createWindow("My_CV.pdf", pdfContent, 800, 600);
};

const openAboutMe = () => {
  const aboutMeContent = {
    type: "text",
    text: `Welcome to my portfolio!

My name is [Your Name]

About Me:
I am a passionate developer with expertise in web development, 
cybersecurity, and creating innovative solutions. 

Skills:
• Web Development (Vue.js, React, Node.js)
• Cybersecurity & Penetration Testing
• System Administration
• Problem Solving & Critical Thinking

Experience:
I love building creative projects and exploring new technologies.
This Windows XP portfolio is one of my creative experiments!

Feel free to explore my projects and get in touch!

Contact: thinhlam06@outlook.com`,
  };

  createWindow("About Me.txt", aboutMeContent, 600, 450);
};

const createWindow = (title, content, width = 500, height = 400) => {
  const id = ++windowIdCounter;
  const newWindow = {
    id,
    title,
    content,
    width,
    height,
    x: 50 + windows.value.length * 30,
    y: 50 + windows.value.length * 30,
    minimized: false,
    maximized: false,
    zIndex: getHighestZIndex() + 1,
  };

  windows.value.push(newWindow);
  focusWindow(id);
};

const closeWindow = (id) => {
  const index = windows.value.findIndex((w) => w.id === id);
  if (index !== -1) {
    windows.value.splice(index, 1);
  }
};

const focusWindow = (id) => {
  const highestZ = getHighestZIndex();
  windows.value.forEach((w) => {
    if (w.id === id) {
      w.zIndex = highestZ + 1;
      w.minimized = false;
    }
  });
};

const minimizeWindow = (id) => {
  const window = windows.value.find((w) => w.id === id);
  if (window) {
    window.minimized = !window.minimized;
  }
};

const maximizeWindow = (id) => {
  const window = windows.value.find((w) => w.id === id);
  if (window) {
    window.maximized = !window.maximized;
  }
};

const getHighestZIndex = () => {
  if (windows.value.length === 0) return 100;
  return Math.max(...windows.value.map((w) => w.zIndex || 100));
};

const handleStartMenuAction = (action) => {
  showStartMenu.value = false;

  // Xử lý các action từ Start Menu
  if (action === "my-computer") {
    openMyComputer();
  } else if (action === "cv") {
    openPDF();
  } else if (action === "about-me") {
    openAboutMe();
  }
};
</script>
