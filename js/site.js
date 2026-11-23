/* Sioux City Foundry Co. - Concept Site Runtime
 * Handles Precision Light vs Executive Dark switching (?theme=light|dark + localStorage),
 * mobile menu, shareable job links, and the browser-only HR Quick-Publish demo store.
 */

(function () {
  var THEME_KEY = "scf_concept_theme_v1";
  var JOBS_OVERRIDE_KEY = "scf_concept_jobs_demo_v1";

  function resolveInitialTheme() {
    var params = new URLSearchParams(window.location.search);
    var q = params.get("theme");
    if (q === "light" || q === "dark") {
      try { localStorage.setItem(THEME_KEY, q); } catch (e) {}
      return q;
    }
    try {
      var saved = localStorage.getItem(THEME_KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch (e) {}
    return "light";
  }

  function applyTheme(mode) {
    var m = mode === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", m);
    document.documentElement.style.colorScheme = m;
    try { localStorage.setItem(THEME_KEY, m); } catch (e) {}
    var btns = document.querySelectorAll("[data-set-theme]");
    for (var i = 0; i < btns.length; i++) {
      var b = btns[i];
      var active = b.getAttribute("data-set-theme") === m;
      b.classList.toggle("active", active);
      b.setAttribute("aria-pressed", active ? "true" : "false");
    }
  }

  // Apply immediately before first paint to prevent flash
  applyTheme(resolveInitialTheme());

  function showToast(msg) {
    var el = document.getElementById("scf-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "scf-toast";
      el.className = "toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.style.display = "block";
    clearTimeout(el._t);
    el._t = setTimeout(function () {
      el.style.display = "none";
    }, 2600);
  }

  function copyText(text, label) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast(label || "Link copied to clipboard");
      }).catch(function () {
        showToast("Copy link: " + text);
      });
    } else {
      showToast("Link: " + text);
    }
  }

  function formatDate(iso) {
    if (!iso) return "";
    var parts = String(iso).split("-");
    if (parts.length < 3) return iso;
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var m = parseInt(parts[1], 10) - 1;
    var d = parseInt(parts[2], 10);
    if (isNaN(m) || m < 0 || m > 11 || isNaN(d)) return iso;
    return months[m] + " " + d + ", " + parts[0];
  }

  function loadJobsData() {
    return fetch("./data/jobs.json")
      .then(function (r) { return r.json(); })
      .then(function (baseJobs) {
        try {
          var raw = sessionStorage.getItem(JOBS_OVERRIDE_KEY);
          if (raw) {
            var parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) return parsed;
          }
        } catch (e) {}
        return baseJobs;
      });
  }

  function saveDemoJobs(jobs) {
    try {
      sessionStorage.setItem(JOBS_OVERRIDE_KEY, JSON.stringify(jobs));
    } catch (e) {}
  }

  function resetDemoJobs() {
    try {
      sessionStorage.removeItem(JOBS_OVERRIDE_KEY);
    } catch (e) {}
  }

  function loadNewsData() {
    return fetch("./data/news.json").then(function (r) { return r.json(); });
  }

  window.SCF = {
    applyTheme: applyTheme,
    getTheme: function () { return document.documentElement.getAttribute("data-theme") || "light"; },
    showToast: showToast,
    copyText: copyText,
    formatDate: formatDate,
    loadJobsData: loadJobsData,
    saveDemoJobs: saveDemoJobs,
    resetDemoJobs: resetDemoJobs,
    loadNewsData: loadNewsData
  };

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(window.SCF.getTheme());

    // Bind theme buttons
    document.querySelectorAll("[data-set-theme]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var mode = btn.getAttribute("data-set-theme");
        applyTheme(mode);
        showToast(mode === "dark" ? "Switched to Executive Dark (SCF-3b)" : "Switched to Precision Light (SCF-1b)");
      });
    });

    // Mobile menu
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.getElementById("nav-menu");
    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        var open = menu.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    // Active nav highlight
    var page = document.body.getAttribute("data-page");
    if (page) {
      var activeLink = document.querySelector('.nav-links a[data-nav="' + page + '"]');
      if (activeLink) activeLink.classList.add("active");
    }
  });
})();
