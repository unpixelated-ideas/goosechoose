// Run against a static server with Playwright available in NODE_PATH.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({channel: 'chrome', headless: true});
  try {
    const page = await browser.newPage({acceptDownloads: true});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const base = process.env.TEST_URL || 'http://localhost:8765';
    const locales = require('../app/locales.json');
    for (const [lang, locale] of Object.entries(locales)) {
      const response = await page.goto(base + '/' + locale.path);
      const html = await response.text();
      assert(html.includes(`<html lang="${lang}">`));
      assert(html.includes(`<meta property="og:title" content="${locale.title}">`));
      assert(html.includes(`<meta property="og:description" content="${locale.description}">`));
      assert(html.includes('content="https://unpixelated-ideas.github.io/previewimage.png"'));
      assert.equal(await page.locator('#languagePicker').inputValue(), lang);
      assert.equal(await page.title(), locale.title);
      assert(await page.locator('#homeView').isVisible());
      assert(await page.locator('img').evaluateAll(images => images.every(img => img.complete && img.naturalWidth > 0)));
      await page.reload();
      assert.equal(await page.locator('#languagePicker').inputValue(), lang);
    }
    const image = await page.request.get(base + '/previewimage.png');
    assert.equal(image.status(), 200);
    assert(image.headers()['content-type'].startsWith('image/png'));
    await page.goto(base + '/'); // Prior Irish selection must not override English.
    assert.equal(await page.locator('#languagePicker').inputValue(), 'en');
    await page.locator('#decisionInput').fill('Take the train?');
    await page.locator('#newPointText').fill('Less traffic');
    await page.locator('#newPointScore').selectOption('3');
    await page.locator('#addPointForm button').click();
    assert.equal(await page.locator('#totalScore').innerText(), '+3');
    await page.evaluate(() => { window.routeTestSentinel = true; });
    await page.locator('#languagePicker').selectOption('ko');
    assert.equal(new URL(page.url()).pathname, '/ko/');
    assert(await page.evaluate(() => window.routeTestSentinel));
    assert.equal(await page.locator('#decisionInput').inputValue(), 'Take the train?');
    await page.locator('#languagePicker').selectOption('ga');
    await page.goBack();
    assert.equal(await page.locator('#languagePicker').inputValue(), 'ko');
    await page.goForward();
    assert.equal(await page.locator('#languagePicker').inputValue(), 'ga');
    await page.locator('[data-theme-choice="dark"]').click();
    const downloadEvent = page.waitForEvent('download');
    await page.locator('#exportMarkdown').click();
    const download = await downloadEvent;
    const file = await download.path();
    await page.locator('#languagePicker').selectOption('en');
    await page.locator('[data-theme-choice="light"]').click();
    await page.locator('#markdownFileInput').setInputFiles(file);
    await page.waitForURL('**/ga/');
    assert.equal(await page.locator('#decisionInput').inputValue(), 'Take the train?');
    assert.equal(await page.locator('#totalScore').innerText(), '+3');
    assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
    await page.goto(base + '/ko/?test=1#privacy');
    assert(await page.locator('#privacyView').isVisible());
    await page.locator('#languagePicker').selectOption('ga');
    assert.equal(new URL(page.url()).search, '?test=1');
    assert.equal(new URL(page.url()).hash, '#privacy');
    await page.goto(base + '/app/index.html');
    assert.equal(new URL(page.url()).pathname, '/');
    await page.setViewportSize({width: 390, height: 844});
    assert(await page.locator('#languagePicker').isVisible());
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    assert.deepEqual(errors, []);
    console.log('PASS: raw metadata, routes, refresh, history, shared assets, scoring, Markdown round-trip, appearance, hash/query navigation, legacy entry, mobile layout.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
