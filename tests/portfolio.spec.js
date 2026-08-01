const { test, expect } = require("@playwright/test");
const { AxeBuilder } = require("@axe-core/playwright");
const fs = require("node:fs/promises");
const path = require("node:path");

const sectionAnchors = ["about", "projects", "contact"];
const viewportWidths = [320, 390, 500, 768, 900, 1024, 1150, 1280, 1440];
const hybridCaptureDirectory = path.join(process.cwd(), "visual-results", "hybrid");

async function openPortfolio(page) {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("load");
  await expect(page.locator("main")).toBeVisible();
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  });
}

async function themeSnapshot(page, control) {
  return page.evaluate((controlElement) => {
    const root = document.documentElement;
    const bodyStyle = getComputedStyle(document.body);

    return JSON.stringify({
      muiMode: root.getAttribute("data-mui-color-scheme"),
      theme: root.getAttribute("data-theme"),
      colorScheme: getComputedStyle(root).colorScheme,
      backgroundColor: bodyStyle.backgroundColor,
      color: bodyStyle.color,
      label: controlElement.getAttribute("aria-label"),
      pressed: controlElement.getAttribute("aria-pressed"),
    });
  }, await control.elementHandle());
}

function ambientGraph(page, variant) {
  return page.locator(`[data-ambient-graph="${variant}"]`);
}

async function supportsWebGL(page) {
  return page.evaluate(() => {
    const canvas = document.createElement("canvas");

    try {
      const context =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      const supported = Boolean(context);
      context?.getExtension?.("WEBGL_lose_context")?.loseContext();
      return supported;
    } catch {
      return false;
    }
  });
}

async function waitForProjectImages(page) {
  const projectImages = page.locator("#projects img");
  for (let index = 0; index < (await projectImages.count()); index += 1) {
    const image = projectImages.nth(index);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element) => element.complete)).toBe(true);
  }
}

async function installGraphVisualAudit(page) {
  await page.addInitScript(() => {
    window.__graphStaticEverSeen = false;
    const markStaticGraph = () => {
      if (document.querySelector('[data-graph-static], [data-ambient-graph] svg')) {
        window.__graphStaticEverSeen = true;
      }
    };
    const observer = new MutationObserver(markStaticGraph);
    observer.observe(document, { childList: true, subtree: true });
    markStaticGraph();
  });
}

test("exposes stable landmarks, anchors, and a non-interactive Resume · Soon status", async ({
  page,
}) => {
  await openPortfolio(page);

  await expect(page.locator("h1")).toHaveCount(1);

  for (const id of sectionAnchors) {
    const section = page.locator(`section#${id}`);
    await expect(section).toHaveCount(1);
    await expect(section.locator("h1, h2").first()).toBeVisible();
    await expect(page.locator(`header a[href="#${id}"]`).first()).toBeVisible();
  }

  const resumeText = /Resume\s*(?:[·(]\s*)?Soon\s*\)?/i;
  const resumeStatus = page
    .locator("header")
    .getByText(resumeText)
    .filter({ visible: true })
    .first();
  await expect(resumeStatus).toBeVisible();
  await expect(page.locator("header a, header button").filter({ hasText: resumeText })).toHaveCount(0);
});

test("supports skip navigation and section hash navigation", async ({ page }) => {
  await openPortfolio(page);

  await page.keyboard.press("Tab");
  const skipLink = page.locator('a[href^="#"]').filter({ hasText: /skip/i }).first();
  await expect(skipLink).toBeFocused();
  const mainTarget = await skipLink.getAttribute("href");
  expect(mainTarget).toMatch(/^#.+/);
  await expect(page.locator(mainTarget)).toHaveCount(1);
  await page.keyboard.press("Enter");
  await expect(page.locator(mainTarget)).toBeFocused();

  for (const id of sectionAnchors) {
    await page.locator(`header a[href="#${id}"]`).first().click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
  }
});

test("mobile menu opens and closes from the keyboard and restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openPortfolio(page);

  const menuButton = page.getByRole("button", { name: /menu|navigation/i }).first();
  await expect(menuButton).toBeVisible();
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");

  await menuButton.focus();
  await page.keyboard.press("Enter");
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  const menuContact = page.getByRole("link", { name: "Contact", exact: true }).last();
  await expect(menuContact).toBeVisible();
  await menuContact.focus();
  await expect(menuContact).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await expect(menuButton).toBeFocused();

  await page.keyboard.press("Enter");
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await page.mouse.click(12, 820);
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
});

