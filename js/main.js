/* ===========================================================================
   M. Shakif Rabbani · Portfolio interactions
   Everything here is progressive enhancement. Without this file the page is complete and readable:
   no content starts hidden in the HTML or CSS, and each feature checks for reduced motion and API support.
   =========================================================================== */
(() => {
  "use strict";

  const root = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
  const pointerQuery = matchMedia("(hover: hover) and (pointer: fine)");
  const reducedMotion = () => motionQuery.matches;
  const hasIO = "IntersectionObserver" in window;
  const belowFold = (el) => el.getBoundingClientRect().top > innerHeight * 0.9;

  /* ---------- Theme toggle with a circular reveal ---------- */
  function initTheme() {
    const btn = $("#theme-toggle");
    if (!btn) return;
    const lightQuery = matchMedia("(prefers-color-scheme: light)");
    const isDark = () => {
      const chosen = root.getAttribute("data-theme");
      return chosen ? chosen === "dark" : !lightQuery.matches;
    };
    const sync = () => {
      const dark = isDark();
      btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      $("use", btn).setAttribute("href", dark ? "#ic-sun" : "#ic-moon");
    };
    const apply = (theme) => {
      root.setAttribute("data-theme", theme);
      try { localStorage.setItem("theme", theme); } catch (e) { /* storage blocked: theme still applies */ }
      sync();
    };

    // Decide the next theme inside the update callback, so rapid clicks always alternate.
    const toggle = () => apply(isDark() ? "light" : "dark");
    btn.addEventListener("click", () => {
      if (!document.startViewTransition || reducedMotion()) { toggle(); return; }
      const r = btn.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      const transition = document.startViewTransition(toggle);
      transition.ready.then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 650, easing: "cubic-bezier(0.2, 0.7, 0.1, 1)", pseudoElement: "::view-transition-new(root)" }
        );
      }).catch(() => {});
    });
    lightQuery.addEventListener?.("change", sync);
    sync();
  }

  /* ---------- Navigation: mobile menu + sliding active-section indicator ---------- */
  function initNav() {
    const header = $(".site-header");
    const list = $(".nav-links");
    const indicator = $(".nav-indicator");
    const links = $$(".nav-links a");
    const menuBtn = $(".menu-btn");
    const menu = $("#mobile-menu");

    if (menuBtn && menu) {
      const isOpen = () => menuBtn.getAttribute("aria-expanded") === "true";
      const setMenu = (open) => {
        menuBtn.setAttribute("aria-expanded", String(open));
        menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        $("use", menuBtn).setAttribute("href", open ? "#ic-close" : "#ic-menu");
        menu.hidden = !open;
      };
      menuBtn.addEventListener("click", () => setMenu(!isOpen()));
      menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isOpen()) { setMenu(false); menuBtn.focus(); }
      });
      document.addEventListener("click", (e) => { if (isOpen() && !header.contains(e.target)) setMenu(false); });
      matchMedia("(min-width: 821px)").addEventListener?.("change", (e) => { if (e.matches) setMenu(false); });
    }

    if (!hasIO || !indicator || !list) return;
    const sections = new Map();
    links.forEach((link) => {
      const target = document.querySelector(link.hash);
      if (target) sections.set(target, link);
    });
    let current = null;
    const moveTo = (link) => {
      current = link;
      links.forEach((l) => (l === link ? l.setAttribute("aria-current", "true") : l.removeAttribute("aria-current")));
      if (!link) { indicator.style.opacity = "0"; return; }
      const lr = link.getBoundingClientRect();
      const pr = list.getBoundingClientRect();
      indicator.style.width = `${lr.width}px`;
      indicator.style.transform = `translateX(${lr.left - pr.left}px)`;
      indicator.style.opacity = "1";
    };
    // A thin band across the middle of the viewport decides which section is "current".
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) moveTo(sections.get(e.target) || null); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((_, section) => io.observe(section));
    ["#top", "#contact"].forEach((sel) => { const el = $(sel); if (el) io.observe(el); });
    addEventListener("resize", () => { if (current) moveTo(current); }, { passive: true });
  }

  /* ---------- Scroll-linked UI: progress bar, header state, back-to-top, timeline ---------- */
  function initScroll() {
    const header = $(".site-header");
    const bar = $(".progress");
    const toTop = $(".to-top");
    const timeline = $(".timeline");
    const fill = $(".timeline-fill");
    const items = $$(".tl-item");
    let queued = false;

    const update = () => {
      queued = false;
      const y = scrollY;
      const max = root.scrollHeight - innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? clamp(y / max, 0, 1) : 0})`;
      header?.classList.toggle("is-scrolled", y > 16);
      toTop?.classList.toggle("is-visible", y > innerHeight * 0.9);

      if (timeline && fill) {
        let progress = 1;
        if (!reducedMotion()) {
          const r = timeline.getBoundingClientRect();
          progress = clamp((innerHeight * 0.62 - r.top) / r.height, 0, 1);
        }
        fill.style.transform = `scaleY(${progress})`;
        const reached = progress * timeline.offsetHeight;
        items.forEach((item) => item.classList.toggle("is-waiting", item.offsetTop + 40 > reached));
      }
    };
    const request = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
    addEventListener("scroll", request, { passive: true });
    addEventListener("resize", request, { passive: true });
    update();
  }

  /* ---------- Scroll reveal + one-shot "in view" triggers ---------- */
  function initReveal() {
    if (!hasIO || reducedMotion()) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.remove("is-pending");
        io.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0 });

    $$("[data-reveal], [data-inview]").forEach((el) => {
      if (!belowFold(el)) return; // never hide what is already on screen
      el.classList.add("is-pending");
      io.observe(el);
    });
  }

  /* ---------- Count-up numbers (the final value is already in the HTML) ---------- */
  function initCounters() {
    if (!hasIO || reducedMotion()) return;
    const run = (el) => {
      const raw = el.dataset.count;
      const target = parseFloat(raw);
      const decimals = (raw.split(".")[1] || "").length;
      const start = performance.now();
      const duration = 1600;
      const frame = (now) => {
        const t = clamp((now - start) / duration, 0, 1);
        const eased = 1 - Math.pow(1 - t, 4);
        el.textContent = (target * eased).toFixed(decimals);
        if (t < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        run(e.target);
      });
    }, { threshold: 0.6 });

    $$("[data-count]").forEach((el) => {
      if (!belowFold(el)) return;
      el.textContent = (0).toFixed((el.dataset.count.split(".")[1] || "").length);
      io.observe(el);
    });
  }

  /* ---------- Run looping card animations only while the card is on screen ---------- */
  function initLive() {
    if (reducedMotion()) return;
    const els = $$("[data-live]");
    if (!hasIO) { els.forEach((el) => el.classList.add("is-live")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.target.classList.toggle("is-live", e.isIntersecting));
    }, { threshold: 0.2 });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- Pointer effects (desktop only) ---------- */
  function initSpotlight() {
    if (!pointerQuery.matches) return;
    $$("[data-spotlight]").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }, { passive: true });
    });
  }

  function initMagnetic() {
    if (!pointerQuery.matches || reducedMotion()) return;
    $$("[data-magnetic]").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.2;
        const y = (e.clientY - r.top - r.height / 2) * 0.3;
        el.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
      }, { passive: true });
      el.addEventListener("pointerleave", () => { el.style.translate = ""; });
    });
  }

  function initTilt() {
    const hero = $(".hero");
    const target = $(".pos-tilt");
    if (!hero || !target || !pointerQuery.matches || reducedMotion()) return;
    let frame = 0;
    let nx = 0;
    let ny = 0;
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      nx = (e.clientX - r.left) / r.width - 0.5;
      ny = (e.clientY - r.top) / r.height - 0.5;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        target.style.setProperty("--ry", `${(nx * 9).toFixed(2)}deg`);
        target.style.setProperty("--rx", `${(-ny * 7).toFixed(2)}deg`);
      });
    }, { passive: true });
    hero.addEventListener("pointerleave", () => {
      target.style.setProperty("--rx", "0deg");
      target.style.setProperty("--ry", "0deg");
    });
  }

  /* ---------- Hero POS demo: ring up an order, lose the connection, pay, print to kitchen, sync ---------- */
  function initPosDemo() {
    const stage = $(".pos-stage");
    if (!stage || reducedMotion()) return;

    const rows = $$(".pos-row", stage);
    const totalEl = $("[data-pos-total]", stage);
    const chargeEl = $("[data-pos-charge]", stage);
    const status = $(".pos-status", stage);
    const statusText = $("[data-pos-status]", stage);
    const alertText = $("[data-pos-alert]", stage);
    const alertIcon = $(".pos-alert use", stage);
    const charge = $(".pos-charge", stage);
    const ticket = $(".pos-ticket", stage);
    const amounts = rows.map((r) => Number(r.dataset.amount) || 0);
    const fullTotal = amounts.reduce((a, b) => a + b, 0);
    const money = (n) => `Rs ${Math.round(n).toLocaleString("en-US")}`;
    const NET = {
      online: { label: "Online" },
      offline: { label: "Offline", message: "No connection. Orders are saved on this device.", icon: "#ic-offline" },
      synced: { label: "Synced", message: "Back online. Order #1042 synced.", icon: "#ic-cloud" },
    };

    let timers = [];
    let tween = 0;
    let shown = fullTotal;
    let running = false;
    let ready = false;
    let inView = true;

    const later = (ms, fn) => timers.push(setTimeout(fn, ms));
    const showTotal = (value) => {
      shown = value;
      totalEl.textContent = money(value);
      chargeEl.textContent = money(value);
    };
    const tweenTotal = (to) => {
      cancelAnimationFrame(tween);
      const from = shown;
      const start = performance.now();
      const step = (now) => {
        const t = clamp((now - start) / 450, 0, 1);
        showTotal(from + (to - from) * (1 - Math.pow(1 - t, 3)));
        if (t < 1) tween = requestAnimationFrame(step);
      };
      tween = requestAnimationFrame(step);
      // Fallback for throttled frames (background iframes, power saving): always land on the final value.
      later(520, () => { cancelAnimationFrame(tween); showTotal(to); });
    };
    const setNet = (state) => {
      const net = NET[state];
      stage.dataset.net = state;
      status.dataset.state = state;
      statusText.textContent = net.label;
      if (net.message) {
        alertText.textContent = net.message;
        alertIcon?.setAttribute("href", net.icon);
      }
    };
    const reset = () => {
      rows.forEach((r) => r.classList.remove("is-in"));
      ticket.classList.remove("is-in");
      charge.classList.remove("is-paid", "is-pressed");
      cancelAnimationFrame(tween);
      showTotal(0);
      setNet("online");
    };
    const cycle = () => {
      reset();
      let sum = 0;
      rows.forEach((row, i) => later(700 + i * 850, () => {
        row.classList.add("is-in");
        sum += amounts[i];
        tweenTotal(sum);
      }));
      later(3400, () => setNet("offline"));
      later(4400, () => charge.classList.add("is-pressed"));
      later(4650, () => { charge.classList.remove("is-pressed"); charge.classList.add("is-paid"); });
      later(5100, () => ticket.classList.add("is-in"));
      later(6900, () => setNet("synced"));
      later(8900, () => setNet("online"));
      later(9800, () => stage.classList.add("is-clearing"));
      later(10300, () => { stage.classList.remove("is-clearing"); cycle(); });
    };
    const start = () => {
      if (running) return;
      running = true;
      stage.classList.add("is-playing");
      cycle();
    };
    const stop = () => {
      if (!running) return;
      running = false;
      timers.forEach(clearTimeout);
      timers = [];
      cancelAnimationFrame(tween);
      // Paused state = the complete order, so the demo never freezes half-drawn.
      stage.classList.remove("is-playing", "is-clearing");
      charge.classList.remove("is-pressed", "is-paid");
      showTotal(fullTotal);
      setNet("online");
    };
    const evaluate = () => {
      if (!ready) return;
      if (inView && !document.hidden) start();
      else stop();
    };

    if (hasIO) {
      new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; evaluate(); }, { threshold: 0.15 }).observe(stage);
    }
    document.addEventListener("visibilitychange", evaluate);
    setTimeout(() => { ready = true; evaluate(); }, 1100); // let the intro animation land first
  }

  /* ---------- Copy email + toast ---------- */
  function initCopy() {
    const toast = $(".toast");
    let hideTimer = 0;
    const notify = (message) => {
      if (!toast) return;
      toast.textContent = message;
      toast.classList.add("is-visible");
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => toast.classList.remove("is-visible"), 2400);
    };

    $$("[data-copy]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const text = btn.dataset.copy;
        const fallback = () => {
          const target = document.getElementById(btn.dataset.copyTarget || "");
          if (target) {
            const range = document.createRange();
            range.selectNodeContents(target);
            const selection = getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
          }
          notify("Email selected. Press Ctrl+C or Cmd+C to copy it.");
        };
        if (!navigator.clipboard?.writeText) { fallback(); return; }
        navigator.clipboard.writeText(text).then(() => {
          notify("Email copied to clipboard");
          btn.classList.add("is-done");
          setTimeout(() => btn.classList.remove("is-done"), 1800);
        }, fallback);
      });
    });
  }

  function initYear() {
    const el = $("#year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  // Each feature is isolated, so one failure never takes the rest of the page down with it.
  [initTheme, initNav, initScroll, initReveal, initCounters, initLive, initSpotlight, initMagnetic, initTilt, initPosDemo, initCopy, initYear]
    .forEach((init) => {
      try { init(); } catch (err) { console.error(`[portfolio] ${init.name} failed`, err); }
    });
})();
