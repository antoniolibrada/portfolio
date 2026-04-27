import { test, expect, type Page } from '@playwright/test';

const SECTIONS = [
  'hero',
  'about',
  'timeline',
  'projects',
  'principles',
  'stack',
  'contact',
] as const;

async function loadPage(page: Page) {
  // Activate static-mode constellation via the reduced-motion media feature.
  // The ConstellationField class detects this and renders a single deterministic
  // frame (seeded PRNG) instead of starting the animation loop, making the
  // hero canvas pixel-stable across runs without masking it.
  await page.emulateMedia({ reducedMotion: 'reduce' });

  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
  // Freeze all CSS animations and transitions for pixel-stable screenshots
  await page.addStyleTag({
    content: '*, *::before, *::after { animation-duration: 0s !important; transition-duration: 0s !important; }',
  });
}

for (const [index, name] of SECTIONS.entries()) {
  test(`${name} section`, async ({ page }) => {
    await loadPage(page);

    const section = page.locator('main > section').nth(index);
    await section.scrollIntoViewIfNeeded();

    await expect(section).toHaveScreenshot(`${name}.png`, {
      maxDiffPixelRatio: 0.02,
    });
  });
}
