(function () {
  function normalize(path) {
    return path.replace(/\/+$/, "") || "/";
  }

  function markActiveNav() {
    var current = normalize(window.location.pathname);
    document.querySelectorAll("[data-nav]").forEach(function (link) {
      var target = normalize(link.getAttribute("href") || "");
      if (!target) {
        return;
      }
      if (current === target || (target !== "/" && current.indexOf(target) === 0)) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function attachFieldClearOnInput() {
    document.querySelectorAll("form input, form select, form textarea").forEach(function (input) {
      input.addEventListener("input", function () {
        input.classList.remove("is-invalid");
      });
      input.addEventListener("change", function () {
        input.classList.remove("is-invalid");
      });
    });
  }

  function attachSubmitState() {
    document.querySelectorAll("form").forEach(function (form) {
      form.addEventListener("submit", function () {
        var submit = form.querySelector("button[type='submit'], input[type='submit']");
        if (!submit) {
          return;
        }
        submit.dataset.originalText = submit.dataset.originalText || submit.textContent;
        submit.textContent = "Processing...";
        submit.disabled = true;
        window.setTimeout(function () {
          if (submit.disabled) {
            submit.disabled = false;
            submit.textContent = submit.dataset.originalText;
          }
        }, 6000);
      });
    });
  }

  function initBackToTop() {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "back-to-top";
    button.setAttribute("aria-label", "Back to top");
    button.innerHTML = "&#8593;";
    document.body.appendChild(button);

    function syncVisibility() {
      if (window.scrollY > 240) {
        button.classList.add("show");
      } else {
        button.classList.remove("show");
      }
    }

    button.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    window.addEventListener("scroll", syncVisibility, { passive: true });
    syncVisibility();
  }

  document.addEventListener("DOMContentLoaded", function () {
    markActiveNav();
    attachFieldClearOnInput();
    attachSubmitState();
    initBackToTop();
  });
})();
