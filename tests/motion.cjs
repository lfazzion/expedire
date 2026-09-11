// Run with PLAYWRIGHT_MODULE pointing to an installed Playwright module.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const assert = require("node:assert/strict");
(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
    });
    await page.goto("http://localhost:8000");
    const pause = page.locator(".hero-footnote .motion-toggle");
    assert.equal(
      await pause.isVisible(),
      true,
      "Visitors must be able to pause motion",
    );
    await pause.click();
    assert.equal(await pause.getAttribute("aria-pressed"), "true");
    const moving = await page.evaluate(
      () =>
        document.getAnimations().filter((a) => a.playState === "running")
          .length,
    );
    assert.equal(moving, 0, "Global pause must stop all scripted motion");
    await page.locator(".product-section").scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    for (const message of await page
      .locator(".product-section [data-message]")
      .all())
      assert.equal(
        await message.evaluate((n) => getComputedStyle(n).opacity),
        "1",
        "A paused unseen conversation must remain readable",
      );
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    assert.equal(
      await page.evaluate(
        () =>
          document.getAnimations().filter((a) => a.playState === "running")
            .length,
      ),
      0,
    );
    for (const node of await page.locator("[data-message]").all())
      assert.equal(
        await node.evaluate((n) => getComputedStyle(n).opacity),
        "1",
      );
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.reload();
    await page.waitForTimeout(2300);
    const initial = await page
      .locator(".hero-conversation [data-message]")
      .evaluateAll((ns) => ns.map((n) => getComputedStyle(n).opacity));
    assert.equal(initial[0], "1");
    assert.equal(initial[2], "0", "Outcome arrives after the request");
    await page.waitForTimeout(5200);
    assert.equal(
      await page
        .locator(".hero-conversation [data-message]")
        .last()
        .evaluate((n) => getComputedStyle(n).opacity),
      "1",
    );
    await page.locator(".hero-conversation [data-replay]").click();
    await page.waitForTimeout(100);
    assert.equal(
      await page
        .locator(".hero-conversation [data-message]")
        .last()
        .evaluate((n) => getComputedStyle(n).opacity),
      "0",
    );
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(
      await page
        .locator(".hero-conversation")
        .getByRole("button", { name: "Repetir conversa", exact: true })
        .count(),
      1,
      "Mobile replay needs an accessible name",
    );
    console.log(
      "PASS: pause, reduced motion, request-to-outcome sequence, replay",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
