/**
 * Redirects to the localized pitch deck based on navigator.language.
 * Usage: <script src="/pitch-deck-lang.js"></script>
 *        <script>routePitchDeck('urbi');</script>
 */
function routePitchDeck(slug) {
  const prefersEs = (navigator.language || 'en').toLowerCase().startsWith('es');
  const suffix = prefersEs ? '.es' : '.en';
  const target = '/' + slug + '-pitch-deck' + suffix + '.html';
  const current = window.location.pathname;

  if (!current.endsWith(target)) {
    window.location.replace(target);
  }
}
