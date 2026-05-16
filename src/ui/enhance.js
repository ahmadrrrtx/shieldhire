// ═══════════════════════════════════════════════════════════
//   ShieldHire — Enhancement Script
//   Animations, counters, toasts, interactions
// ═══════════════════════════════════════════════════════════

// ── FADE-IN ON SCROLL ─────────────────────────────────────
(function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  // Auto-apply fade-in to all major sections
  document.addEventListener('DOMContentLoaded', () => {
    const selectors = [
      '.hero', '.stats-strip', '.section',
      '.card', '.step-card', '.portal-card',
      '.compare-card', '.stat-card', '.ledger-card',
      '.result-card', '.res-qualified', '.res-not'
    ];

    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
      });
    });
  });
})();

// ── ANIMATED COUNTER ─────────────────────────────────────
function animateCounter(element, target, duration = 1800) {
  const start = 0;
  const startTime = performance.now();
  const isPercent = element.textContent.includes('%');

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * eased);

    element.textContent = current + (isPercent ? '%' : '');

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target + (isPercent ? '%' : '');
    }
  }

  requestAnimationFrame(update);
}

// Auto-animate stat numbers when visible
// Auto-animate stat numbers when visible — FIXED VERSION
document.addEventListener('DOMContentLoaded', () => {
  const numbers = document.querySelectorAll('.stat-box .num, .stat-card .num');

  // First, store original values BEFORE animating
  numbers.forEach(el => {
    if (!el.dataset.original) {
      el.dataset.original = el.textContent.trim();
    }
  });

  const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const original = entry.target.dataset.original;
        const target = parseInt(original.replace(/\D/g, ''));
        const isPercent = original.includes('%');

        if (!isNaN(target) && target > 0) {
          entry.target.dataset.animated = 'true';
          animateCounterFixed(entry.target, target, isPercent);
        }
      }
    });
  }, { threshold: 0.5 });

  numbers.forEach(num => numberObserver.observe(num));
});

// Fixed counter that preserves percentage sign
function animateCounterFixed(element, target, isPercent) {
  const duration = 1800;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(target * eased);

    element.textContent = current + (isPercent ? '%' : '');

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target + (isPercent ? '%' : '');
    }
  }

  requestAnimationFrame(update);
}

// ── TOAST NOTIFICATION SYSTEM ────────────────────────────
function showToast(message, icon = '✓') {
  // Remove any existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  document.body.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);

  // Auto remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// Expose globally
window.showToast = showToast;

// ── COPY TO CLIPBOARD HELPER ─────────────────────────────
window.copyToClipboard = function(text, label = 'Copied') {
  navigator.clipboard.writeText(text).then(() => {
    showToast(label + ' to clipboard', '📋');
  }).catch(() => {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast(label + ' to clipboard', '📋');
  });
};

// ── AUTO-ADD COPY BUTTONS TO CONTRACT ADDRESSES ─────────
document.addEventListener('DOMContentLoaded', () => {
  // Find elements with contract addresses (long hex strings)
  document.querySelectorAll('.val, .value').forEach(el => {
    const text = el.textContent.trim();
    if (text.startsWith('0x') && text.length > 20) {
      el.style.cursor = 'pointer';
      el.setAttribute('data-tooltip', 'Click to copy');
      el.addEventListener('click', () => {
        copyToClipboard(text, 'Address copied');
      });
    }
  });
});

// ── LIVE TIMESTAMP UPDATER ───────────────────────────────
function updateTimestamps() {
  document.querySelectorAll('.live-time').forEach(el => {
    el.textContent = new Date().toLocaleTimeString();
  });
}
setInterval(updateTimestamps, 1000);

// ── CONSOLE BRANDING ─────────────────────────────────────
console.log(
  '%c🛡️ ShieldHire %c— Anonymous Resume Verification on Midnight',
  'color: #c084fc; font-size: 18px; font-weight: bold;',
  'color: #67e8f9; font-size: 13px;'
);
console.log(
  '%c🌙 Built for Midnight Hackathon 2026 — by Ahmad & Diya',
  'color: #808090; font-size: 12px;'
);
