const consentKey = 'cadmus-analytics-consent';
const banner = document.createElement('section');
banner.className = 'consent-banner';
banner.setAttribute('aria-label', 'Analytics choices');
banner.hidden = true;
const lang = document.documentElement.lang;
const messages = {
  en: ['May we use Google Analytics cookies to understand how visitors use this website?', 'Privacy policy', 'Decline', 'Accept analytics'],
  ja: ['サイトの利用状況を把握するためにGoogle AnalyticsのCookieを使用してもよろしいですか？', 'プライバシーポリシー', '拒否する', '許可する'],
  ko: ['웹사이트 이용 현황을 파악하기 위해 Google Analytics 쿠키를 사용해도 될까요?', '개인정보 처리방침', '거부', '분석 허용'],
  'zh-Hant': ['我們可以使用 Google Analytics Cookie 了解訪客如何使用本網站嗎？', '隱私權政策', '拒絕', '允許分析'],
  'zh-Hans': ['我们可以使用 Google Analytics Cookie 了解访客如何使用本网站吗？', '隐私政策', '拒绝', '允许分析']
};
const [question, policy, decline, accept] = messages[lang] || messages.en;
const siteRoot = new URL('.', document.currentScript.src);
const policyURL = new URL(lang === 'en' ? 'privacy.html' : `${lang}/privacy.html`, siteRoot);
banner.innerHTML = `<p>${question} <a href="${policyURL.href}">${policy}</a></p><div><button type="button" id="consent-decline">${decline}</button><button type="button" id="consent-accept">${accept}</button></div>`;
document.body.appendChild(banner);
const tracksPage = document.body.classList.contains('home');

function loadAnalytics() {
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-W9Q54WWVJM');
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-W9Q54WWVJM';
  document.head.appendChild(script);
}

let choice = localStorage.getItem(consentKey);
if (choice === 'accepted' && tracksPage) loadAnalytics();
if (!choice) banner.hidden = false;
window.addEventListener('storage', (event) => {
  if (event.key === consentKey && event.newValue !== choice) location.reload();
});

function openCookieSettings() {
  if (location.hash === '#cookie-settings') banner.hidden = false;
}
openCookieSettings();
window.addEventListener('hashchange', openCookieSettings);
document.querySelector('a[href$="#cookie-settings"]').addEventListener('click', (event) => {
  event.preventDefault();
  banner.hidden = false;
});

document.getElementById('consent-accept').addEventListener('click', () => {
  localStorage.setItem(consentKey, 'accepted');
  if (choice !== 'accepted' && tracksPage) loadAnalytics();
  choice = 'accepted';
  banner.hidden = true;
});

document.getElementById('consent-decline').addEventListener('click', () => {
  localStorage.setItem(consentKey, 'declined');
  document.cookie.split(';').forEach((item) => {
    const name = item.trim().split('=')[0];
    if (name === '_ga' || name.startsWith('_ga_')) {
      document.cookie = `${name}=; Max-Age=0; path=/`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${location.hostname}`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.cadmusapp.com`;
    }
  });
  if (choice === 'accepted') {
    if (location.hash === '#cookie-settings') history.replaceState(null, '', location.pathname + location.search);
    location.reload();
  }
  else banner.hidden = true;
});