test("tracks the active section and compacts the persistent header", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await openPortfolio(page);

  const header = page.locator("header");
  await expect(header).toHaveAttribute("data-header-state", "expanded");
  await expect(page.locator('header a[href="#about"]').first()).toHaveAttribute(
    "aria-current",
    "location",
  );

  await page.locator("#projects").evaluate((section) =>
    section.scrollIntoView({ block: "start" }),
  );
  await expect(header).toHaveAttribute("data-header-state", "compact");
  await expect(page.locator('header a[href="#projects"]').first()).toHaveAttribute(
    "aria-current",
    "location",
  );
});

test("theme control is keyboard operable and the selected mode survives reload", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await openPortfolio(page);

  const themeControl = page
    .getByRole("button", { name: /theme|mode|light|dark/i })
    .first();
  await expect(themeControl).toBeVisible();

  const heroGraph = ambientGraph(page, "hero");
  await expect(heroGraph).toHaveCount(1);
  const initialGraphHandle = await heroGraph.elementHandle();
  expect(initialGraphHandle).not.toBeNull();
  const webglSupported = await supportsWebGL(page);
  if (webglSupported) {
    await expect(heroGraph).toHaveAttribute("data-graph-mode", "live", {
      timeout: 15_000,
    });
    await expect(heroGraph).toHaveAttribute("data-graph-theme", "light", {
      timeout: 15_000,
    });
  }

  const before = await themeSnapshot(page, themeControl);
  await themeControl.focus();
  await page.keyboard.press("Enter");
  await expect.poll(() => themeSnapshot(page, themeControl)).not.toBe(before);
  await expect
    .poll(() =>
      heroGraph.evaluate(
        (currentGraph, originalGraph) => currentGraph === originalGraph,
        initialGraphHandle,
      ),
    )
    .toBe(true);
  if (webglSupported) {
    const selectedScheme = await page.evaluate(() =>
      document.documentElement.getAttribute("data-mui-color-scheme"),
    );
    await expect(heroGraph).toHaveAttribute("data-graph-theme", selectedScheme);
  }
  await initialGraphHandle.dispose();

  const selected = await themeSnapshot(page, themeControl);
  await page.reload({ waitUntil: "domcontentloaded" });
  const reloadedControl = page
    .getByRole("button", { name: /theme|mode|light|dark/i })
    .first();
  await expect(reloadedControl).toBeVisible();
  await expect.poll(() => themeSnapshot(page, reloadedControl)).toBe(selected);
});

test("has no horizontal document overflow at supported breakpoints", async ({ page }) => {
  for (const width of viewportWidths) {
    await page.setViewportSize({ width, height: width <= 500 ? 844 : 900 });
    await openPortfolio(page);

    const overflow = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(
      overflow.scrollWidth,
      `document overflowed horizontally at ${width}px`,
    ).toBeLessThanOrEqual(overflow.clientWidth + 1);
  }
});

test("reflows in short landscape layouts without sticky-intro collisions", async ({
  page,
}) => {
  for (const viewport of [
    { width: 1150, height: 640 },
    { width: 1280, height: 600 },
  ]) {
    await page.setViewportSize(viewport);
    await openPortfolio(page);

    const layoutState = await page.evaluate(() => {
      const intro = document.querySelector("#projects > div > div > div");
      return {
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        introPosition: intro ? getComputedStyle(intro).position : null,
      };
    });

    expect(layoutState.scrollWidth).toBeLessThanOrEqual(layoutState.clientWidth + 1);
    expect(layoutState.introPosition).not.toBe("sticky");
  }
});

test("supports 200% text scaling without horizontal overflow or contact collisions", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openPortfolio(page);
  await page.addStyleTag({ content: ":root { font-size: 200% !important; }" });

  const reflow = await page.evaluate(() => {
    const controls = [...document.querySelectorAll("#contact a, #contact [role='note']")]
      .filter((element) => {
        const style = getComputedStyle(element);
        return style.display !== "none" && style.visibility !== "hidden";
      })
      .map((element) => element.getBoundingClientRect());
    const collisions = controls.some((rect, index) =>
      controls.slice(index + 1).some(
        (other) =>
          rect.left < other.right &&
          rect.right > other.left &&
          rect.top < other.bottom &&
          rect.bottom > other.top,
      ),
    );

    return {
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      collisions,
      controlsWithinViewport: controls.every(
        (rect) => rect.left >= -1 && rect.right <= document.documentElement.clientWidth + 1,
      ),
    };
  });

  expect(reflow.scrollWidth).toBeLessThanOrEqual(reflow.clientWidth + 1);
  expect(reflow.collisions).toBe(false);
  expect(reflow.controlsWithinViewport).toBe(true);
});

