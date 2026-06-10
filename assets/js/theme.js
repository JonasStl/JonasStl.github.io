(function() {
  var storageKey = "theme";
  var mediaQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function getStoredTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (e) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (e) {}
  }

  function getSystemTheme() {
    return mediaQuery && mediaQuery.matches ? "dark" : "light";
  }

  function updateToggle(theme) {
    var toggle = document.getElementById("theme-toggle");
    var icon = document.getElementById("theme-icon");

    if (!toggle || !icon) {
      return;
    }

    icon.classList.toggle("fa-moon", theme === "dark");
    icon.classList.toggle("fa-sun", theme !== "dark");
    toggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    toggle.setAttribute("title", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }

  function applyTheme(theme) {
    var selectedTheme = theme || getStoredTheme() || getSystemTheme();

    if (selectedTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }

    updateToggle(selectedTheme);
  }

  function toggleTheme() {
    var currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    var nextTheme = currentTheme === "dark" ? "light" : "dark";
    setStoredTheme(nextTheme);
    applyTheme(nextTheme);
  }

  function bindToggle() {
    var toggle = document.getElementById("theme-toggle");

    if (toggle && !toggle.getAttribute("data-theme-toggle-bound")) {
      toggle.addEventListener("click", toggleTheme);
      toggle.setAttribute("data-theme-toggle-bound", "true");
    }
  }

  applyTheme();

  if (mediaQuery) {
    var onSystemThemeChange = function(event) {
      if (!getStoredTheme()) {
        applyTheme(event.matches ? "dark" : "light");
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", onSystemThemeChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(onSystemThemeChange);
    }
  }

  bindToggle();

  document.addEventListener("DOMContentLoaded", function() {
    bindToggle();
    applyTheme();
  });
}());
