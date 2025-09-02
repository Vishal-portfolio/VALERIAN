// Wait until the entire webpage (HTML) is loaded and ready.
document.addEventListener('DOMContentLoaded', () => {

  // --- START: PANEL FUNCTIONALITY ---
  // This is the core logic for your icons.

  // 1. Get all the elements we need to work with.
  const allPanelTriggers = document.querySelectorAll('.panel-trigger'); // All icons/buttons that open a panel.
  const allCloseButtons = document.querySelectorAll('.close-btn');     // The '×' buttons inside the panels.
  const pageOverlay = document.querySelector('.overlay');               // The dark background overlay.

  // 2. A function to close any currently open panel.
  const closeAllPanels = () => {
    // Find any panel that is currently active...
    const activePanel = document.querySelector('.panel.active');
    // ...and if one exists, remove the 'active' class to hide it.
    if (activePanel) {
      activePanel.classList.remove('active');
    }
    // Also, remove the 'active' class from the overlay to hide it.
    pageOverlay.classList.remove('active');
  };

  // 3. Set up the "open" triggers (for search, user, cart, and menu icons).
  allPanelTriggers.forEach(trigger => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault(); // Stop the default link behavior.

      // Get the ID of the panel we want to open from the button's 'data-panel' attribute.
      const panelId = trigger.dataset.panel;
      const panelToOpen = document.getElementById(panelId);

      // If a panel with that ID exists...
      if (panelToOpen) {
        // First, close any panel that might already be open.
        closeAllPanels();
        // Then, add the 'active' class to the target panel AND the overlay to show them.
        panelToOpen.classList.add('active');
        pageOverlay.classList.add('active');
      }
    });
  });

  // 4. Set up the "close" triggers.
  // When any '×' button is clicked, close the panels.
  allCloseButtons.forEach(button => {
    button.addEventListener('click', closeAllPanels);
  });

  // When the dark overlay is clicked, also close the panels.
  pageOverlay.addEventListener('click', closeAllPanels);

  // --- END: PANEL FUNCTIONALITY ---


  // --- All your other scripts (animations, etc.) below ---

  // Smooth scrolling with Lenis
  try {
    const lenis = new Lenis({ smoothWheel: true, lerp: 0.09 });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  } catch (e) {
    console.warn("Lenis library not loaded.");
  }


  // Footer year
  const yearSpan = document.getElementById('yr');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // GSAP animations
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    // hero subtle zoom
    gsap.to('.hero-media img', {
      scale: 1,
      duration: 1.6,
      ease: 'power2.out'
    });
    // heading entrance
    gsap.from('.hero h1', { y: 30, opacity: 0, duration: .9, ease: 'power3.out', delay: .15 });
    gsap.from('.hero .subtle, .hero .cta-row', { y: 16, opacity: 0, duration: .8, ease: 'power2.out', delay: .25 });
    // section reveals
    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 18 }, {
        opacity: 1, y: 0, duration: .8, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });
    // image clip-reveal
    gsap.utils.toArray('.reveal-clip').forEach(el => {
      gsap.to(el, {
        clipPath: 'inset(0% 0 0% 0)',
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 80%' }
      });
    });
  } else {
    console.warn("GSAP library not loaded.");
  }
  
  // The rest of your script for product loading and other functions would go here...
  // I am leaving it out for brevity, but you should keep it in your file.
});