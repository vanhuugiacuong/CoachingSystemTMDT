import { renderStudentNavbar, renderSiteFooter } from "./layout.js";

const STORAGE_KEY = "mkd-code-lab-progress";

const problems = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Array", "Hash Map"],
    description:
      "Cho mảng số nguyên nums và target. Trả về chỉ số của hai phần tử sao cho tổng bằng target.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "nums[0] + nums[1] = 9"
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "nums[1] + nums[2] = 6"
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "Mỗi input có đúng một đáp án"
    ],
    testcases: [
      { input: "[2,7,11,15], 9", expected: "[0,1]" },
      { input: "[3,2,4], 6", expected: "[1,2]" },
      { input: "[3,3], 6", expected: "[0,1]" }
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {\n  // TODO: return indices of 2 numbers adding up to target\n  return [];\n}`,
      python: `def two_sum(nums, target):\n    # TODO: return indices of 2 numbers adding up to target\n    return []`,
      cpp: `#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // TODO: return indices\n    return {};\n}`
    }
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    tags: ["Stack", "String"],
    description:
      "Cho chuỗi chỉ chứa các ký tự (), {}, []. Hãy kiểm tra chuỗi có hợp lệ hay không.",
    examples: [
      { input: 's = "()[]{}"', output: "true", explanation: "Mọi cặp ngoặc đều đóng đúng thứ tự" },
      { input: 's = "(]"', output: "false", explanation: "Dấu ngoặc không khớp" }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s chỉ chứa các ký tự ()[]{}"
    ],
    testcases: [
      { input: '"()[]{}"', expected: "true" },
      { input: '"(]"', expected: "false" },
      { input: '"([{}])"', expected: "true" }
    ],
    starterCode: {
      javascript: `function isValid(s) {\n  // TODO: use stack to validate brackets\n  return false;\n}`,
      python: `def is_valid(s):\n    # TODO: use stack to validate brackets\n    return False`,
      cpp: `#include <string>\nusing namespace std;\n\nbool isValid(string s) {\n    // TODO: use stack to validate brackets\n    return false;\n}`
    }
  },
  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    tags: ["Array", "Dynamic Programming"],
    description:
      "Tìm tổng lớn nhất của một dãy con liên tiếp trong mảng nums.",
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "Dãy con [4,-1,2,1] có tổng lớn nhất là 6"
      },
      { input: "nums = [1]", output: "1", explanation: "Chỉ có một phần tử" }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    testcases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", expected: "6" },
      { input: "[1]", expected: "1" },
      { input: "[5,4,-1,7,8]", expected: "23" }
    ],
    starterCode: {
      javascript: `function maxSubArray(nums) {\n  // TODO: implement Kadane's algorithm\n  return 0;\n}`,
      python: `def max_sub_array(nums):\n    # TODO: implement Kadane's algorithm\n    return 0`,
      cpp: `#include <vector>\nusing namespace std;\n\nint maxSubArray(vector<int>& nums) {\n    // TODO: implement Kadane's algorithm\n    return 0;\n}`
    }
  }
];

const state = {
  problemId: problems[0].id,
  language: "javascript",
  selectedTestcase: 0,
  code: "",
  progress: loadProgress()
};

const problemListEl = document.getElementById("lab-problem-list");
const problemTitleEl = document.getElementById("lab-problem-title");
const problemLevelEl = document.getElementById("lab-problem-level");
const problemDescEl = document.getElementById("lab-problem-desc");
const examplesEl = document.getElementById("lab-problem-examples");
const constraintsEl = document.getElementById("lab-problem-constraints");
const testcasesEl = document.getElementById("lab-testcases");
const languageEl = document.getElementById("lab-language");
const editorEl = document.getElementById("lab-editor");
const outputEl = document.getElementById("lab-output");
const statusPillEl = document.getElementById("lab-status-pill");
const solvedCountEl = document.getElementById("lab-solved-count");
const attemptCountEl = document.getElementById("lab-attempt-count");
const streakEl = document.getElementById("lab-streak");

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { attempts: 0, solvedIds: [], streakDays: 1 };
    const parsed = JSON.parse(raw);
    return {
      attempts: Number.isFinite(parsed.attempts) ? parsed.attempts : 0,
      solvedIds: Array.isArray(parsed.solvedIds) ? parsed.solvedIds : [],
      streakDays: Number.isFinite(parsed.streakDays) ? parsed.streakDays : 1
    };
  } catch (error) {
    return { attempts: 0, solvedIds: [], streakDays: 1 };
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
}

