/* Bonfire GTM site chrome: Product dropdown + current-page link. Loaded on every page. */
(function () {
  var path = location.pathname.replace(/\/+$/, "") || "/";
  document.querySelectorAll(".x-nav a[href], .x-ft__links a[href]").forEach(function (a) {
    var h = a.getAttribute("href").replace(/\/+$/, "") || "/";
    if (h === path && h !== "/") a.setAttribute("aria-current", "page");
  });
  var dd = document.getElementById("x-dd");
  if (!dd) return;
  var ddBtn = dd.querySelector(".x-dd__btn");
  function ddSet(open) { dd.classList.toggle("is-open", open); ddBtn.setAttribute("aria-expanded", open ? "true" : "false"); }
  ddBtn.addEventListener("click", function () { ddSet(!dd.classList.contains("is-open")); });
  dd.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && dd.classList.contains("is-open")) { ddSet(false); ddBtn.focus(); }
  if (e.key === "ArrowDown" && document.activeElement === ddBtn) { e.preventDefault(); ddSet(true); dd.querySelector(".x-dd__menu a").focus(); }
  });
  dd.addEventListener("focusout", function (e) { if (!dd.contains(e.relatedTarget)) ddSet(false); });
  document.addEventListener("click", function (e) { if (!dd.contains(e.target)) ddSet(false); });
})();
