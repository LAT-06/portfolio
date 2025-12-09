<template>
  <div class="desktop" @click="handleDesktopClick" :style="desktopStyle">
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
import { ref, computed } from "vue";
import Taskbar from "./Taskbar.vue";
import StartMenu from "./StartMenu.vue";
import Window from "./Window.vue";

const getAssetUrl = (path) => {
  return import.meta.env.BASE_URL + path.replace(/^\//, "");
};

const desktopStyle = computed(() => ({
  backgroundImage: `url('${getAssetUrl("background.jpg")}')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const selectedIcon = ref(null);
const showStartMenu = ref(false);
const windows = ref([]);
let windowIdCounter = 0;

const desktopIcons = [
  {
    id: "my-computer",
    label: "My Computer",
    iconSrc: getAssetUrl("mycomputer.png"),
    type: "explorer",
  },
  {
    id: "recycle-bin",
    label: "Recycle Bin",
    iconSrc: getAssetUrl("recycle.png"),
    type: "folder",
  },
  {
    id: "my-cv",
    label: "My_CV.pdf",
    iconSrc: getAssetUrl("pdf.png"),
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
        iconSrc: getAssetUrl("github.png"),
        url: "https://github.com/LAT-06/",
      },
      {
        id: "tryhackme",
        label: "TryHackMe",
        iconSrc: getAssetUrl("thm.png"),
        url: "https://tryhackme.com/p/LAT",
      },
      {
        id: "medium",
        label: "Medium",
        iconSrc: getAssetUrl("medium.png"),
        url: "https://medium.com/@nagatodeptrai",
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        iconSrc: getAssetUrl("linkedin.png"),
        url: "https://www.linkedin.com/in/lat06/",
      },
    ],
  };

  createWindow("My Computer", explorerContent, 600, 400);
};

const openPDF = () => {
  const pdfContent = {
    type: "pdf",
    url: getAssetUrl("main.pdf"),
  };

  createWindow("My_CV.pdf", pdfContent, 800, 600);
};

const openAboutMe = () => {
  const aboutMeContent = {
    type: "text",
    text: `╔════════════════════════════════════════════════════════════╗
║                    ABOUT ME - LAM ANH THINH                ║
╚════════════════════════════════════════════════════════════╝

PERSONAL INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:     Lam Anh Thinh
Role:     Junior Penetration Tester | Security Researcher
Email:    thinhlam06@outlook.com
GitHub:   github.com/LAT-06
LinkedIn: linkedin.com/in/lat06

PROFESSIONAL SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Aspiring cybersecurity professional with hands-on experience in 
penetration testing and vulnerability assessment. Passionate about 
identifying security flaws and developing solutions to protect 
digital assets. Currently focused on expanding knowledge in web 
application security, network security, and ethical hacking.

CORE COMPETENCIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Security Testing:
  • Web Application Penetration Testing
  • Vulnerability Assessment & Analysis
  • Security Auditing & Compliance
  • OWASP Top 10 Vulnerabilities

Technical Skills:
  • Programming: Python, JavaScript, Bash Scripting
  • Security Tools: Burp Suite, Metasploit, Nmap, Wireshark
  • Web Technologies: HTML, CSS, Vue.js, Node.js
  • Operating Systems: Linux (Kali, Ubuntu), Windows
  • Frameworks: OWASP, MITRE ATT&CK

Professional Skills:
  • Analytical Thinking & Problem Solving
  • Technical Report Writing
  • Security Documentation
  • Continuous Learning & Adaptation

CERTIFICATIONS & ACHIEVEMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Active TryHackMe Member - Practicing penetration testing
• Security Research & Bug Bounty Programs Participant
• CTF Competition Participant
• Self-taught Ethical Hacker

INTERESTS & GOALS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Current Focus:
  → Advanced web application security testing
  → Mobile application penetration testing
  → API security assessment
  → Red team operations

Career Goals:
  → Obtain professional security certifications (CEH, OSCP)
  → Contribute to open-source security projects
  → Build expertise in cloud security
  → Become a recognized security researcher

CONTINUOUS LEARNING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Regular practice on TryHackMe and HackTheBox platforms
• Following latest security trends and CVE disclosures
• Participating in bug bounty programs
• Reading security blogs and research papers
• Contributing to cybersecurity community

WHY CYBERSECURITY?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"Security is not a product, but a process. I'm passionate about 
protecting digital assets and helping organizations strengthen their 
security posture through thorough testing and continuous improvement."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Let's connect and collaborate on security projects!
GitHub: github.com/LAT-06
Email: thinhlam06@outlook.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
  };

  createWindow("About Me.txt", aboutMeContent, 650, 500);
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
