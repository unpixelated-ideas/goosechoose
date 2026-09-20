/* Shared language routing and live metadata. Static metadata is built separately. */
(() => {
  const locales = window.GooseChooseLocales;
  const root = new URL('../', document.currentScript.src);
  const publicRoot = 'https://unpixelated-ideas.github.io/goosechoose/';
  let initialized = false;

  function language() {
    const path = location.pathname.slice(root.pathname.length).replace(/index\.html$/, '');
    return Object.keys(locales).find(key => locales[key].path === path) || 'en';
  }

  function sync(key) {
    const locale = locales[key] || locales.en;
    const target = new URL(locale.path, root);
    if (location.protocol === 'file:') target.pathname += 'index.html';
    target.search = location.search;
    target.hash = location.hash;
    if (target.href !== location.href) {
      if (location.protocol === 'file:') {
        // Keep the legacy local launcher usable; file URLs cannot push history paths.
        if (initialized) location.href = target.href;
      } else {
        history[initialized ? 'pushState' : 'replaceState'](null, '', target);
      }
    }
    initialized = true;
    const url = publicRoot + locale.path;
    document.querySelector('link[rel="canonical"]').href = url;
    const values = {
      description: locale.description,
      'og:title': locale.title, 'og:description': locale.description,
      'og:url': url, 'og:site_name': locale.title,
      'twitter:title': locale.title, 'twitter:description': locale.description
    };
    for (const [name, value] of Object.entries(values)) {
      document.querySelector(`meta[property="${name}"], meta[name="${name}"]`).content = value;
    }
  }

  window.GooseChooseRoutes = { language, sync };
})();
