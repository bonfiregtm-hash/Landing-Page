/* Bonfire GTM site behaviour shared by every page: announcement dismiss, header hairline on scroll, mobile menu.
   (The Product dropdown and current-page marker live in chrome.js.) */
(function () {
  var ann = document.getElementById("ann");
  var annX = ann && ann.querySelector(".x-ann__x");
  if (annX) annX.addEventListener("click", function () { ann.hidden = true; });

  var head = document.getElementById("head");
  if (!head) return;
  var menu = head.querySelector(".x-menu");
  function onScroll() { head.classList.toggle("is-scrolled", head.getBoundingClientRect().top <= 0 && window.scrollY > 4); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  if (!menu) return;
  function close() { head.classList.remove("is-open"); menu.setAttribute("aria-expanded", "false"); menu.setAttribute("aria-label", "Open menu"); }
  menu.addEventListener("click", function () {
    var open = head.classList.toggle("is-open");
    menu.setAttribute("aria-expanded", open); menu.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  head.querySelectorAll(".x-nav a").forEach(function (a) { a.addEventListener("click", close); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && head.classList.contains("is-open")) { close(); menu.focus(); }
  });
})();
