/* OMFS In-House VSP — comportements communs : langue, boutons Copier, démo de l'accueil, vidéos */
(function () {
  var root = document.documentElement;
  var t = function (fr, en) { return root.lang === 'en' ? en : fr; };

  /* Langue FR / EN */
  var langBtns = document.querySelectorAll('.lang button');
  function setLang(l) {
    root.lang = l;
    langBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === l)); });
    try { localStorage.setItem('omfs-lang', l); } catch (e) {}
  }
  langBtns.forEach(function (b) { b.addEventListener('click', function () { setLang(b.dataset.lang); }); });
  setLang(root.lang === 'en' ? 'en' : 'fr');

  /* Boutons Copier : data-copy="id de l'élément à copier" */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var el = document.getElementById(btn.dataset.copy);
      if (!el) return;
      var label = btn.innerHTML;
      function select() {
        var r = document.createRange(); r.selectNodeContents(el);
        var s = getSelection(); s.removeAllRanges(); s.addRange(r);
      }
      function done() { btn.textContent = t('Copié ✓', 'Copied ✓'); setTimeout(function () { btn.innerHTML = label; }, 1800); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(el.textContent).then(done, select);
      } else { select(); }
    });
  });

  /* Démo de l'accueil : un rectangle = un panneau du viewport */
  var tabs = [].slice.call(document.querySelectorAll('.step[role="tab"]'));
  if (tabs.length) {
    var coll = document.getElementById('vp-coll');
    var show = function (i) {
      tabs.forEach(function (tab, j) {
        var on = i === j;
        tab.setAttribute('aria-selected', String(on));
        tab.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(tab.getAttribute('aria-controls'));
        panel.hidden = !on;
        var v = panel.querySelector('video');
        if (v) { if (on) { v.play().catch(function () {}); } else { v.pause(); } }
      });
      if (coll) coll.textContent = '(1) Collection | ' + tabs[i].dataset.collection;
    };
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { show(i); });
      tab.addEventListener('keydown', function (e) {
        var d = (e.key === 'ArrowDown' || e.key === 'ArrowRight') ? 1 : (e.key === 'ArrowUp' || e.key === 'ArrowLeft') ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        var n = (i + d + tabs.length) % tabs.length;
        show(n); tabs[n].focus();
      });
    });
    show(0);
  }

  /* Tutoriels : la vidéo YouTube ne se charge qu'au clic */
  document.querySelectorAll('.player button[data-youtube]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + btn.dataset.youtube + '?autoplay=1&rel=0&start=' + (btn.dataset.start || 0);
      f.title = btn.getAttribute('aria-label') || 'YouTube';
      f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      btn.replaceWith(f);
    });
  });

  /* Tutoriels : filtre par intervention */
  var chips = document.querySelectorAll('.chip[data-filter]');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.dataset.filter;
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
      document.querySelectorAll('.video[data-tag]').forEach(function (v) {
        v.hidden = f !== 'all' && v.dataset.tag !== f;
      });
    });
  });
})();