test("captures representative reduced-motion hybrid views without replacing refresh captures", async ({
  page,
}, testInfo) => {
  testInfo.setTimeout(90_000);
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await fs.mkdir(hybridCaptureDirectory, { recursive: true });

  for (const view of [
    { name: "mobile", width: 390, height: 844 },
    { name: "tablet", width: 900, height: 900 },
    { name: "desktop", width: 1440, height: 900 },
  ]) {
    await page.setViewportSize({ width: view.width, height: view.height });
    await openPortfolio(page);
    await waitForProjectImages(page);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({
      path: path.join(hybridCaptureDirectory, `hybrid-reduced-${view.name}.png`),
      fullPage: true,
    });
  }
});

test("captures representative hybrid views without replacing refresh captures", async ({
  page,
}, testInfo) => {
  testInfo.setTimeout(120_000);
  await fs.mkdir(hybridCaptureDirectory, { recursive: true });

  for (const view of [
    {
      name: "mobile-light",
      width: 390,
      height: 844,
      colorScheme: "light",
      reducedMotion: "no-preference",
    },
    {
      name: "tablet-dark",
      width: 1024,
      height: 900,
      colorScheme: "dark",
      reducedMotion: "no-preference",
    },
    {
      name: "desktop-light",
      width: 1440,
      height: 900,
      colorScheme: "light",
      reducedMotion: "no-preference",
    },
    {
      name: "desktop-dark-reduced",
      width: 1440,
      height: 900,
      colorScheme: "dark",
      reducedMotion: "reduce",
    },
  ]) {
    await page.setViewportSize({ width: view.width, height: view.height });
    await page.emulateMedia({
      colorScheme: view.colorScheme,
      reducedMotion: view.reducedMotion,
    });
    await openPortfolio(page);
    await waitForProjectImages(page);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({
      path: path.join(hybridCaptureDirectory, `hybrid-${view.name}.png`),
      fullPage: true,
    });
  }
});

test("renders only eager live neural graphs at supported breakpoints", async ({
  page,
}) => {
  test.setTimeout(60_000);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await installGraphVisualAudit(page);

  for (const width of [320, 899, 900, 1024, 1149]) {
    await page.setViewportSize({ width, height: 900 });
    await openPortfolio(page);

    const heroGraph = ambientGraph(page, "hero");
    const contactGraph = ambientGraph(page, "contact");
    await expect(heroGraph).toHaveAttribute("data-graph-mode", "hidden");
    await expect(contactGraph).toHaveAttribute("data-graph-mode", "hidden");
    await expect(heroGraph).toBeHidden();
    await expect(contactGraph).toBeHidden();
    await expect(page.locator("[data-ambient-graph] canvas")).toHaveCount(0);
    await expect(page.locator("[data-graph-static], [data-ambient-graph] svg")).toHaveCount(0);
    expect(await page.evaluate(() => window.__graphStaticEverSeen)).toBe(false);
  }

  await page.setViewportSize({ width: 1150, height: 900 });
  await openPortfolio(page);

  const heroGraph = ambientGraph(page, "hero");
  const contactGraph = ambientGraph(page, "contact");
  await expect(heroGraph).toBeVisible();
  await expect(heroGraph).toHaveAttribute("data-graph-nodes", "300");
  await expect(heroGraph).toHaveAttribute("data-graph-simulation", "continuous");
  await expect(heroGraph).toHaveAttribute("data-graph-startup", "expand-out");
  await expect(contactGraph).toHaveAttribute("data-graph-nodes", "50");
  const webglSupported = await supportsWebGL(page);

  if (webglSupported) {
    await expect(heroGraph).toHaveAttribute("data-graph-mode", "live", {
      timeout: 15_000,
    });
    await expect(heroGraph.locator("canvas")).toBeVisible({ timeout: 15_000 });
    await expect(contactGraph).toHaveAttribute("data-graph-mode", "live", {
      timeout: 15_000,
    });
    await expect(contactGraph.locator('[data-graph-live="ready"]')).toBeVisible({
      timeout: 15_000,
    });
    await expect(contactGraph).not.toBeInViewport();
    await expect(contactGraph).toHaveAttribute("data-graph-startup-state", "complete", {
      timeout: 15_000,
    });
    await expect(contactGraph).toHaveAttribute("data-graph-state", "paused", {
      timeout: 15_000,
    });
    const spread = await contactGraph.evaluate((element) => ({
      initial: Number(element.getAttribute("data-graph-initial-spread")),
      final: Number(element.getAttribute("data-graph-final-spread")),
    }));
    expect(spread.initial).toBeGreaterThan(0);
    expect(spread.final).toBeGreaterThan(spread.initial * 1.5);
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  } else {
    await expect(heroGraph).toHaveAttribute("data-graph-mode", "hidden");
    await expect(contactGraph).toHaveAttribute("data-graph-mode", "hidden");
    await expect(page.locator("[data-ambient-graph] canvas")).toHaveCount(0);
  }

  await expect(page.locator("[data-graph-static], [data-ambient-graph] svg")).toHaveCount(0);
  expect(await page.evaluate(() => window.__graphStaticEverSeen)).toBe(false);

  if (webglSupported) {
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await expect(contactGraph).toHaveAttribute("data-graph-state", "active", {
      timeout: 15_000,
    });
  }
});