function getCurrentProblem() {
  return problems.find((problem) => problem.id === state.problemId) || problems[0];
}

function difficultyClasses(level) {
  if (level === "Easy") return "bg-emerald-100 text-emerald-700";
  if (level === "Medium") return "bg-amber-100 text-amber-700";
  return "bg-rose-100 text-rose-700";
}

function renderProblemList() {
  problemListEl.innerHTML = problems
    .map((problem) => {
      const isActive = problem.id === state.problemId;
      const isSolved = state.progress.solvedIds.includes(problem.id);
      const activeClass = isActive
        ? "border-primary bg-primary/5"
        : "border-slate-200 bg-white hover:border-slate-300";

      return `
        <button
          type="button"
          data-problem-id="${problem.id}"
          class="w-full text-left rounded-xl border px-3 py-2 transition ${activeClass}"
        >
          <div class="flex items-center justify-between gap-3">
            <p class="text-sm font-semibold text-slate-900">${problem.title}</p>
            <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full ${difficultyClasses(problem.difficulty)}">${problem.difficulty}</span>
          </div>
          <div class="flex items-center justify-between mt-1">
            <p class="text-xs text-slate-500">${problem.tags.join(" • ")}</p>
            ${isSolved ? '<span class="text-[11px] text-emerald-700 font-semibold">Solved ✓</span>' : ""}
          </div>
        </button>
      `;
    })
    .join("");
}

function renderProblemDetail() {
  const problem = getCurrentProblem();
  problemTitleEl.textContent = problem.title;
  problemLevelEl.textContent = problem.difficulty;
  problemLevelEl.className = `text-[11px] font-semibold px-2 py-0.5 rounded-full ${difficultyClasses(problem.difficulty)}`;
  problemDescEl.textContent = problem.description;

  examplesEl.innerHTML = problem.examples
    .map(
      (example, index) => `
      <div class="rounded-xl bg-slate-50 border border-slate-100 p-3 text-sm text-slate-600">
        <p><span class="font-semibold text-slate-900">Example ${index + 1}</span></p>
        <p><span class="text-slate-500">Input:</span> <code class="text-slate-800">${example.input}</code></p>
        <p><span class="text-slate-500">Output:</span> <code class="text-slate-800">${example.output}</code></p>
        <p class="text-xs text-slate-500 mt-1">${example.explanation}</p>
      </div>
    `
    )
    .join("");

  constraintsEl.innerHTML = problem.constraints
    .map((item) => `<li>${item}</li>`)
    .join("");

  renderTestcases();
}

function renderTestcases() {
  const problem = getCurrentProblem();

  testcasesEl.innerHTML = problem.testcases
    .map((testcase, index) => {
      const active = index === state.selectedTestcase;
      return `
        <button
          type="button"
          data-test-index="${index}"
          class="w-full text-left rounded-xl border px-3 py-2 text-sm ${
            active
              ? "border-primary bg-primary/5"
              : "border-slate-200 bg-white hover:border-slate-300"
          }"
        >
          <p class="text-xs font-semibold text-slate-500 mb-1">Case ${index + 1}</p>
          <p class="text-slate-700"><span class="font-medium">Input:</span> ${testcase.input}</p>
          <p class="text-slate-700"><span class="font-medium">Expected:</span> ${testcase.expected}</p>
        </button>
      `;
    })
    .join("");
}

function loadStarterCode() {
  const problem = getCurrentProblem();
  const starter = problem.starterCode[state.language] || "";
  editorEl.value = starter;
  state.code = starter;
}

function updateStats() {
  solvedCountEl.textContent = String(state.progress.solvedIds.length);
  attemptCountEl.textContent = String(state.progress.attempts);
  streakEl.textContent = `${state.progress.streakDays} ngày`;
}

