/* Turns on offline reading, and inside the installed app also saves the
   PDF guides so they open with no connection. Changes nothing visible. */
(function () {
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').catch(function () {});

    var installed =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true ||
      document.referrer.indexOf('android-app://') === 0;

    if (installed) {
      navigator.serviceWorker.ready.then(function (registration) {
        if (registration.active) {
          registration.active.postMessage({ type: 'save-documents' });
        }
      });
    }
  });
})();