test("restores the historical neural graph framing and responsive density", async ({
  page,
}) => {
  test.setTimeout(60_000);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  let webglChecked = false;

  for (const view of [
    { width: 1280, widthRatio: 0.5, heightRatio: 1.15, nodes: "300" },
    { width: 1440, widthRatio: 0.55, heightRatio: 1.15, nodes: "350" },
  ]) {
    await page.setViewportSize({ width: view.width, height: 900 });
    await openPortfolio(page);
    if (!webglChecked) {
      test.skip(!(await supportsWebGL(page)), "WebGL is unavailable in this browser");
      webglChecked = true;
    }

    const heroGraph = ambientGraph(page, "hero");
    await expect(heroGraph).toBeVisible();
    await expect(heroGraph).toHaveAttribute("data-graph-mode", "live", {
      timeout: 15_000,
    });
    await expect(heroGraph).toHaveAttribute("data-graph-nodes", view.nodes);

    const geometry = await heroGraph.evaluate((element) => {
      const graphRect = element.getBoundingClientRect();
      const layoutRect = element.parentElement?.parentElement?.getBoundingClientRect();

      return {
        widthRatio: graphRect.width / window.innerWidth,
        heightRatio: graphRect.height / layoutRect.height,
        rightOverflowRatio: (graphRect.right - window.innerWidth) / window.innerWidth,
      };
    });

    expect(geometry.widthRatio).toBeCloseTo(view.widthRatio, 2);
    expect(geometry.heightRatio).toBeCloseTo(view.heightRatio, 2);
    expect(geometry.rightOverflowRatio).toBeCloseTo(view.width === 1024 ? 0.28 : 0, 2);

    if (view.width === 1440) {
      await expect(heroGraph).toHaveAttribute("data-graph-camera-distance", "1200");
    } else {
      await expect
        .poll(async () => {
          const metrics = await heroGraph.evaluate((element) => {
            const rect = element.getBoundingClientRect();
            return { width: rect.width, height: rect.height };
          });
          const expectedDistance =
            1_000_000 / Math.pow(Math.min(metrics.width, metrics.height), 1.03);
          const actualDistance = Number(
            await heroGraph.getAttribute("data-graph-camera-distance"),
          );
          return Math.abs(actualDistance - Math.round(expectedDistance));
        })
        .toBeLessThanOrEqual(1);
    }
  }

  for (const view of [
    { width: 1280, heightRatio: 1.3, topOverflowRatio: 0.04, bottomOverflowRatio: 0.26 },
    { width: 1440, heightRatio: 1.4, topOverflowRatio: 0.12, bottomOverflowRatio: 0.28 },
  ]) {
    await page.setViewportSize({ width: view.width, height: 900 });
    await openPortfolio(page);

    const contactGraph = ambientGraph(page, "contact");
    await expect(contactGraph).toBeVisible();
    await expect(contactGraph).toHaveAttribute("data-graph-mode", "live", {
      timeout: 15_000,
    });
    await expect(contactGraph).toHaveAttribute("data-graph-camera-distance", "550");

    const contactGeometry = await contactGraph.evaluate((element) => {
      const graphRect = element.getBoundingClientRect();
      const panel = element.parentElement?.offsetParent;
      const panelRect = panel.getBoundingClientRect();
      const paddingTop = panelRect.top + panel.clientTop;
      const paddingBottom = paddingTop + panel.clientHeight;

      return {
        widthRatio: graphRect.width / window.innerWidth,
        heightRatio: graphRect.height / panel.clientHeight,
        topOverflowRatio: (paddingTop - graphRect.top) / panel.clientHeight,
        rightOverflowRatio: (graphRect.right - window.innerWidth) / window.innerWidth,
        bottomOverflowRatio: (graphRect.bottom - paddingBottom) / panel.clientHeight,
      };
    });

    expect(contactGeometry.widthRatio).toBeCloseTo(0.4, 2);
    expect(contactGeometry.heightRatio).toBeCloseTo(view.heightRatio, 2);
    expect(contactGeometry.topOverflowRatio).toBeCloseTo(view.topOverflowRatio, 2);
    expect(contactGeometry.rightOverflowRatio).toBeCloseTo(0.1, 2);
    expect(contactGeometry.bottomOverflowRatio).toBeCloseTo(view.bottomOverflowRatio, 2);
  }
});

