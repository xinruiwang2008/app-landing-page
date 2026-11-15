(function () {
  const storageKey = 'cadmus-language';
  const supported = new Set(['en', 'ja', 'ko', 'zh-Hans', 'zh-Hant']);

  function preferredLanguage(languages) {
    for (const language of languages) {
      const tag = language.toLowerCase().replace(/_/g, '-');
      if (tag === 'en' || tag.startsWith('en-')) return 'en';
      if (tag === 'ja' || tag.startsWith('ja-')) return 'ja';
      if (tag === 'ko' || tag.startsWith('ko-')) return 'ko';
      if (tag === 'zh' || tag.startsWith('zh-')) {
        const parts = tag.split('-');
        if (parts.includes('hant')) return 'zh-Hant';
        if (parts.includes('hans')) return 'zh-Hans';
        return parts.some((part) => ['tw', 'hk', 'mo'].includes(part)) ? 'zh-Hant' : 'zh-Hans';
      }
    }
    return 'en';
  }

  if (location.pathname === '/') {
    let saved;
    try { saved = localStorage.getItem(storageKey); } catch (_) { /* Storage may be unavailable. */ }
    const language = supported.has(saved) ? saved : preferredLanguage(navigator.languages?.length ? navigator.languages : [navigator.language || 'en']);
    if (language !== 'en') {
      location.replace(`/${language}/${location.search}${location.hash}`);
    }
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('.legal-language a[lang]');
    if (!link || !supported.has(link.lang)) return;
    try { localStorage.setItem(storageKey, link.lang); } catch (_) { /* Navigation still works. */ }
  });
}());
