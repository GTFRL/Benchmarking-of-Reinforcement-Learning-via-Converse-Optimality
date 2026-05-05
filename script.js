const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const navLinks = document.querySelector('[data-nav-links]');

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 10);
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const animateCount = (element) => {
  const target = Number(element.dataset.count || '0');
  const duration = 1100;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = String(Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.7 }
);

document.querySelectorAll('[data-count]').forEach((element) => countObserver.observe(element));

const galleryData = {
  optimal: {
    label: 'Optimal',
    caption: 'Certified optimal behavior under the converse-generated fixture.',
    gif: 'GFX/optimal.gif',
    static: 'GFX/optimal_static.svg',
    value: 'GFX/optimal_value.svg',
    cost: 'GFX/optimal_stage_cost.svg',
    actions: 'GFX/optimal_actions.svg'
  },
  uncontrolled: {
    label: 'Uncontrolled',
    caption: 'Uncontrolled dynamics show why an oracle-referenced baseline is informative.',
    gif: 'GFX/uncontrolled.gif',
    static: 'GFX/uncontrolled_static.svg',
    value: 'GFX/uncontrolled_value.svg',
    cost: 'GFX/uncontrolled_stage_cost.svg',
    actions: 'GFX/uncontrolled_actions.svg'
  },
  ppo: {
    label: 'PPO',
    caption: 'PPO learned-policy behavior can be compared directly to the certified optimum.',
    gif: 'GFX/ppo.gif',
    static: 'GFX/ppo_static.svg',
    value: 'GFX/ppo_value.svg',
    cost: 'GFX/ppo_stage_cost.svg',
    actions: 'GFX/ppo_actions.svg'
  },
  sac: {
    label: 'SAC',
    caption: 'SAC diagnostics expose policy behavior in action, value, and cost space.',
    gif: 'GFX/sac.gif',
    static: 'GFX/sac_static.svg',
    value: 'GFX/sac_value.svg',
    cost: 'GFX/sac_stage_cost.svg',
    actions: 'GFX/sac_actions.svg'
  },
  a2c: {
    label: 'A2C',
    caption: 'A2C trajectories and diagnostics illustrate algorithm-specific deviations from the oracle.',
    gif: 'GFX/a2c.gif',
    static: 'GFX/a2c_static.svg',
    value: 'GFX/a2c_value.svg',
    cost: 'GFX/a2c_stage_cost.svg',
    actions: 'GFX/a2c_actions.svg'
  }
};

const gallery = document.querySelector('[data-gallery]');
if (gallery) {
  const tabs = [...gallery.querySelectorAll('[data-policy]')];
  const gif = gallery.querySelector('[data-gallery-gif]');
  const staticPlot = gallery.querySelector('[data-gallery-static]');
  const valuePlot = gallery.querySelector('[data-gallery-value]');
  const costPlot = gallery.querySelector('[data-gallery-cost]');
  const actionsPlot = gallery.querySelector('[data-gallery-actions]');
  const caption = gallery.querySelector('[data-gallery-caption]');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.policy;
      const item = galleryData[key];
      if (!item) return;

      tabs.forEach((button) => {
        const isActive = button === tab;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-selected', String(isActive));
      });

      gif.src = item.gif;
      gif.alt = `${item.label} policy animation`;
      staticPlot.src = item.static;
      staticPlot.alt = `${item.label} static trajectory diagnostic`;
      valuePlot.src = item.value;
      valuePlot.alt = `${item.label} value diagnostic`;
      costPlot.src = item.cost;
      costPlot.alt = `${item.label} stage cost diagnostic`;
      actionsPlot.src = item.actions;
      actionsPlot.alt = `${item.label} action diagnostic`;
      caption.textContent = item.caption;
    });
  });
}

const copyButton = document.querySelector('[data-copy-citation]');
const citationCode = document.querySelector('#citation-code');

if (copyButton && citationCode) {
  copyButton.addEventListener('click', async () => {
    const originalText = copyButton.textContent;
    try {
      await navigator.clipboard.writeText(citationCode.textContent.trim());
      copyButton.textContent = 'Copied!';
    } catch (error) {
      copyButton.textContent = 'Select text to copy';
    }

    window.setTimeout(() => {
      copyButton.textContent = originalText;
    }, 1800);
  });
}