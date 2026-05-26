/**
 * Redirects to the localized pitch deck based on navigator.language.
 * Usage: <script src="/pitch-deck-lang.js"></script>
 *        <script>routePitchDeck('urbi');</script>
 */
function routePitchDeck(slug) {
  const prefersEs = (navigator.language || 'en').toLowerCase().startsWith('es');
  const suffix = prefersEs ? '.es' : '.en';
  const search = window.location.search;
  const target = '/' + slug + '-pitch-deck' + suffix + '.html' + search;
  const current = window.location.pathname + window.location.search;

  if (current !== target) {
    window.location.replace(target);
  }
}
