const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({channel: 'chrome', headless: true});
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    const base = process.env.TEST_URL || 'http://localhost:8765';
    await page.goto(base);
    const open = () => page.locator('#welcomeDialog').evaluate(d => d.open);
    assert(await open());
    assert.equal(await page.locator(':focus').getAttribute('id'), 'welcomeTitle');
    await page.keyboard.press('Shift+Tab');
    assert.equal(await page.locator(':focus').getAttribute('id'), 'welcomeRemember');
    await page.keyboard.press('Tab');
    assert.equal(await page.locator(':focus').getAttribute('id'), 'closeWelcome');
    await page.locator('#welcomeStart').click();
    assert(!await open());
    assert.equal(await page.locator(':focus').getAttribute('id'), 'decisionInput');
    await page.locator('#decisionInput').fill('Move?');
    await page.locator('#newPointText').fill('More space');
    await page.locator('#newPointScore').selectOption('3');
    await page.locator('#addPointForm button').click();
    await page.reload();
    assert(!await open());
    await page.locator('#howItWorksButton').click();
    await page.keyboard.press('Escape');
    assert(!await open());
    assert.equal(await page.locator(':focus').getAttribute('id'), 'howItWorksButton');
    await page.locator('#howItWorksButton').click();
    await page.locator('#closeWelcome').click();
    assert(!await open());
    const newSession = await context.newPage();
    await newSession.goto(base);
    assert(await newSession.locator('#welcomeDialog').evaluate(d => d.open));
    await newSession.close();
    await page.locator('#howItWorksButton').click();
    for (const lang of ['en', 'ko', 'ga']) {
      await page.locator('#welcomeLanguage').click();
      await page.locator(`[data-welcome-language="${lang}"]`).click();
      assert(await open());
      assert.equal(await page.locator('html').getAttribute('lang'), lang);
      assert.equal(await page.locator('#welcomeTitle').innerText(), {
        en: 'Welcome to Goose Choose!', ko: '구스추즈에 오신 걸 환영해요!', ga: 'Fáilte go Gús Tsús!'
      }[lang]);
      assert(await page.locator('#closeWelcome').getAttribute('aria-label'));
      for (const theme of ['light', 'dark', 'system']) {
        await page.locator('#welcomeTheme').click();
      await page.locator(`[data-welcome-theme="${theme}"]`).click();
        assert.equal(await page.locator('#themePicker').inputValue(), theme);
        for (const width of [320, 768, 1280]) {
          await page.setViewportSize({width, height: 800});
          assert(await page.locator('#welcomeDialog').evaluate(d => d.scrollWidth <= d.clientWidth));
          assert(await page.locator('#closeWelcome').isVisible());
          const box = await page.locator('#welcomeDialog').boundingBox();
          assert(box.y >= 0 && box.y + box.height <= 801, 'Dialog stays inside the viewport');
          if (lang === 'en' && width === 1280 && theme === 'dark') await page.screenshot({path: '/tmp/welcome-desktop-dark.png'});
        }
      }
      await page.setViewportSize({width: 390, height: 700});
      await page.screenshot({path: `/tmp/welcome-${lang}.png`});
    }
    await page.emulateMedia({colorScheme: 'dark'});
    await page.waitForFunction(() => document.documentElement.dataset.theme === 'dark');
    await page.emulateMedia({colorScheme: 'light'});
    await page.waitForFunction(() => document.documentElement.dataset.theme === 'light');
    await page.locator('#welcomeRemember').check();
    await page.keyboard.press('Escape');
    await page.reload();
    assert(!await open());
    assert.equal(await page.locator('#decisionInput').inputValue(), 'Move?');
    assert.equal(await page.locator('#totalScore').innerText(), '+3');
    const returning = await context.newPage();
    await returning.goto(base);
    assert(!await returning.locator('#welcomeDialog').evaluate(d => d.open));
    await returning.close();
    await page.locator('#howItWorksButton').click();
    assert(await page.locator('#welcomeRemember').isChecked());
    await page.locator('#welcomeRemember').uncheck();
    await page.locator('#welcomeStart').click();
    assert.equal(await page.evaluate(() => localStorage.getItem('goose-choose-welcome-hidden')), null);
    await page.locator('#howItWorksButton').click();
    await page.locator('#welcomeRemember').check();
    await page.locator('#welcomeStart').click();
    await page.locator('#clearAll').click();
    await page.locator('.clear-dialog button[value="cancel"]').click();
    assert(!await open());
    assert.equal(await page.evaluate(() => localStorage.getItem('goose-choose-welcome-hidden')), 'true');
    assert.equal(await page.locator('#decisionInput').inputValue(), 'Move?');
    await page.locator('#clearAll').click();
    await page.locator('.clear-dialog button[value="clear"]').click();
    await page.waitForFunction(() => document.getElementById('welcomeDialog').open);
    assert(!await page.locator('#welcomeRemember').isChecked());
    assert.equal(await page.evaluate(() => localStorage.getItem('goose-choose-welcome-hidden')), null);
    assert.equal(await page.locator('#decisionInput').inputValue(), '');
    await page.locator('#welcomeStart').click();
    await page.locator('#clearAll').click();
    assert(await open());
    const local = await context.newPage();
    const { pathToFileURL } = require('node:url');
    const path = require('node:path');
    await local.goto(pathToFileURL(path.resolve(__dirname, '../app/index.html')).href);
    if (!await local.locator('#welcomeDialog').evaluate(d => d.open)) await local.locator('#howItWorksButton').click();
    await local.evaluate(() => { window.welcomeSentinel = true; });
    await local.locator('#welcomeRemember').check();
    for (const lang of ['ko', 'ga', 'en']) {
      await local.locator('#welcomeLanguage').click();
      await local.locator(`[data-welcome-language="${lang}"]`).click();
      assert(await local.evaluate(() => window.welcomeSentinel));
      assert(await local.locator('#welcomeDialog').evaluate(d => d.open));
      assert(await local.locator('#welcomeRemember').isChecked());
      assert.equal(await local.locator('html').getAttribute('lang'), lang);
    }
    await local.locator('#welcomeTheme').click();
    await local.screenshot({path: '/tmp/welcome-dropdown.png'});
    await local.keyboard.press('Escape');
    assert(await local.locator('#welcomeThemeOptions').isHidden());
    assert(await local.locator('#welcomeDialog').evaluate(d => d.open));
    const moon = await local.locator('#welcomeTheme').boundingBox();
    const globe = await local.locator('#welcomeLanguage').boundingBox();
    const goose = await local.locator('.welcome-goose').boundingBox();
    assert(globe.y > moon.y && globe.x === moon.x);
    assert(goose.y < moon.y);
    await local.close();
    assert.deepEqual(errors, []);
    console.log('Welcome behavior, translations, themes, responsive layout, and state preservation passed.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
