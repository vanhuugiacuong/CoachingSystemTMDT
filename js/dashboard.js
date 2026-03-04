// dashboard.js
// Handles schedule rendering, modal open/close, and progress bar animation.

(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const sessions = getFakeSessions();
    renderSchedule(sessions);
    setupModalHandlers();
    animateProgressBars();
  });

  function getFakeSessions() {
    // Static data to simulate scheduled sessions
    return [
      {
        id: 1,
        dateTime: "Mon, 10:00 – 11:00",
        dateLabel: "This Monday",
        program: "Frontend Advanced",
        mentor: "Alex Rivera",
        focus: "Component patterns & state flows"
      },
      {
        id: 2,
        dateTime: "Wed, 19:00 – 20:00",
        dateLabel: "This Wednesday",
        program: "Backend Mastery",
        mentor: "Priya Singh",
        focus: "API design & data modeling"
      },
      {
        id: 3,
        dateTime: "Sat, 09:30 – 10:30",
        dateLabel: "This Saturday",
        program: "UI/UX Design",
        mentor: "Jordan Lee",
        focus: "Wireframe critique & design system"
      },
      {
        id: 4,
        dateTime: "Sun, 17:00 – 18:00",
        dateLabel: "Next Sunday",
        program: "Frontend Advanced",
        mentor: "Alex Rivera",
        focus: "Performance review & refactors"
      }
    ];
  }

  function renderSchedule(sessions) {
    const container = document.getElementById("schedule-list");
    if (!container) return;

    container.innerHTML = "";

    sessions.forEach(function (session) {
      const card = document.createElement("article");
      card.className = "schedule-card";

      const topRow = document.createElement("div");
      topRow.className = "schedule-footer";

      const titleWrapper = document.createElement("div");
      const title = document.createElement("div");
      title.className = "schedule-title";
      title.textContent = session.program;

      const time = document.createElement("div");
      time.className = "schedule-time";
      time.textContent = session.dateLabel;

      titleWrapper.appendChild(title);
      titleWrapper.appendChild(time);

      const joinButton = document.createElement("button");
      joinButton.className = "btn btn-primary";
      joinButton.type = "button";
      joinButton.textContent = "Join";
      joinButton.setAttribute("data-session-id", String(session.id));

      topRow.appendChild(titleWrapper);
      topRow.appendChild(joinButton);

      const metaRow = document.createElement("div");
      metaRow.className = "schedule-meta";

      const dateItem = document.createElement("div");
      dateItem.className = "schedule-meta-item";
      const dateLabel = document.createElement("span");
      dateLabel.className = "schedule-meta-label";
      dateLabel.textContent = "Time:";
      const dateValue = document.createElement("span");
      dateValue.textContent = session.dateTime;
      dateItem.appendChild(dateLabel);
      dateItem.appendChild(dateValue);

      const mentorItem = document.createElement("div");
      mentorItem.className = "schedule-meta-item";
      const mentorLabel = document.createElement("span");
      mentorLabel.className = "schedule-meta-label";
      mentorLabel.textContent = "Mentor:";
      const mentorValue = document.createElement("span");
      mentorValue.textContent = session.mentor;
      mentorItem.appendChild(mentorLabel);
      mentorItem.appendChild(mentorValue);

      const focusItem = document.createElement("div");
      focusItem.className = "schedule-meta-item";
      const focusLabel = document.createElement("span");
      focusLabel.className = "schedule-meta-label";
      focusLabel.textContent = "Focus:";
      const focusValue = document.createElement("span");
      focusValue.textContent = session.focus;
      focusItem.appendChild(focusLabel);
      focusItem.appendChild(focusValue);

      metaRow.appendChild(dateItem);
      metaRow.appendChild(mentorItem);
      metaRow.appendChild(focusItem);

      card.appendChild(topRow);
      card.appendChild(metaRow);

      container.appendChild(card);
    });

    container.addEventListener("click", function (event) {
      const button = event.target.closest("button[data-session-id]");
      if (!button) return;

      const id = Number(button.getAttribute("data-session-id"));
      const session = sessions.find(function (item) {
        return item.id === id;
      });

      if (!session) return;
      openSessionModal(session);
    });
  }

  function setupModalHandlers() {
    const overlay = document.getElementById("session-modal-overlay");
    const closeBtn = document.getElementById("modal-close-btn");
    const closeSecondary = document.getElementById("modal-close-secondary");

    if (!overlay) return;

    function closeModal() {
      overlay.classList.remove("active");
      overlay.setAttribute("aria-hidden", "true");
    }

    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) {
        closeModal();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }
    if (closeSecondary) {
      closeSecondary.addEventListener("click", closeModal);
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && overlay.classList.contains("active")) {
        closeModal();
      }
    });
  }

  function openSessionModal(session) {
    const overlay = document.getElementById("session-modal-overlay");
    if (!overlay) return;

    const dateEl = document.getElementById("modal-date-time");
    const programEl = document.getElementById("modal-program");
    const mentorEl = document.getElementById("modal-mentor");

    if (dateEl) dateEl.textContent = session.dateTime + " (" + session.dateLabel + ")";
    if (programEl) programEl.textContent = session.program;
    if (mentorEl) mentorEl.textContent = session.mentor;

    overlay.classList.add("active");
    overlay.setAttribute("aria-hidden", "false");
  }

  function animateProgressBars() {
    const bars = document.querySelectorAll(".progress-bar");
    if (!bars.length) return;

    setTimeout(function () {
      bars.forEach(function (bar) {
        var value = bar.getAttribute("data-progress");
        var numeric = value ? parseInt(value, 10) : 0;
        if (isNaN(numeric)) numeric = 0;
        numeric = Math.min(Math.max(numeric, 0), 100);
        bar.style.width = numeric + "%";
      });
    }, 150);
  }
})();

