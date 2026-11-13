// Unknown locations fail closed; only a known country outside this list opts in by default.
const consentCountries = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE',
  'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT',
  'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO', 'GB', 'CH'
]);
// Vercel uses ISO 3166-1; reject non-country codes and unknown territories.
const regionNames = new Intl.DisplayNames(['en'], { type: 'region', fallback: 'none' });

export default {
  fetch(request) {
    const country = request.headers.get('x-vercel-ip-country') || '';
    const known = /^[A-Z]{2}$/.test(country) && country !== 'ZZ' && Boolean(regionNames.of(country));
    const consentRequired = !known || consentCountries.has(country);
    return Response.json({ consentRequired }, {
      headers: { 'Cache-Control': 'private, no-store' }
    });
  }
};
