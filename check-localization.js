const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const languages = ['en', 'zh-Hant', 'zh-Hans', 'ja', 'ko'];
let errors = 0;
for (const language of languages) {
  for (const page of ['index', 'faq', 'support', 'contact']) {
    const file = path.join(root, language === 'en' ? '' : language, `${page}.html`);
    const html = fs.readFileSync(file, 'utf8');
    const menu = html.match(/<details class="legal-language">[\s\S]*?<nav[^>]*>([\s\S]*?)<\/nav>/);
    const options = menu ? [...menu[1].matchAll(/lang="([^"]+)"/g)].map(match => match[1]) : [];
    if (options.join(',') !== languages.join(',')) {
      console.error(`${file}: missing or incorrectly ordered language menu`);
      errors++;
    }
    if (!html.includes('analytics-consent.js') || !html.includes('#cookie-settings')) {
      console.error(`${file}: missing consent script or settings link`);
      errors++;
    }
  }
}
if (errors) process.exitCode = 1;
else console.log('Localization checks passed');
