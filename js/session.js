import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Firebase config dùng chung (đồng bộ với auth.html / dashboard.html)
const firebaseConfig = {
  apiKey: "AIzaSyBapOvYWZyuUPb1cWOAen6H95MpoLJtzpA",
  authDomain: "fir-e1171.firebaseapp.com",
  projectId: "fir-e1171",
  storageBucket: "fir-e1171.firebasestorage.app",
  messagingSenderId: "604994482307",
  appId: "1:604994482307:web:15917def2b6580b75aebb6",
  measurementId: "G-XKBJMTM0YW"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);

// TODO: Dán gmail admin của bạn vào đây (lowercase)
export const ADMIN_EMAILS = [
  "vanhuugiacuong@gmail.com",
  "minhnhut006lob@gmail.com"
];

// TODO: Dán gmail mentor của bạn vào đây (lowercase)
export const MENTOR_EMAILS = [
  "vanhuugiacuong174@gmail.com",
];

export function isAdminEmail(email) {
  return ADMIN_EMAILS.includes(String(email || "").toLowerCase());
}

export function isMentorEmail(email) {
  return MENTOR_EMAILS.includes(String(email || "").toLowerCase());
}

export function getRoleFromEmail(email) {
  const e = String(email || "").toLowerCase();
  if (isAdminEmail(e)) return "admin";
  if (isMentorEmail(e)) return "mentor";
  return "student";
}

export function bindAdminLogout({ redirectTo = "auth.html" } = {}) {
  document.addEventListener("click", async (event) => {
    const btn = event.target?.closest?.("#mkd-logout-btn");
    if (!btn) return;
    event.preventDefault();
    try {
      await signOut(auth);
    } finally {
      window.location.href = redirectTo;
    }
  });
}

export function requireAdmin({ redirectTo = "auth.html", denyTo = "dashboard.html" } = {}) {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = redirectTo;
        return;
      }

      const email = (user.email || "").toLowerCase();
      if (!isAdminEmail(email)) {
        window.location.href = denyTo;
        return;
      }

      // Fill navbar identity if available
      const emailEl = document.getElementById("mkd-user-email");
      const initialEl = document.getElementById("mkd-user-initial");
      if (emailEl) emailEl.textContent = user.displayName || user.email || "Admin";
      if (initialEl) {
        const initial = (user.displayName || user.email || "A").trim()[0] || "A";
        initialEl.textContent = initial.toUpperCase();
      }

      resolve(user);
    });
  });
}

export function requireMentor({ redirectTo = "auth.html", denyTo = "dashboard.html" } = {}) {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = redirectTo;
        return;
      }
      const email = (user.email || "").toLowerCase();
      if (!isMentorEmail(email) && !isAdminEmail(email)) {
        window.location.href = denyTo;
        return;
      }
      const emailEl = document.getElementById("mkd-user-email");
      const initialEl = document.getElementById("mkd-user-initial");
      if (emailEl) emailEl.textContent = user.displayName || user.email || "Mentor";
      if (initialEl) {
        const initial = (user.displayName || user.email || "M").trim()[0] || "M";
        initialEl.textContent = initial.toUpperCase();
      }
      resolve(user);
    });
  });
}

