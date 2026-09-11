(() => {
  "use strict";
  // Progressive enhancement: text and the completed conversation are the HTML default.
  if (!Element.prototype.animate || !window.IntersectionObserver) return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  const ease = "cubic-bezier(.16,1,.3,1)";
  const records = new Set();
  const conversations = [];
  let paused = false;
  const canMove = () => !paused && !reduced.matches && !document.hidden;
  const buttons = [...document.querySelectorAll(".motion-toggle")];
  function sync() {
    document.documentElement.classList.toggle(
      "motion-paused",
      paused || reduced.matches,
    );
    for (const record of records) {
      if (record.animation.playState === "finished") continue;
      if (canMove() && record.group.visible) record.animation.play();
      else record.animation.pause();
    }
    buttons.forEach((button) => {
      button.hidden = reduced.matches;
      button.setAttribute("aria-pressed", String(paused));
      button.querySelector("[data-motion-label]").textContent = paused
        ? "Retomar animações"
        : "Pausar animações";
    });
  }
  function animate(node, frames, timing, group) {
    const animation = node.animate(frames, timing);
    records.add({ animation, group });
    if (!canMove() || !group.visible) animation.pause();
    return animation;
  }
  function cancelGroup(group) {
    for (const record of records)
      if (record.group === group) {
        record.animation.cancel();
        records.delete(record);
      }
  }
  buttons.forEach((button) =>
    button.addEventListener("click", () => {
      paused = !paused;
      sync();
    }),
  );
  document.addEventListener("visibilitychange", sync);

  document.querySelectorAll("[data-conversation]").forEach((figure) => {
    const group = { visible: false, started: false, figure };
    const messages = [...figure.querySelectorAll("[data-message]")];
    const replay = figure.querySelector("[data-replay]");
    const opening = figure.classList.contains("hero-conversation");
    const content = messages.map((message) => {
      const body = document.createElement("div");
      body.className = "message-content";
      while (message.firstChild) body.append(message.firstChild);
      message.append(body);
      const dots = document.createElement("span");
      dots.className = "typing-dots";
      dots.setAttribute("aria-hidden", "true");
      dots.innerHTML = "<i></i><i></i><i></i>";
      message.append(dots);
      return {
        message,
        body,
        dots,
        transform: getComputedStyle(message).transform,
      };
    });
    const showStatic = () => {
      cancelGroup(group);
      group.started = true;
      figure.classList.remove("is-running");
    };
    const play = () => {
      cancelGroup(group);
      group.started = true;
      if (reduced.matches) return;
      figure.classList.add("is-running");
      const interval = opening ? 2150 : 1450;
      content.forEach(({ message, body, dots, transform }, index) => {
        const delay = 300 + index * interval;
        const finalTransform = transform === "none" ? "" : transform;
        const isResult =
          message.classList.contains("appointment") ||
          message.classList.contains("float-result");
        animate(
          message,
          [
            {
              opacity: 0,
              transform: `translateY(22px) scale(.94) ${finalTransform}`,
            },
            {
              opacity: 1,
              transform: `translateY(0) scale(1) ${finalTransform}`,
            },
          ],
          { duration: 700, delay, easing: ease, fill: "both" },
          group,
        );
        if (!isResult) {
          animate(
            body,
            [{ opacity: 0 }, { opacity: 1 }],
            { duration: 220, delay: delay + 700, fill: "both" },
            group,
          );
          animate(
            dots,
            [
              { opacity: 0 },
              { opacity: 1, offset: 0.12 },
              { opacity: 1, offset: 0.8 },
              { opacity: 0 },
            ],
            { duration: 700, delay, fill: "both" },
            group,
          );
          dots.querySelectorAll("i").forEach((dot, i) =>
            animate(
              dot,
              [
                { transform: "translateY(0)" },
                { transform: "translateY(-4px)" },
                { transform: "translateY(0)" },
              ],
              {
                duration: 400,
                delay: delay + i * 80,
                iterations: 2,
                easing: "ease-in-out",
              },
              group,
            ),
          );
        }
        if (opening)
          animate(
            message,
            [
              { translate: "0 0" },
              { translate: `0 ${index % 2 ? -7 : 7}px` },
              { translate: "0 0" },
            ],
            {
              duration: 4500 + index * 400,
              delay: delay + 900,
              iterations: 4,
              easing: "ease-in-out",
            },
            group,
          );
      });
      figure.querySelectorAll("[data-connection]").forEach((path, index) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        animate(
          path,
          [
            { strokeDashoffset: length, opacity: 0 },
            { strokeDashoffset: 0, opacity: 0.6 },
          ],
          {
            duration: 1600,
            delay: 1300 + index * interval,
            easing: ease,
            fill: "both",
          },
          group,
        );
      });
      sync();
    };
    if (replay) {
      replay.hidden = reduced.matches;
      replay.addEventListener("click", () => {
        paused = false;
        group.visible = true;
        play();
      });
    }
    group.play = play;
    group.showStatic = showStatic;
    group.replay = replay;
    conversations.push(group);
    const observer = new IntersectionObserver(
      (entries) => {
        group.visible = entries[0].isIntersecting;
        if (group.visible && !group.started) {
          if (canMove()) play();
          else showStatic();
        }
        sync();
      },
      { threshold: 0.15 },
    );
    observer.observe(figure);
  });

  // A small set of distinct entrances; no universal fade applied to every section.
  const entrances = new Map([
    [
      ".title-line",
      (node, i) => [
        { clipPath: "inset(0 0 100% 0)", transform: "translateY(28px)" },
        { clipPath: "inset(0 0 0% 0)", transform: "translateY(0)" },
      ],
    ],
    [
      ".about h2",
      () => [
        { opacity: 0.35, transform: "translateY(24px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
    ],
    [
      ".footer-wordmark",
      () => [
        { clipPath: "inset(70% 0 0 0)", transform: "translateY(30px)" },
        { clipPath: "inset(0 0 0 0)", transform: "translateY(0)" },
      ],
    ],
  ]);
  for (const [selector, frames] of entrances) {
    document.querySelectorAll(selector).forEach((node, index) => {
      const group = { visible: false, started: false };
      const observer = new IntersectionObserver(
        (entries) => {
          group.visible = entries[0].isIntersecting;
          if (group.visible && !group.started && canMove()) {
            group.started = true;
            animate(
              node,
              frames(node, index),
              {
                duration: 1100,
                delay: index * 140,
                easing: ease,
                fill: "both",
              },
              group,
            );
          }
          sync();
        },
        { threshold: 0.15 },
      );
      observer.observe(node);
    });
  }

  // Scroll describes progress through the three implementation steps, without taking over scrolling.
  const methods = [...document.querySelectorAll(".method")];
  let frame = 0;
  function updateProgress() {
    frame = 0;
    if (!canMove()) return;
    methods.forEach((method) => {
      const steps = method.querySelector(".steps");
      if (!steps) return;
      const rect = steps.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > innerHeight) return;
      const progress = Math.max(
        0,
        Math.min(
          1,
          (innerHeight * 0.58 - rect.top) / Math.max(1, rect.height - 60),
        ),
      );
      steps.style.setProperty("--method-progress", progress);
      steps
        .querySelectorAll("li")
        .forEach((li) =>
          li.classList.toggle(
            "is-active",
            li.getBoundingClientRect().top < innerHeight * 0.6,
          ),
        );
    });
  }
  const scheduleProgress = () => {
    if (!frame) frame = requestAnimationFrame(updateProgress);
  };
  addEventListener("scroll", scheduleProgress, { passive: true });
  addEventListener("resize", scheduleProgress, { passive: true });
  const hero = document.querySelector(".landing-hero");
  const art = document.querySelector(".hero-art");
  if (hero && art) {
    hero.addEventListener(
      "pointermove",
      (event) => {
        if (!canMove() || !finePointer.matches) return;
        const rect = hero.getBoundingClientRect();
        art.style.setProperty(
          "--art-x",
          `${(event.clientX / rect.width - 0.5) * -16}px`,
        );
        art.style.setProperty(
          "--art-y",
          `${((event.clientY - rect.top) / rect.height - 0.5) * -12}px`,
        );
      },
      { passive: true },
    );
    hero.addEventListener("pointerleave", () => {
      if (!canMove()) return;
      art.style.setProperty("--art-x", "0px");
      art.style.setProperty("--art-y", "0px");
    });
  }
  reduced.addEventListener("change", () => {
    if (reduced.matches) {
      for (const { animation } of records) animation.cancel();
      records.clear();
      conversations.forEach((group) => group.showStatic());
    }
    conversations.forEach((group) => {
      if (group.replay) group.replay.hidden = reduced.matches;
    });
    sync();
  });
  sync();
  scheduleProgress();
})();
