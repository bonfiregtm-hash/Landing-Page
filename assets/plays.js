(function () {
  document.documentElement.classList.add("js");

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
