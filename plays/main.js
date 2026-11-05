(function () {
  document.documentElement.classList.add("js");
  /* partial:header script (from landing-reference-v4.html) */
  /* 2. Header: hairline on scroll, mobile menu */
  var head = document.getElementById("head"), menu = head.querySelector(".x-menu");
  function onScroll() { head.classList.toggle("is-scrolled", head.getBoundingClientRect().top <= 0 && window.scrollY > 4); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  menu.addEventListener("click", function () {
    var open = head.classList.toggle("is-open");
    menu.setAttribute("aria-expanded", open); menu.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  head.querySelectorAll(".x-nav a").forEach(function (a) {
    a.addEventListener("click", function () { head.classList.remove("is-open"); menu.setAttribute("aria-expanded", "false"); });
  });

  /* 2b. Product dropdown: click/Enter toggles, Escape and outside click close */
  var dd = document.getElementById("x-dd"), ddBtn = dd.querySelector(".x-dd__btn");
  function ddSet(open) { dd.classList.toggle("is-open", open); ddBtn.setAttribute("aria-expanded", open ? "true" : "false"); }
  ddBtn.addEventListener("click", function () { ddSet(!dd.classList.contains("is-open")); });
  dd.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && dd.classList.contains("is-open")) { ddSet(false); ddBtn.focus(); }
    if (e.key === "ArrowDown" && document.activeElement === ddBtn) { e.preventDefault(); ddSet(true); dd.querySelector(".x-dd__menu a").focus(); }
  });
  dd.addEventListener("focusout", function (e) { if (!dd.contains(e.relatedTarget)) ddSet(false); });
  document.addEventListener("click", function (e) { if (!dd.contains(e.target)) ddSet(false); });
  /* /partial:header script */

  // Toggles (on/off switches) and the plays tally
  var tally = document.querySelector("[data-tally]");
  function updateTally() {
    if (!tally) return;
    var rows = document.querySelectorAll("[data-plays] tr");
    var on = 0;
    rows.forEach(function (r) {
      var t = r.querySelector(".x-tg");
      var isOn = t && t.getAttribute("aria-checked") === "true";
      r.classList.toggle("is-off", !isOn);
      if (isOn) on++;
    });
    tally.textContent = on + " of " + rows.length + " plays on · 0 monitors on";
  }
  document.querySelectorAll(".x-tg").forEach(function (t) {
    t.addEventListener("click", function () {
      t.setAttribute("aria-checked", t.getAttribute("aria-checked") === "true" ? "false" : "true");
      updateTally();
    });
  });

  // Approve / Skip on example matches
  document.querySelectorAll("[data-matches] .x-m").forEach(function (row) {
    var act = row.querySelector(".x-m__act");
    var ok = row.querySelector("[data-approve]");
    var skip = row.querySelector("[data-skip]");
    if (ok) ok.addEventListener("click", function () {
      row.classList.add("is-ok");
      act.innerHTML = '<span class="x-m__done">In Leads</span>';
    });
    if (skip) skip.addEventListener("click", function () {
      row.classList.add("is-skip");
      act.innerHTML = '<span class="x-m__done" style="text-decoration:none;color:var(--x-text-2)">Skipped</span>';
    });
  });

  // Tooltip on disabled Approve for touch
  document.querySelectorAll(".x-tip").forEach(function (tip) {
    tip.addEventListener("click", function () { tip.classList.toggle("is-show"); });
  });

  // Reveal on scroll
  var els = document.querySelectorAll(".x-rv");
  if (!("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("is-in"); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  els.forEach(function (el) { io.observe(el); });
})();