function evaluateCode() {
  const problem = getCurrentProblem();
  const code = (state.code || "").toLowerCase();
  const lang = state.language;

  const signatureChecks = {
    "two-sum": {
      javascript: ["return", "target", "for", "nums"],
      python: ["return", "target", "for", "nums"],
      cpp: ["return", "vector", "target", "nums"]
    },
    "valid-parentheses": {
      javascript: ["stack", "push", "pop", "return"],
      python: ["stack", "append", "pop", "return"],
      cpp: ["stack", "push", "pop", "return"]
    },
    "maximum-subarray": {
      javascript: ["return", "max", "nums", "for"],
      python: ["return", "max", "nums", "for"],
      cpp: ["return", "max", "nums", "for"]
    }
  };

  const checks = (signatureChecks[problem.id] && signatureChecks[problem.id][lang]) || [];
  const matched = checks.filter((token) => code.includes(token)).length;
  const confidence = checks.length === 0 ? 0 : matched / checks.length;

  const testcaseCount = problem.testcases.length;
  let passed = Math.max(0, Math.floor(confidence * testcaseCount));

  if (code.includes("todo") || code.includes("return []") || code.includes("return 0") || code.includes("return false")) {
    passed = Math.min(passed, 1);
  }

  const isStrong = confidence >= 0.75 && passed === testcaseCount;
  if (confidence >= 0.75) {
    passed = testcaseCount;
  }

  return {
    passed,
    total: testcaseCount,
    confidence,
    isStrong
  };
}

function printRunResult(result, mode) {
  const problem = getCurrentProblem();
  const now = new Date();
  const timestamp = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

  const testcaseLogs = problem.testcases
    .map((testcase, index) => {
      const passed = index < result.passed;
      const icon = passed ? "✅" : "❌";
      return `${icon} Case ${index + 1}: input(${testcase.input}) => expected ${testcase.expected}`;
    })
    .join("\n");

  const verdict = result.passed === result.total ? "Accepted" : "Wrong Answer";
  const summaryLine = `> ${verdict} • ${result.passed}/${result.total} test cases passed`;

  outputEl.textContent = [
    `> ${mode} @ ${timestamp}`,
    `> Problem: ${problem.title}`,
    testcaseLogs,
    summaryLine,
    `> Confidence score: ${(result.confidence * 100).toFixed(0)}%`
  ].join("\n");

  if (result.passed === result.total) {
    statusPillEl.textContent = "Accepted";
    statusPillEl.className = "text-[11px] font-semibold px-2 py-1 rounded-full bg-emerald-100 text-emerald-700";
  } else {
    statusPillEl.textContent = "Try again";
    statusPillEl.className = "text-[11px] font-semibold px-2 py-1 rounded-full bg-rose-100 text-rose-700";
  }
}

function runCode(mode) {
  state.code = editorEl.value;
  state.progress.attempts += 1;
  const result = evaluateCode();

  if (mode === "Submit" && result.passed === result.total) {
    if (!state.progress.solvedIds.includes(state.problemId)) {
      state.progress.solvedIds.push(state.problemId);
    }
    state.progress.streakDays = Math.min(state.progress.streakDays + 1, 99);
  }

  saveProgress();
  updateStats();
  renderProblemList();
  printRunResult(result, mode);
}

function bindEvents() {
  problemListEl.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-problem-id]");
    if (!button) return;

    state.problemId = button.dataset.problemId;
    state.selectedTestcase = 0;
    renderProblemList();
    renderProblemDetail();
    loadStarterCode();

    outputEl.textContent = '> Đã đổi bài tập. Nhấn "Run Code" để kiểm tra solution.';
    statusPillEl.textContent = "Sẵn sàng";
    statusPillEl.className = "text-[11px] font-semibold px-2 py-1 rounded-full bg-sky-100 text-sky-700";
  });

  testcasesEl.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-test-index]");
    if (!button) return;
    state.selectedTestcase = Number(button.dataset.testIndex);
    renderTestcases();
  });

  languageEl.addEventListener("change", () => {
    state.language = languageEl.value;
    loadStarterCode();
    outputEl.textContent = `> Đã chuyển ngôn ngữ sang ${languageEl.options[languageEl.selectedIndex].text}.`;
  });

  editorEl.addEventListener("input", () => {
    state.code = editorEl.value;
  });

  document.getElementById("lab-run-btn").addEventListener("click", () => runCode("Run"));
  document.getElementById("lab-submit-btn").addEventListener("click", () => runCode("Submit"));
  document.getElementById("lab-reset-btn").addEventListener("click", () => {
    loadStarterCode();
    outputEl.textContent = "> Đã reset về starter code.";
    statusPillEl.textContent = "Starter restored";
    statusPillEl.className = "text-[11px] font-semibold px-2 py-1 rounded-full bg-slate-200 text-slate-700";
  });
}

function init() {
  renderStudentNavbar("code-lab");
  renderSiteFooter();
  updateStats();
  renderProblemList();
  renderProblemDetail();
  loadStarterCode();
  bindEvents();
}

document.addEventListener("DOMContentLoaded", init);
