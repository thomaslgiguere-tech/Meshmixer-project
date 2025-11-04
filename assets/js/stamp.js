(function () {
  function initStamp() {
    const input = document.getElementById('stamp-input');
    const output = document.getElementById('stamp-output');
    const clearBtn = document.getElementById('clear-btn');
    const selectBtn = document.getElementById('select-btn');
    const copyBtn = document.getElementById('copy-btn');

    // Ensure all elements were found
    if (!input || !output || !clearBtn || !selectBtn || !copyBtn) {
      console.error('Missing required elements for stamp tool');
      return;
    }

    function render() { 
      output.textContent = input.value || ''; 
    }

    input.addEventListener('input', render);
    
    clearBtn.addEventListener('click', () => { 
      input.value = ''; 
      render(); 
      input.focus(); 
    });

    selectBtn.addEventListener('click', () => {
      if (!output.textContent.trim()) return; // Don't select if empty
      const r = document.createRange();
      r.selectNodeContents(output);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(r);
    });

    copyBtn.addEventListener('click', async () => {
      if (!output.textContent.trim()) return; // Don't copy if empty
      const originalText = copyBtn.textContent;
      try {
        await navigator.clipboard.writeText(output.textContent);
        copyBtn.textContent = '✓ Copied!';
      } catch (err) {
        console.error('Copy failed:', err);
        copyBtn.textContent = 'Copy failed';
        // Fallback to selection
        selectBtn.click();
      } finally {
        setTimeout(() => copyBtn.textContent = originalText, 1200);
      }
    });

    // Initial render and focus
    render();
    input.focus();
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStamp);
  } else {
    initStamp();
  }
})();
