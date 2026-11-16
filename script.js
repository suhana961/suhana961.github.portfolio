(() => {
  "use strict";

  const topbar = document.getElementById("topbar");
  const mobileToggle = document.getElementById("mobile-toggle");
  const streamNav = document.getElementById("stream-nav");
  const toastEl = document.getElementById("toast");

  // 1. Navbar scroll state
  const onScroll = () => {
    topbar?.classList.toggle("scrolled", window.scrollY > 30);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // 2. Mobile menu
  mobileToggle?.addEventListener("click", () => {
    const open = streamNav.classList.toggle("open");
    mobileToggle.setAttribute("aria-expanded", String(open));
  });

  streamNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      streamNav.classList.remove("open");
      mobileToggle?.setAttribute("aria-expanded", "false");
    });
  });

  // 3. Genre filter pills + My List Shortlist for Originals
  const filterPills = document.querySelectorAll(".genre-pill");
  const posterCards = document.querySelectorAll(".poster-card");
  const myListCountEl = document.getElementById("mylist-count");
  let myList = [];
  try {
    myList = JSON.parse(localStorage.getItem("suhana-series-mylist") || "[]");
  } catch {
    myList = [];
  }

  const syncMyListUI = () => {
    if (myListCountEl) myListCountEl.textContent = String(myList.length);
    document.querySelectorAll(".mylist-toggle").forEach((btn) => {
      const id = btn.getAttribute("data-id");
      const saved = myList.includes(id);
      btn.classList.toggle("saved", saved);
      btn.textContent = saved ? "✓ In My List" : "+ My List";
    });
  };
  syncMyListUI();

  const applyOriginalFilter = (target) => {
    posterCards.forEach((card) => {
      const cats = (card.getAttribute("data-category") || "").split(" ");
      const id = card.getAttribute("data-original");
      const show =
        target === "all" ||
        (target === "mylist" ? myList.includes(id) : cats.includes(target));
      card.classList.toggle("hidden", !show);
    });
  };

  filterPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const target = pill.getAttribute("data-filter");
      filterPills.forEach((p) => p.classList.toggle("active", p === pill));
      applyOriginalFilter(target);
    });
  });

  document.querySelectorAll(".mylist-toggle").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-id");
      if (!id) return;
      if (myList.includes(id)) {
        myList = myList.filter((item) => item !== id);
        showToast("Removed from My List");
      } else {
        myList.push(id);
        showToast("Saved to My List");
      }
      try {
        localStorage.setItem("suhana-series-mylist", JSON.stringify(myList));
      } catch {}
      syncMyListUI();
      const activePill = document.querySelector(".genre-pill.active")?.getAttribute("data-filter");
      if (activePill === "mylist") applyOriginalFilter("mylist");
    });
  });

  // 4. Modal Data (Projects, Experience, Recruiter Brief)
  const modalData = {
    "cake-store": {
      kicker: "SUHANA.N FEATURED PROJECT #01",
      title: "Cake Store Management System — REST API",
      meta: "Python • Django • Django REST Framework • MySQL",
      desc: "A production-grade Django REST Framework backend service for managing cake product catalogs, categories, relational database workflows, JWT authentication, and image uploads.",
      bullets: [
        "Developed a REST API for managing cake-related information.",
        "Implemented CRUD operations for cake and category management.",
        "Worked with Django models, serializers, and database relationships in MySQL.",
        "Implemented authentication and image-upload functionality.",
      ],
      tags: ["Python", "Django", "Django REST Framework", "MySQL", "REST API", "CRUD", "JWT"],
    },
    "study-app": {
      kicker: "SUHANA.N FEATURED PROJECT #02",
      title: "Study App — Student Learning Resource Management System",
      meta: "Python • Django • MySQL • HTML/CSS/JS",
      desc: "A student-oriented Django & MySQL web application designed to organize academic books and notes cleanly.",
      bullets: [
        "Developed a student-oriented application for managing academic learning resources.",
        "Implemented book collection management and notes management with CRUD functionality.",
      ],
      tags: ["Python", "Django", "MySQL", "HTML", "CSS", "JavaScript", "CRUD"],
    },
    "iot-ml": {
      kicker: "SUHANA.N FEATURED PROJECT #03",
      title: "IoT Shielding-Driven Federated Learning Approach for Spoofing Attack Mitigation",
      meta: "Python • NS-3 • NetAnim • Isolation Forest • Random Forest",
      desc: "Smart city IoT network simulation and ML anomaly detection pipeline targeting IP and MAC spoofing attacks.",
      bullets: [
        "Designed a smart-city IoT network simulation consisting of 32 nodes and simulated IP and MAC spoofing attacks.",
        "Analysed network traffic using FlowMonitor and NetAnim and explored machine learning-based anomaly detection.",
      ],
      tags: ["Python", "Isolation Forest", "Random Forest", "Federated Learning", "NS-3", "NetAnim"],
    },
    verbalens: {
      kicker: "SUHANA.N FEATURED PROJECT #04",
      title: "VERBALENS — Smart Speech-to-Text Glasses",
      meta: "ESP32 • I2S MEMS Microphone • Deepgram API • OLED Display",
      desc: "Wearable assistive device converting spoken language into real-time text for people with hearing impairments.",
      bullets: [
        "Developed a wearable assistive device that converts speech into text.",
        "Integrated ESP32, microphone, Wi-Fi, Deepgram API, and OLED display.",
      ],
      tags: ["ESP32", "I2S MEMS Microphone", "Deepgram API", "OLED Display", "Wi-Fi"],
    },
    ep1: {
      kicker: "CAREER TIMELINE • ACTIVE ROLE",
      title: "AI-Integrated Python Django Full Stack Developer Intern — Luminar Technolab",
      meta: "Jul 2026 – Present • Kerala, India",
      desc: "Active industry internship developing full-stack web applications and scalable backend APIs.",
      bullets: [
        "Develop Django-based web applications with database integration.",
        "Implement CRUD functionality using Django and Django REST Framework.",
        "Work with Django models, serializers, and database relationships.",
        "Practise JWT authentication and REST API testing using Postman.",
        "Debug application issues and explore AI integration using Python.",
      ],
      tags: ["Python", "Django", "DRF", "MySQL", "JWT", "Postman", "AI Integration"],
    },
    ep2: {
      kicker: "CAREER TIMELINE • MILESTONE 2",
      title: "Full Stack Development Intern — ICT Academy of Kerala",
      meta: "Jun 2025 – Jul 2025 • Kerala, India",
      desc: "Practical internship training building web applications and API integrations.",
      bullets: [
        "Developed a Movie Application as part of the internship.",
        "Implemented movie information display and basic application functionalities.",
        "Gained practical exposure to web application development and API integration.",
      ],
      tags: ["Full Stack Web", "Movie App", "API Integration", "JavaScript"],
    },
    ep3: {
      kicker: "CAREER TIMELINE • MILESTONE 3",
      title: "Fusion 360 Training Intern — BIMSLAB",
      meta: "Jul 2024",
      desc: "Technical internship exploring parametric 3D modelling and CAD design.",
      bullets: [
        "Gained practical exposure to 3D CAD modelling, parametric design, and Autodesk Fusion 360.",
      ],
      tags: ["Autodesk Fusion 360", "3D CAD", "Parametric Design"],
    },
    ep4: {
      kicker: "CAREER TIMELINE • MILESTONE 4",
      title: "Telecom Training — BSNL",
      meta: "Oct 2023",
      desc: "Industry training in telecommunications and networking fundamentals.",
      bullets: [
        "Telecom Training – GSM, LTE, Optical Fibre Communication, October 2023.",
        "Gained exposure to telecommunications systems, networking concepts, and communication infrastructure.",
      ],
      tags: ["Telecom Systems", "GSM", "LTE", "Optical Fibre", "Networking"],
    },
    brief: {
      kicker: "RECRUITER BRIEF • 60-SECOND DOSSIER",
      title: "SUHANA.N — Python Developer Profile",
      meta: "B.Tech ECE (8.37 CGPA) • Thiruvananthapuram, Kerala, India",
      desc: "Entry-level Python Developer with strong foundation in object-oriented programming, Django, REST API development, CRUD operations, and MySQL.",
      bullets: [
        "Target Role: Python Developer | Django | REST API | MySQL.",
        "Core Stack: Python, SQL, Django, Django REST Framework, MySQL, JWT Authentication, Postman, Git.",
        "Key Projects: Cake Store Management System (DRF/MySQL/JWT), Study App (CRUD), IoT Spoofing ML Mitigation (NS-3), VERBALENS.",
        "Current Internship: AI-Integrated Python Django Full Stack Developer Intern at Luminar Technolab (Jul 2026 – Present).",
        "Education: B.Tech ECE at Mar Baselios College of Engineering and Technology (2022–2026, CGPA 8.37/10).",
        "Languages: English, Malayalam, Hindi • Contact: suhanax264@gmail.com.",
      ],
      tags: ["Python", "Django", "DRF", "MySQL", "JWT", "REST API", "Git", "Postman"],
    },
  };

  const modal = document.getElementById("detail-modal");
  const modalClose = document.getElementById("modal-close");
  const modalKicker = document.getElementById("modal-kicker");
  const modalTitle = document.getElementById("modal-title");
  const modalMeta = document.getElementById("modal-meta");
  const modalDesc = document.getElementById("modal-desc");
  const modalBullets = document.getElementById("modal-bullets");
  const modalTags = document.getElementById("modal-tags");

  const openModal = (key) => {
    const item = modalData[key];
    if (!item || !modal) return;
    modalKicker.textContent = item.kicker;
    modalTitle.textContent = item.title;
    modalMeta.textContent = item.meta;
    modalDesc.textContent = item.desc;

    modalBullets.innerHTML = "";
    item.bullets.forEach((b) => {
      const li = document.createElement("li");
      li.textContent = b;
      modalBullets.appendChild(li);
    });

    modalTags.innerHTML = "";
    item.tags.forEach((t, i) => {
      const span = document.createElement("span");
      span.className = i < 2 ? "chip chip-hot" : "chip";
      span.textContent = t;
      modalTags.appendChild(span);
    });

    modal.classList.add("open");
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    modal.style.display = "flex";
    modal.style.opacity = "1";
    modal.style.visibility = "visible";
    modal.style.pointerEvents = "auto";
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("open");
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    modal.style.display = "";
    modal.style.opacity = "";
    modal.style.visibility = "";
    modal.style.pointerEvents = "";
  };

  document.querySelectorAll(".inspect-original").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openModal(btn.getAttribute("data-original"));
    });
  });

  posterCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      openModal(card.getAttribute("data-original"));
    });
  });

  document.querySelectorAll(".inspect-episode").forEach((btn) => {
    btn.addEventListener("click", () => openModal(btn.getAttribute("data-episode")));
  });

  document.getElementById("play-brief-btn")?.addEventListener("click", () => openModal("brief"));
  document.getElementById("open-overview-btn")?.addEventListener("click", () => openModal("brief"));
  document.getElementById("hero-download-resume-btn")?.addEventListener("click", () => {
    showToast("Downloading Suhana's Resume (PDF)...");
  });
  document.getElementById("modal-contact-jump")?.addEventListener("click", closeModal);
  document.getElementById("modal-print-btn")?.addEventListener("click", () => {
    closeModal();
    setTimeout(() => window.print(), 150);
  });
  modalClose?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // 4b. Interactive Python & Django Code Console Modal
  const codeSnippets = {
    crud: {
      code: `# Study App — Django Models & CRUD View (MySQL)
from django.db import models
from django.shortcuts import get_object_or_404

class StudyNote(models.Model):
    title = models.CharField(max_length=150)
    subject = models.CharField(max_length=80)
    content = models.TextField()
    updated_at = models.DateTimeField(auto_now=True)

def update_note(request, note_id, payload):
    note = get_object_or_404(StudyNote, id=note_id)
    note.title = payload["title"]
    note.content = payload["content"]
    note.save()
    return {"status": "updated", "id": note.id}`,
      output: `HTTP 200 OK — StudyNote.objects.filter(subject="Python")\n{\n  "status": "updated",\n  "id": 14,\n  "title": "Django ORM & MySQL Indexing",\n  "crud_operations": ["CREATE", "READ", "UPDATE", "DELETE"]\n}`,
    },
    drf: {
      code: `# Cake Store Management System — DRF ViewSet & Serializer
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import Cake, Category
from .serializers import CakeSerializer

class CakeViewSet(viewsets.ModelViewSet):
    queryset = Cake.objects.select_related("category").all()
    serializer_class = CakeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)`,
      output: `HTTP 200 OK — GET /api/v1/cakes/ (14ms)\n[\n  {\n    "id": 1,\n    "title": "Red Velvet Signature",\n    "category": "Custom Bakes",\n    "price": "28.50",\n    "in_stock": true,\n    "auth_type": "JWT"\n  }\n]`,
    },
    ml: {
      code: `# IoT Spoofing Anomaly Detection (Python + Scikit-Learn)
from sklearn.ensemble import IsolationForest, RandomForestClassifier

def detect_spoofing(traffic_features):
    iso = IsolationForest(contamination=0.05, random_state=42)
    anomalies = iso.fit_predict(traffic_features)  # -1 = suspicious node
    return [i for i, flag in enumerate(anomalies) if flag == -1]`,
      output: `Simulated 32-node Smart City IoT Network (NS-3 + FlowMonitor)\n{\n  "nodes_monitored": 32,\n  "attack_scenarios": ["IP Spoofing", "MAC Spoofing"],\n  "models": ["Isolation Forest", "Random Forest", "Federated Learning"],\n  "flagged_anomalies": [7, 19]\n}`,
    },
  };

  const codeModal = document.getElementById("code-modal");
  const codeViewer = document.getElementById("code-viewer");
  const codeOutput = document.getElementById("code-output");
  const terminalShell = document.getElementById("terminal-shell");
  const codeViewerShell = document.getElementById("code-viewer-shell");
  const terminalLog = document.getElementById("terminal-log");
  const terminalInput = document.getElementById("terminal-cli-input");
  let activeSnippet = "terminal";

  // Terminal Command Engine
  const terminalHistory = [];
  let historyIndex = -1;

  const terminalCommands = {
    help: () => `Available commands:
  • whoami     - Professional profile & background
  • skills     - Technical proficiencies & tools
  • projects   - Featured portfolio projects
  • contact    - Direct contact details & links
  • resume     - Download official PDF resume
  • github     - Open GitHub profile
  • clear      - Clear terminal screen
  • date       - Display current date and time
  • exit       - Close developer console`,
    whoami: () => `SUHANA.N — Python Django Developer
Location : Thiruvananthapuram, Kerala, India
Education: B.Tech in Electronics & Communication Engineering (Mar Baselios College)
Current  : AI-Integrated Python Django Full Stack Intern at Luminar Technolab
Focus    : Scalable RESTful backend architectures, relational MySQL schemas, and practical AI/IoT integrations.`,
    skills: () => `CORE TECHNICAL ARSENAL:
[Backend]    Python (OOP, Design Patterns), Django, Django REST Framework, MVC/MVT, RESTful APIs, JWT Authentication
[Databases]  MySQL, SQL, Relational Schema Design, Query Optimization, Django ORM
[Frontend]   HTML5, CSS3, JavaScript, ReactJS, Tailwind CSS
[Tools & AI] Git, GitHub, Postman, Linux, VS Code, Scikit-Learn (Isolation Forest), NS-3, ESP32 IoT`,
    projects: () => `FEATURED WORKS:
1. Cake Store Management System  [DRF • MySQL • JWT • CRUD REST API]
2. Study App Resource Portal     [Django • MySQL • Academic Resource Engine]
3. IoT Spoofing & Anomaly Shield [NS-3 • Isolation Forest • Federated Learning]
4. VERBALENS Assistive AI        [ESP32 • Deepgram Speech-to-Text • Micro-OLED]`,
    contact: () => `COMMUNICATION CHANNELS:
• Email    : suhanax264@gmail.com
• LinkedIn : https://www.linkedin.com/in/suhana-n-843043284/
• GitHub   : https://github.com/suhana961
• Status   : Open to Python Developer opportunities.`,
    resume: () => {
      const link = document.createElement("a");
      link.href = "assets/Suhana_N_Python_Developer_Resume.pdf";
      link.download = "Suhana_N_Python_Developer_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return "Downloading Suhana_N_Python_Developer_Resume.pdf...";
    },
    github: () => {
      window.open("https://github.com/suhana961", "_blank");
      return "Navigating to https://github.com/suhana961...";
    },
    linkedin: () => {
      window.open("https://www.linkedin.com/in/suhana-n-843043284/", "_blank");
      return "Navigating to https://www.linkedin.com/in/suhana-n-843043284/...";
    },
    date: () => new Date().toString(),
    clear: () => {
      if (terminalLog) terminalLog.innerHTML = "";
      return null;
    },
    exit: () => {
      closeCodeModal();
      return "Closing console session.";
    },
  };

  const executeCommand = (cmdText) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    terminalHistory.push(trimmed);
    historyIndex = terminalHistory.length;

    // Append command to log
    const cmdLine = document.createElement("div");
    cmdLine.className = "terminal-entry cmd-line";
    cmdLine.textContent = `>>> ${trimmed}`;
    terminalLog?.appendChild(cmdLine);

    const parts = trimmed.toLowerCase().split(" ");
    const root = parts[0];

    if (root in terminalCommands) {
      const result = terminalCommands[root]();
      if (result) {
        const outLine = document.createElement("div");
        outLine.className = "terminal-entry out-line";
        outLine.textContent = result;
        terminalLog?.appendChild(outLine);
      }
    } else {
      const errLine = document.createElement("div");
      errLine.className = "terminal-entry error-line";
      errLine.textContent = `bash: command not found: ${trimmed}. Type "help" to see available options.`;
      terminalLog?.appendChild(errLine);
    }

    if (terminalShell) terminalShell.scrollTop = terminalShell.scrollHeight;
  };

  terminalInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      executeCommand(terminalInput.value);
      terminalInput.value = "";
    } else if (e.key === "ArrowUp") {
      if (terminalHistory.length > 0 && historyIndex > 0) {
        historyIndex--;
        terminalInput.value = terminalHistory[historyIndex];
      }
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      if (historyIndex < terminalHistory.length - 1) {
        historyIndex++;
        terminalInput.value = terminalHistory[historyIndex];
      } else {
        historyIndex = terminalHistory.length;
        terminalInput.value = "";
      }
      e.preventDefault();
    }
  });

  const renderSnippet = (key) => {
    activeSnippet = key;
    document.querySelectorAll(".code-tab").forEach((t) => {
      t.classList.toggle("active", t.getAttribute("data-snippet") === key);
    });

    if (key === "terminal") {
      if (terminalShell) terminalShell.style.display = "block";
      if (codeViewerShell) codeViewerShell.style.display = "none";
      setTimeout(() => terminalInput?.focus(), 80);
    } else {
      if (terminalShell) terminalShell.style.display = "none";
      if (codeViewerShell) codeViewerShell.style.display = "block";
      if (codeViewer && codeSnippets[key]) codeViewer.textContent = codeSnippets[key].code;
      if (codeOutput) codeOutput.textContent = 'Click "Run Endpoint Simulation" to test a sample JSON response...';
    }
  };
  renderSnippet("terminal");

  const openCodeModal = () => {
    if (!codeModal) return;
    codeModal.classList.add("open");
    codeModal.classList.add("active");
    codeModal.setAttribute("aria-hidden", "false");
    codeModal.style.display = "flex";
    codeModal.style.opacity = "1";
    codeModal.style.visibility = "visible";
    codeModal.style.pointerEvents = "auto";
    if (activeSnippet === "terminal") {
      setTimeout(() => terminalInput?.focus(), 120);
    }
  };
  const closeCodeModal = () => {
    if (!codeModal) return;
    codeModal.classList.remove("open");
    codeModal.classList.remove("active");
    codeModal.setAttribute("aria-hidden", "true");
    codeModal.style.display = "";
    codeModal.style.opacity = "";
    codeModal.style.visibility = "";
    codeModal.style.pointerEvents = "";
  };

  document.getElementById("btn-replay-intro")?.addEventListener("click", () => {
    sessionStorage.removeItem("suhana_cinematic_intro_seen");
    window.location.hash = "intro";
    window.location.reload();
  });
  document.getElementById("open-code-btn")?.addEventListener("click", openCodeModal);
  document.getElementById("hero-code-btn")?.addEventListener("click", openCodeModal);
  document.getElementById("code-modal-close")?.addEventListener("click", closeCodeModal);
  codeModal?.addEventListener("click", (e) => {
    if (e.target === codeModal) closeCodeModal();
  });

  document.querySelectorAll(".code-tab").forEach((tab) => {
    tab.addEventListener("click", () => renderSnippet(tab.getAttribute("data-snippet")));
  });

  document.getElementById("run-api-sim")?.addEventListener("click", () => {
    if (codeOutput && codeSnippets[activeSnippet]) {
      codeOutput.textContent = codeSnippets[activeSnippet].output;
    }
  });

  document.getElementById("copy-code-btn")?.addEventListener("click", async () => {
    try {
      if (codeSnippets[activeSnippet]) {
        await navigator.clipboard.writeText(codeSnippets[activeSnippet].code);
        showToast("Python snippet copied to clipboard");
      }
    } catch {
      showToast("Select and copy snippet manually");
    }
  });

  // Keyboard shortcuts: R for Recruiter Brief, P for Python Console, Esc to close
  document.addEventListener("keydown", (e) => {
    const tag = (document.activeElement?.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea") return;
    if (e.key === "Escape") {
      closeModal();
      closeCodeModal();
    }
    if (e.key.toLowerCase() === "r") {
      e.preventDefault();
      openModal("brief");
    }
    if (e.key.toLowerCase() === "p") {
      e.preventDefault();
      openCodeModal();
    }
  });

  // 5. Toast + Copy
  let toastTimer;
  const showToast = (msg) => {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2400);
  };

  document.querySelectorAll(".copy-pill").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const val = btn.getAttribute("data-copy");
      if (!val) return;
      try {
        await navigator.clipboard.writeText(val);
        showToast(`Copied "${val}"`);
      } catch {
        showToast(`Copy manually: ${val}`);
      }
    });
  });

  // 6. Contact form submission via Web3Forms API
  const contactForm = document.getElementById("contact-form");
  const contactSubmitBtn = document.getElementById("contact-submit-btn");

  contactForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nameInput = document.getElementById("sender-name");
    const emailInput = document.getElementById("sender-email");
    const msgInput = document.getElementById("sender-msg");

    const name = nameInput?.value.trim() || "";
    const email = emailInput?.value.trim() || "";
    const msg = msgInput?.value.trim() || "";

    if (!name || !email || !msg) {
      showToast("Please fill in all fields.");
      return;
    }

    const originalBtnText = contactSubmitBtn ? contactSubmitBtn.innerHTML : "Send Inquiry &rarr;";
    if (contactSubmitBtn) {
      contactSubmitBtn.disabled = true;
      contactSubmitBtn.innerHTML = "Sending Inquiry...";
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "2297b289-a98b-4318-a543-2bd9e15edd86",
          name: name,
          email: email,
          message: msg,
          subject: `Portfolio Inquiry from ${name}`,
          from_name: name,
        }),
      });

      const result = await response.json();

      if (response.status === 200 && result.success) {
        showToast("Message sent successfully! Suhana will reply soon.");
        contactForm.reset();
        if (contactSubmitBtn) {
          contactSubmitBtn.innerHTML = "Sent Successfully! ✓";
          setTimeout(() => {
            contactSubmitBtn.innerHTML = originalBtnText;
            contactSubmitBtn.disabled = false;
          }, 3000);
        }
      } else {
        throw new Error(result.message || "Failed to send message.");
      }
    } catch (err) {
      console.error("Web3Forms submission error:", err);
      showToast("Could not send directly. Opening email draft...");
      const subject = encodeURIComponent(`Python Developer Inquiry from ${name}`);
      const body = encodeURIComponent(`Name/Company: ${name}\nReply Email: ${email}\n\n${msg}`);
      window.location.href = `mailto:suhanax264@gmail.com?subject=${subject}&body=${body}`;
      if (contactSubmitBtn) {
        contactSubmitBtn.innerHTML = originalBtnText;
        contactSubmitBtn.disabled = false;
      }
    }
  });

  // 7. Scroll Progress & 3D Scroll Reveals
  const scrollBar = document.getElementById("scroll-progress");
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollBar) scrollBar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    const devAmbient = document.querySelector(".hero-dev-ambient");
    if (devAmbient && window.scrollY < 700) {
      devAmbient.style.transform = `translateY(${(window.scrollY * 0.14).toFixed(1)}px)`;
    }
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  const revealTargets = document.querySelectorAll(".shelf-header, .about-story, .about-facts, .poster-card, .episode-row, .stack-card, .credit-panel, .contact-box");
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${Math.min(idx * 65, 260)}ms`;
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealTargets.forEach((el) => {
      el.classList.add("reveal-3d");
      obs.observe(el);
    });
  }

  // 8. 3D Interactive Card Tilt + Billboard Mouse Parallax
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReduced) {
    document.querySelectorAll(".about-story, .about-facts, .poster-card, .stack-card, .credit-panel").forEach((card) => {
      card.classList.add("tilt-3d");
      card.addEventListener("pointermove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rx = (-((y / rect.height) - 0.5) * 14).toFixed(2);
        const ry = (((x / rect.width) - 0.5) * 14).toFixed(2);
        card.style.setProperty("--mx", `${x}px`);
        card.style.setProperty("--my", `${y}px`);
        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px)`;
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });

    const billboard = document.querySelector(".billboard-content");
    const devAmbient = document.querySelector(".hero-dev-ambient");
    const heroSection = document.getElementById("hero");
    heroSection?.addEventListener("pointermove", (e) => {
      const rect = heroSection.getBoundingClientRect();
      heroSection.style.setProperty("--hx", `${e.clientX - rect.left}px`);
      heroSection.style.setProperty("--hy", `${e.clientY - rect.top}px`);

      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      if (billboard && window.innerWidth > 960) {
        billboard.style.transform = `rotateX(${(-ny * 2.5).toFixed(2)}deg) rotateY(${(nx * 3).toFixed(2)}deg)`;
      }
      if (devAmbient && window.innerWidth > 960) {
        devAmbient.style.transform = `translate3d(${(-nx * 14).toFixed(1)}px, ${(-ny * 9).toFixed(1)}px, 0)`;
      }
    });
    heroSection?.addEventListener("pointerleave", () => {
      if (billboard) billboard.style.transform = "";
      if (devAmbient) devAmbient.style.transform = "";
    });
  }

  // Role Typing Effect on First Page
    const typedRoleEl = document.getElementById("typed-role-series");
    if (typedRoleEl) {
      const roles = [
        "Python Django Developer",
        "Backend & REST API Developer",
        "Django & MySQL Engineer",
      ];
      let rIdx = 0;
      let cIdx = roles[0].length;
      let erasing = true;
      const stepType = () => {
        const current = roles[rIdx];
        if (erasing) {
          cIdx--;
          typedRoleEl.textContent = current.slice(0, cIdx);
          if (cIdx === 0) {
            erasing = false;
            rIdx = (rIdx + 1) % roles.length;
            setTimeout(stepType, 320);
            return;
          }
          setTimeout(stepType, 28);
        } else {
          cIdx++;
          typedRoleEl.textContent = current.slice(0, cIdx);
          if (cIdx === current.length) {
            erasing = true;
            setTimeout(stepType, 2400);
            return;
          }
          setTimeout(stepType, 48);
        }
      };
      setTimeout(stepType, 2400);
    }

    // Ambient Cursor Glow
    const cursorGlow = document.getElementById("cursor-glow");
    if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
      let mx = -500, my = -500, cx = -500, cy = -500;
      window.addEventListener("pointermove", (e) => {
        mx = e.clientX;
        my = e.clientY;
        cursorGlow.style.opacity = "1";
      }, { passive: true });
      window.addEventListener("mouseleave", () => {
        cursorGlow.style.opacity = "0";
      });
      const animCursor = () => {
        cx += (mx - cx) * 0.15;
        cy += (my - cy) * 0.15;
        cursorGlow.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
        requestAnimationFrame(animCursor);
      };
      requestAnimationFrame(animCursor);
    }

        // 9. ULTRA-PREMIUM CINEMATIC ENTRANCE SCREEN CONTROLLER
    const intro = document.getElementById("cinematic-intro");
    const introCanvas = document.getElementById("intro-particles-canvas");
    const skipBtn = document.getElementById("intro-skip-btn");
    const replayBtn = document.getElementById("btn-replay-intro");

    if (intro) {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isReplayRequested = window.location.hash === "#intro" || window.location.search.includes("intro");
      const hasSeenIntro = sessionStorage.getItem("suhana_cinematic_intro_seen");

      const dismissIntroInstantly = () => {
        sessionStorage.setItem("suhana_cinematic_intro_seen", "true");
        intro.classList.add("intro-hidden");
        intro.style.display = "none";
      };

      if (!isReplayRequested && (prefersReduced || hasSeenIntro === "true")) {
        dismissIntroInstantly();
      } else {
        let isDismissed = false;
        let animationFrameId = null;

        const dismissIntro = () => {
          if (isDismissed) return;
          isDismissed = true;
          sessionStorage.setItem("suhana_cinematic_intro_seen", "true");
          intro.classList.add("intro-closing");
          setTimeout(() => {
            intro.style.display = "none";
            intro.classList.add("intro-hidden");
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
          }, 850);
        };

        // Ambient Stardust Particles Canvas
        if (introCanvas) {
          const ctx = introCanvas.getContext("2d");
          let w = (introCanvas.width = window.innerWidth);
          let h = (introCanvas.height = window.innerHeight);

          const onResize = () => {
            if (isDismissed) return;
            w = introCanvas.width = window.innerWidth;
            h = introCanvas.height = window.innerHeight;
          };
          window.addEventListener("resize", onResize);

          const particles = [];
          const count = Math.min(50, Math.floor((w * h) / 25000));
          for (let i = 0; i < count; i++) {
            particles.push({
              x: Math.random() * w,
              y: Math.random() * h,
              vx: (Math.random() - 0.5) * 0.4,
              vy: -0.2 - Math.random() * 0.4,
              radius: 0.8 + Math.random() * 1.6,
              alpha: 0.15 + Math.random() * 0.55,
              pulseSpeed: 0.02 + Math.random() * 0.03,
              pulseVal: Math.random() * Math.PI
            });
          }

          const renderStardust = () => {
            if (isDismissed && intro.style.display === "none") return;
            ctx.clearRect(0, 0, w, h);

            for (let p of particles) {
              p.x += p.vx;
              p.y += p.vy;
              p.pulseVal += p.pulseSpeed;
              if (p.y < -10) p.y = h + 10;
              if (p.x < -10) p.x = w + 10;
              if (p.x > w + 10) p.x = -10;

              const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulseVal));
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(250, 255, 0, ${currentAlpha})`;
              ctx.shadowColor = "#FAFF00";
              ctx.shadowBlur = 10;
              ctx.fill();
            }
            animationFrameId = requestAnimationFrame(renderStardust);
          };
          animationFrameId = requestAnimationFrame(renderStardust);
        }

        // Auto-dissolve smoothly into homepage after 3.8 seconds
        const autoDismissTimer = setTimeout(() => {
          dismissIntro();
        }, 3800);

        if (skipBtn) {
          skipBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            clearTimeout(autoDismissTimer);
            dismissIntro();
          });
        }

        intro.addEventListener("click", () => {
          clearTimeout(autoDismissTimer);
          dismissIntro();
        });

        window.addEventListener("keydown", (e) => {
          if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
            clearTimeout(autoDismissTimer);
            dismissIntro();
          }
        });
      }
    }

    if (replayBtn) {
      replayBtn.addEventListener("click", () => {
        sessionStorage.removeItem("suhana_cinematic_intro_seen");
        window.location.hash = "intro";
        window.location.reload();
      });
    }

    // 10. SIGNATURE ANIMATION: PURE SCATTERING NEON DOTS & FLOATING STARDUST
    // Pure dot-like animation (no river lines or ribbon waves)
    const canvas = document.getElementById("stream-3d");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      let w = window.innerWidth;
      let h = window.innerHeight;

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      resize();
      window.addEventListener("resize", resize, { passive: true });

      const isMobile = window.innerWidth < 768 || ("ontouchstart" in window);
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Mouse tracking for interactive dot deflection
      const mouse = { x: -9999, y: -9999, active: false };
      window.addEventListener("pointermove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
      }, { passive: true });
      window.addEventListener("mouseleave", () => {
        mouse.active = false;
      });

      let lastScrollY = window.scrollY;
      let scrollVel = 0;
      let smoothScrollVel = 0;

      window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;
        scrollVel = currentScroll - lastScrollY;
        lastScrollY = currentScroll;
      }, { passive: true });

      // Dot Count: abundant floating stardust across the full viewport
      const dotCount = prefersReduced ? 50 : (isMobile ? 120 : 260);

      // Initialize individual floating dot
      const initDot = (dot, randomY = true) => {
        dot.x = Math.random() * w;
        dot.y = randomY ? Math.random() * h : h + 15 + Math.random() * 20;

        // Subtle multidirectional drift
        dot.vx = (Math.random() - 0.5) * (isMobile ? 0.35 : 0.55);
        dot.vy = -(0.18 + Math.random() * 0.45); // gentle upward float

        // Dot tiers
        const roll = Math.random();
        if (roll < 0.72) {
          // Micro dust speck
          dot.tier = 1;
          dot.r = 0.6 + Math.random() * 0.7; // 0.6 - 1.3px
          dot.baseAlpha = 0.25 + Math.random() * 0.45;
          dot.color = "neon";
        } else if (roll < 0.90) {
          // Medium glowing dot
          dot.tier = 2;
          dot.r = 1.4 + Math.random() * 0.8; // 1.4 - 2.2px
          dot.baseAlpha = 0.45 + Math.random() * 0.4;
          dot.color = Math.random() > 0.4 ? "neon" : "bright";
        } else {
          // Large star dot with halo
          dot.tier = 3;
          dot.r = 2.2 + Math.random() * 1.0; // 2.2 - 3.2px
          dot.baseAlpha = 0.75 + Math.random() * 0.25;
          dot.color = "white";
        }

        // Shimmer twinkle
        dot.twinkle = Math.random() * Math.PI * 2;
        dot.twinkleSpeed = 0.02 + Math.random() * 0.035;

        // Gentle organic wobble
        dot.wobblePhase = Math.random() * Math.PI * 2;
        dot.wobbleSpeed = 0.015 + Math.random() * 0.02;
        dot.wobbleAmp = 0.3 + Math.random() * 0.5;
      };

      const dots = Array.from({ length: dotCount }, () => {
        const d = {};
        initDot(d, true);
        return d;
      });

      // Render Loop (60 FPS) - PURE DOT ANIMATION ONLY
      const draw = () => {
        smoothScrollVel += (scrollVel - smoothScrollVel) * 0.1;
        scrollVel *= 0.9;
        const scrollOffset = smoothScrollVel * 0.4;

        ctx.clearRect(0, 0, w, h);

        // Additive blending for luminous glow
        ctx.globalCompositeOperation = "lighter";

        // Draw and update each pure dot
        dots.forEach((dot) => {
          dot.twinkle += dot.twinkleSpeed;
          dot.wobblePhase += dot.wobbleSpeed;

          // Natural movement + scroll parallax
          dot.x += dot.vx + Math.sin(dot.wobblePhase) * dot.wobbleAmp;
          dot.y += dot.vy - scrollOffset;

          let px = dot.x;
          let py = dot.y;

          // Interactive cursor deflection (dots gently scatter away from cursor)
          if (mouse.active) {
            const dx = px - mouse.x;
            const dy = py - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const repelRadius = 110;
            if (dist < repelRadius && dist > 1) {
              const force = (repelRadius - dist) / repelRadius;
              px += (dx / dist) * force * 14;
              py += (dy / dist) * force * 14;
            }
          }

          // Shimmering alpha calculation
          const shimmer = 0.65 + 0.35 * Math.sin(dot.twinkle);
          const alpha = Math.max(0.12, Math.min(1.0, dot.baseAlpha * shimmer));

          // Draw pure circular dot
          ctx.beginPath();
          ctx.arc(px, py, dot.r, 0, Math.PI * 2);

          if (dot.tier === 3) {
            // Sparkling star dot: diamond white center with electric neon yellow corona
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
            ctx.shadowColor = "#DFFF00";
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
          } else if (dot.tier === 2) {
            // Medium glowing dot: bright yellow
            ctx.fillStyle = `rgba(238, 255, 65, ${alpha.toFixed(2)})`;
            ctx.shadowColor = "rgba(223, 255, 0, 0.5)";
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0;
          } else {
            // Micro dust speck: neon lime
            ctx.fillStyle = `rgba(223, 255, 0, ${alpha.toFixed(2)})`;
            ctx.fill();
          }

          // Screen wrapping
          if (dot.x < -20) dot.x = w + 15;
          if (dot.x > w + 20) dot.x = -15;
          if (dot.y < -20) {
            initDot(dot, false);
          } else if (dot.y > h + 30) {
            dot.y = -10;
          }
        });

        // Reset blend mode
        ctx.globalCompositeOperation = "source-over";

        requestAnimationFrame(draw);
      };
      requestAnimationFrame(draw);
    }

    // 11. INTERACTIVE TECH SYMBOLS CONSTELLATION & INSPECTOR
    const skillBadges = document.querySelectorAll(".tech-symbol-badge");
    const skillTabs = document.querySelectorAll(".skill-tab");
    const inspectorIcon = document.getElementById("inspector-icon");
    const inspectorName = document.getElementById("inspector-name");
    const inspectorRole = document.getElementById("inspector-role");
    const inspectorDesc = document.getElementById("inspector-desc");

    if (skillBadges.length > 0) {
      // Hover / Focus handler for Skill Inspector
      const activateBadge = (badge) => {
        skillBadges.forEach(b => b.classList.remove("active-inspector"));
        badge.classList.add("active-inspector");

        const name = badge.getAttribute("data-name");
        const role = badge.getAttribute("data-role");
        const desc = badge.getAttribute("data-desc");
        const svgEl = badge.querySelector(".symbol-glass svg");

        if (inspectorName && name) inspectorName.textContent = name;
        if (inspectorRole && role) inspectorRole.textContent = role;
        if (inspectorDesc && desc) inspectorDesc.textContent = desc;

        if (inspectorIcon && svgEl) {
          inspectorIcon.innerHTML = svgEl.outerHTML;
        }
      };

      skillBadges.forEach((badge) => {
        badge.addEventListener("mouseenter", () => activateBadge(badge));
        badge.addEventListener("focus", () => activateBadge(badge));
        badge.addEventListener("click", () => activateBadge(badge));
      });

      // Category filter tabs
      skillTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          skillTabs.forEach(t => t.classList.remove("active"));
          tab.classList.add("active");

          const filter = tab.getAttribute("data-filter");

          if (filter === "all") {
            skillBadges.forEach(b => {
              b.classList.remove("dimmed");
              b.classList.remove("highlighted");
            });
          } else {
            skillBadges.forEach(b => {
              const cat = b.getAttribute("data-category");
              if (cat === filter) {
                b.classList.remove("dimmed");
                b.classList.add("highlighted");
              } else {
                b.classList.add("dimmed");
                b.classList.remove("highlighted");
              }
            });
          }
        });
      });
    }

})();