test("pauses and resumes the live neural graph and stays blank on context loss", async ({
  context,
  page,
}) => {
  test.setTimeout(60_000);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await openPortfolio(page);

  if (!(await supportsWebGL(page))) return;

  const heroGraph = ambientGraph(page, "hero");
  await expect(heroGraph).toHaveAttribute("data-graph-mode", "live", {
    timeout: 15_000,
  });
  await expect(heroGraph).toHaveAttribute("data-graph-state", "active", {
    timeout: 15_000,
  });
  await expect(heroGraph).toHaveAttribute("data-graph-startup-state", "complete", {
    timeout: 15_000,
  });

  await page.locator("#projects").scrollIntoViewIfNeeded();
  await expect(heroGraph).toHaveAttribute("data-graph-state", "paused", {
    timeout: 15_000,
  });

  await page.locator("#about").scrollIntoViewIfNeeded();
  await expect(heroGraph).toHaveAttribute("data-graph-state", "active", {
    timeout: 15_000,
  });

  const foregroundPage = await context.newPage();
  await foregroundPage.goto("about:blank");
  await foregroundPage.bringToFront();
  await expect.poll(() => page.evaluate(() => document.hidden)).toBe(true);
  await expect(heroGraph).toHaveAttribute("data-graph-state", "paused");

  await page.bringToFront();
  await expect.poll(() => page.evaluate(() => document.hidden)).toBe(false);
  await expect(heroGraph).toHaveAttribute("data-graph-state", "active", {
    timeout: 15_000,
  });
  await foregroundPage.close();

  await expect(heroGraph.locator('[data-graph-live="ready"]')).toBeVisible({
    timeout: 15_000,
  });
  await heroGraph.locator("canvas").dispatchEvent("webglcontextlost");
  await expect(heroGraph).toHaveAttribute("data-graph-mode", "hidden");
  await expect(heroGraph.locator("canvas")).toHaveCount(0);
  await expect(page.locator("[data-graph-static], [data-ambient-graph] svg")).toHaveCount(0);
});

test("honors the reduced-motion preference", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openPortfolio(page);

  const heroGraph = ambientGraph(page, "hero");
  const contactGraph = ambientGraph(page, "contact");
  await expect(heroGraph).toHaveAttribute("data-graph-mode", "hidden");
  await expect(contactGraph).toHaveAttribute("data-graph-mode", "hidden");
  await expect(heroGraph).toBeHidden();
  await expect(contactGraph).toBeHidden();
  await expect(page.locator("[data-ambient-graph] canvas")).toHaveCount(0);
  await expect(page.locator("[data-graph-static], [data-ambient-graph] svg")).toHaveCount(0);

  const motionState = await page.evaluate(() => {
    const runningInfiniteAnimations = document
      .getAnimations({ subtree: true })
      .filter((animation) => {
        const timing = animation.effect?.getComputedTiming();
        return animation.playState === "running" && timing?.iterations === Infinity;
      }).length;

    return {
      preference: matchMedia("(prefers-reduced-motion: reduce)").matches,
      runningInfiniteAnimations,
      scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    };
  });

  expect(motionState.preference).toBe(true);
  expect(motionState.runningInfiniteAnimations).toBe(0);
  expect(motionState.scrollBehavior).not.toBe("smooth");
});

const accessibilityScenarios = [
  { name: "desktop light", viewport: { width: 1440, height: 900 }, colorScheme: "light" },
  { name: "desktop dark", viewport: { width: 1440, height: 900 }, colorScheme: "dark" },
  { name: "mobile light", viewport: { width: 390, height: 844 }, colorScheme: "light" },
  { name: "mobile dark reduced motion", viewport: { width: 390, height: 844 }, colorScheme: "dark", reducedMotion: "reduce" },
];

for (const scenario of accessibilityScenarios) {
  test(`@a11y has no serious or critical axe violations in ${scenario.name}`, async ({
    page,
  }) => {
    await page.setViewportSize(scenario.viewport);
    await page.emulateMedia({
      colorScheme: scenario.colorScheme,
      reducedMotion: scenario.reducedMotion || "no-preference",
    });
    await openPortfolio(page);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const blockingViolations = results.violations.filter(({ impact }) =>
      ["serious", "critical"].includes(impact),
    );

    expect(blockingViolations).toEqual([]);
  });
}
