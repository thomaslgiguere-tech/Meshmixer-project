---
permalink: /stamp/
title: "Stamp creator tool"
author_profile: true
redirect_from: 
  - /stamp.html
---

<!--
Simple interactive stamp creator tool
Top half: a textarea where the user types any text
Bottom half: a pure-black box showing the exact text in white (preserves whitespace)
-->

<style>
/* Basic two-pane layout: top half editor, bottom half output */
.stamp-app { display:flex; flex-direction:column; gap:1rem; }
.stamp-top { height:50vh; }
.stamp-bottom { height:50vh; }
textarea#stamp-input { width:100%; height:100%; box-sizing:border-box; padding:1rem; font-size:1rem; font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', 'Courier New', monospace; border:1px solid #ccc; border-radius:6px; resize: none; background: #ffffff; color: #000000; caret-color: #000000; }
.output-box { background: #000000; color: #ffffff; height:100%; padding:1rem; box-sizing:border-box; overflow:auto; white-space: pre-wrap; word-wrap: break-word; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', 'Courier New', monospace; font-size:1.05rem; border-radius:6px; }
.stamp-controls { display:flex; gap:.5rem; align-items:center; }
.btn { background:#333; color:#fff; border: none; padding:.5rem .75rem; border-radius:4px; cursor:pointer; }
.btn.secondary { background:#eee; color:#111; }
.label { font-weight:600; margin-bottom:.25rem; display:block; }

@media (max-width:720px) {
  .stamp-top, .stamp-bottom { height: 45vh; }
  textarea#stamp-input { font-size:0.95rem; }
}
</style>

<div id="stamp-app" class="stamp-app">
  <div class="stamp-top">
    <label class="label" for="stamp-input">Enter text to stamp (top half) — text will appear exactly as typed in the black box below:</label>
    <div class="stamp-controls">
      <button id="clear-btn" class="btn secondary" title="Clear text">Clear</button>
      <button id="select-btn" class="btn" title="Select output text">Select output</button>
      <button id="copy-btn" class="btn" title="Copy output text">Copy</button>
    </div>
    <textarea id="stamp-input" placeholder="Type or paste any text here..." aria-label="Stamp input" autofocus></textarea>
  </div>

  <div class="stamp-bottom">
    <div id="stamp-output" class="output-box" role="region" aria-live="polite" aria-label="Stamp output"></div>
  </div>
</div>

<script>
(function(){
  const input = document.getElementById('stamp-input');
  const output = document.getElementById('stamp-output');
  const clearBtn = document.getElementById('clear-btn');
  const copyBtn = document.getElementById('copy-btn');
  const selectBtn = document.getElementById('select-btn');

  function render() {
    // Use textContent to preserve literal characters and avoid HTML injection
    output.textContent = input.value;
  }

  // Initial render (in case the textarea is prefilled)
  document.addEventListener('DOMContentLoaded', render);
  input.addEventListener('input', render);

  clearBtn.addEventListener('click', function(){ input.value = ''; render(); input.focus(); });

  selectBtn.addEventListener('click', function(){
    // Create a range to select the output text for easy copying
    if (document.createRange && window.getSelection) {
      const range = document.createRange();
      range.selectNodeContents(output);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  });

  copyBtn.addEventListener('click', async function(){
    try {
      await navigator.clipboard.writeText(output.textContent);
      copyBtn.textContent = 'Copied ✓';
      setTimeout(()=> copyBtn.textContent = 'Copy', 1200);
    } catch (err) {
      // Fallback: select and let user copy
      selectBtn.click();
    }
  });

  // Allow CMD/CTRL+Enter to copy quickly
  input.addEventListener('keydown', function(e){
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      copyBtn.click();
      e.preventDefault();
    }
  });
})();
</script>
---
