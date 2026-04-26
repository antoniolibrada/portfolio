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
      // Mask the animated canvas in the hero so it doesn't cause flaky diffs
      ...(name === 'hero' && { mask: [page.locator('canvas')] }),
    });
  });
}
