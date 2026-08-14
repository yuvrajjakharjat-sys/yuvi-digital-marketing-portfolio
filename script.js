const cursor = document.querySelector('.cursor');
if (cursor) {
  window.addEventListener('mousemove', e => {
    cursor.style.opacity = 1;
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
}

// Mobile navigation
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav nav');
if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('mobile-open');
    hamburger.setAttribute('aria-expanded', nav.classList.contains('mobile-open'));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('mobile-open')));
}

// Work filters
const filters = document.querySelectorAll('.filters button');
const projects = document.querySelectorAll('.project');
filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(x => x.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    projects.forEach(project => {
      const categories = (project.dataset.cat || '').split(' ');
      project.classList.toggle('hidden', filter !== 'all' && !categories.includes(filter));
    });
  });
});

// Case-study modal
const caseModal = document.querySelector('.case-modal');
const caseImg = document.querySelector('#caseImg');
const caseTitle = document.querySelector('#caseTitle');
const caseText = document.querySelector('#caseText');

document.querySelectorAll('.case').forEach(button => {
  button.addEventListener('click', () => {
    if (caseImg) caseImg.src = button.dataset.image || '';
    if (caseTitle) caseTitle.textContent = button.dataset.title || '';
    if (caseText) caseText.textContent = button.dataset.text || '';
    caseModal?.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeCase() {
  caseModal?.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelector('.modal-close')?.addEventListener('click', closeCase);
caseModal?.querySelector('.modal-backdrop')?.addEventListener('click', closeCase);

// Video modal
const videoModal = document.querySelector('.video-modal');
const portfolioVideo = document.querySelector('#portfolioVideo');
const videoBrand = document.querySelector('#videoBrand');
const videoDesc = document.querySelector('#videoDesc');

// All video files are in the repository root on GitHub Pages.
const videos = [
  { src: 'get-viral-01.mp4', brand: 'GET VIRAL NEWS', desc: 'WordPress / news platform creative' },
  { src: 'get-viral-02.mp4', brand: 'GET VIRAL NEWS', desc: 'News platform social reel' },
  { src: 'get-viral-03.mp4', brand: 'GET VIRAL NEWS', desc: 'Platform explainer / promo' },
  { src: 'UDDAN REEL 48.MP4', brand: 'SHORT-FORM EDIT', desc: 'Reel editing & motion' },
  { src: 'uddan-reel-53.mp4', brand: 'UDDAN PROMOTIONS', desc: 'B2B marketing reel' },
  { src: 'uddan-reel-43.mp4', brand: 'UDDAN PROMOTIONS', desc: 'Business / lead-generation reel' }
];

document.querySelectorAll('.video-card').forEach(card => {
  card.addEventListener('click', () => {
    const video = videos[Number(card.dataset.video) - 1];
    if (!video || !portfolioVideo) return;
    portfolioVideo.src = video.src;
    if (videoBrand) videoBrand.textContent = video.brand;
    if (videoDesc) videoDesc.textContent = video.desc;
    videoModal?.classList.add('open');
    document.body.style.overflow = 'hidden';
    portfolioVideo.play().catch(() => {});
  });
});

function closeVideo() {
  if (portfolioVideo) {
    portfolioVideo.pause();
    portfolioVideo.removeAttribute('src');
    portfolioVideo.load();
  }
  videoModal?.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelector('.video-close')?.addEventListener('click', closeVideo);
videoModal?.querySelector('.modal-backdrop')?.addEventListener('click', closeVideo);

// Close open modal with Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeCase();
    closeVideo();
  }
});

// Replace broken images with a clean placeholder instead of the browser broken-image icon.
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.display = 'none';
    const parent = img.parentElement;
    if (parent && !parent.querySelector('.image-fallback')) {
      const fallback = document.createElement('div');
      fallback.className = 'image-fallback';
      fallback.textContent = 'YUVI / CREATIVE';
      parent.appendChild(fallback);
    }
  });
});
