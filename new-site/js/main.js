/* ================================================
   RUMAH ORKESTRA JOGJA — Main JavaScript
   Navigation, Scroll Animations, Data Rendering
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initLightbox();
  initHeroParallax();

  // Page-specific initializations
  const page = document.body.dataset.page;
  if (page === 'home') initHomePage();
  if (page === 'community') initCommunityPage();
  if (page === 'event') initEventPage();
});

/* ====== Page Loader ====== */
function initLoader() {
  const loader = document.querySelector('.page-loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      // Trigger hero animation
      const heroBg = document.querySelector('.hero-bg img');
      if (heroBg) heroBg.style.transform = 'scale(1)';
      // Trigger typing reveal after loader
      initTypingReveal();
    }, 400);
  });
}

/* ====== Navbar Scroll Effect ====== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/* ====== Mobile Menu ====== */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ====== Scroll Reveal Animations ====== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ====== Hero Parallax Effect ====== */
function initHeroParallax() {
  const heroBg = document.querySelector('.hero-bg');
  const hero = document.querySelector('.hero');
  if (!heroBg || !hero) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    // Only apply parallax while hero is in viewport
    if (scrollY < heroBottom) {
      heroBg.style.transform = `translateY(${scrollY * 0.4}px)`;
    }
  }, { passive: true });
}

/* ====== Typing / Text Reveal on Hero Title ====== */
function initTypingReveal() {
  const heroTitle = document.querySelector('.hero-title');
  if (!heroTitle) return;

  // Process each child node (text nodes and elements like <span>)
  const children = Array.from(heroTitle.childNodes);
  heroTitle.innerHTML = '';
  let charIndex = 0;
  const baseDelay = 0.5; // Start after loader (seconds)
  const charDelay = 0.035; // Delay between each character

  children.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      // Split text into individual characters
      const text = node.textContent;
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === ' ' || char === '\n' || char === '\r') {
          // Preserve whitespace without animation
          heroTitle.appendChild(document.createTextNode(char));
        } else {
          const span = document.createElement('span');
          span.className = 'char';
          span.textContent = char;
          span.style.animationDelay = `${baseDelay + charIndex * charDelay}s`;
          heroTitle.appendChild(span);
          charIndex++;
        }
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Clone the element (e.g., <span class="highlight">)
      const clone = node.cloneNode(false);
      const text = node.textContent;
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === ' ') {
          clone.appendChild(document.createTextNode(' '));
        } else {
          const span = document.createElement('span');
          span.className = 'char';
          span.textContent = char;
          span.style.animationDelay = `${baseDelay + charIndex * charDelay}s`;
          clone.appendChild(span);
          charIndex++;
        }
      }
      heroTitle.appendChild(clone);
    }
  });
}

/* ====== Lightbox ====== */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (!lightbox) return;

  document.addEventListener('click', (e) => {
    if (e.target.matches('.event-gallery img, .gallery-trigger')) {
      lightboxImg.src = e.target.src;
      lightbox.classList.add('open');
    }
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
      lightbox.classList.remove('open');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lightbox.classList.remove('open');
  });
}

/* ====== Inline Data (to avoid CORS issues with file:// protocol) ====== */
const TEAM_DATA = [
  { name: "Iwan Setianjaya, S.Sn., M.A.", role: "Executive Director", photo: "images/team/prifile1-Recovered_01-768x768.png" },
  { name: "Habibi Rahman, S.Pd., M.A.", role: "Executive Musical Director", photo: "images/team/prifile1-Recovered_02-768x768.png" },
  { name: "Afifah Hasna Sekaringtyas, S.Psi.", role: "Managing Director", photo: "images/team/prifile1-Recovered_03-768x768.png" },
  { name: "Aryasatya Rafa, S.Fil.", role: "Creative Director", photo: "images/team/prifile1-Recovered_06-768x768.png" },
  { name: "Petrus Artanto Bimo Sakti", role: "Music Director", photo: "images/team/prifile1-Recovered_07-768x768.png" },
  { name: "Daffa Mahendra", role: "Musical Rehearsal Manager", photo: "images/team/prifile1-Recovered_09-768x768.png" },
  { name: "Dellin Vitaria, S.Pd.", role: "Community Manager", photo: "images/team/prifile1-Recovered_04-768x768.png" },
  { name: "Haryo Gumilang S", role: "RnD Manager", photo: "images/team/prifile1-Recovered_08-768x768.png" },
  { name: "Paramesti Raditya Gantari, S.T.P.", role: "Social Media Specialist Manager", photo: "images/team/prifile1-Recovered_17-768x768.png" },
  { name: "Al Wafa", role: "Digital Media Specialist", photo: "images/team/prifile1-Recovered_05-768x768.png" },
  { name: "Ikshan Prasaja", role: "Safety Manager", photo: "images/team/prifile1-Recovered_12-768x768.png" },
  { name: "Ega Ariasatya", role: "IT Manager", photo: "images/team/prifile1-Recovered_15-768x768.png" },
  { name: "Turibius Roswanda Hastyoaji, S.Tr.I.Kom.", role: "Road Manager", photo: "images/team/prifile1-Recovered_18-768x768.png" },
  { name: "Yosia Sebayang, S.Tr.I.Kom.", role: "Event Manager", photo: "images/team/prifile1-Recovered_11-768x768.png" },
  { name: "Muhammad Khoirur Roziqin, S.Sn.", role: "Sound Engineer", photo: "images/team/prifile1-Recovered_16-768x768.png" },
  { name: "Bagus Nur Hadiyanto, S.E.", role: "Content Media Specialist", photo: "images/team/prifile1-Recovered_14-768x768.png" },
  { name: "Rahman Yoman", role: "Orchestra System Engineer", photo: "images/team/prifile1-Recovered_10-768x768.png" },
  { name: "Imam Maulana", role: "Inventory Manager", photo: "images/team/prifile1-Recovered_13-768x768.png" }
];

const EVENTS_DATA = [
  {
    id: "ghibli-2",
    title: "Saga from Our Childhood: Ghibli Chapter 2",
    description: "Melanjutkan perjalanan musikal kami melalui dunia Studio Ghibli, konser ini menghadirkan aransemen orkestra dari soundtrack-soundtrack legendaris yang telah menyentuh hati jutaan orang di seluruh dunia.",
    venue: "Yogyakarta",
    date: "2026",
    tags: ["Concert", "Ghibli", "Orchestral"],
    image: "images/events/WhatsApp-Image-2025-10-13-at-21.34.25-1-1024x682.jpeg",
    gallery: [
      "images/events/WhatsApp-Image-2025-10-13-at-21.34.25-1024x682.jpeg",
      "images/events/WhatsApp-Image-2025-10-13-at-21.34.26-1024x682.jpeg",
      "images/events/WhatsApp-Image-2025-10-13-at-21.34.27-1024x682.jpeg"
    ],
    featured: false
  },
  {
    id: "one-piece",
    title: "Saga from Our Childhood: One Piece Romance Dawn",
    description: "Dengan tema persahabatan, ketekunan, dan keberanian, kisah One Piece menjadi kanvas yang kuat untuk interpretasi musikal. Konser ini digelar di Performance Hall Universitas Negeri Yogyakarta pada Agustus 2024, menghadirkan aransemen orkestra dari musik-musik ikoniknya yang dimainkan oleh para musisi muda.",
    venue: "Performance Hall Universitas Negeri Yogyakarta",
    date: "Agustus 2024",
    tags: ["Concert", "Anime", "Grand Concert"],
    image: "images/events/orkestra-scaled-1-1024x682.jpg",
    gallery: [
      "images/events/DSC01425-1024x683.jpg",
      "images/events/DSC01463-1024x683.jpg",
      "images/events/DSC01522-1024x683.jpg",
      "images/events/DSC01598-1024x683.jpg",
      "images/events/DSC02024-1024x683.jpg",
      "images/events/DSC02265-1024x683.jpg"
    ],
    featured: true
  },
  {
    id: "resital-2",
    title: "Resital Musik Kamar #2",
    description: "Pertunjukan musik kamar intim yang menampilkan karya-karya klasik dalam format ensemble kecil, memberikan kesempatan bagi musisi muda untuk menampilkan keterampilan teknis dan ekspresi musikal mereka.",
    venue: "Yogyakarta",
    date: "2024",
    tags: ["Chamber Music", "Recital"],
    image: "images/events/DSC06277-Enhanced-NR-1024x683.jpg",
    gallery: [
      "images/events/DSC06233-1024x683.jpg",
      "images/events/DSC06277-Enhanced-NR-1024x683.jpg",
      "images/events/DSC01135-1024x683.jpg"
    ],
    featured: false
  },
  {
    id: "showchestra",
    title: "Showchestra",
    description: "Sebuah pertunjukan orkestra yang menggabungkan musik, visual, dan storytelling dalam satu panggung spektakuler. Showchestra hadir sebagai wujud kreativitas dan inovasi Rumah Orkestra Jogja dalam menyajikan musik klasik dengan cara yang segar dan modern.",
    venue: "Yogyakarta",
    date: "2024",
    tags: ["Show", "Visual Concert"],
    image: "images/events/DSC01238-683x1024.jpg",
    gallery: [
      "images/events/DSC01238-1024x1536.jpg",
      "images/events/DSC01244-1024x683.jpg",
      "images/events/DSC01135-1024x683.jpg"
    ],
    featured: false
  }
];

const PERSONEL_DATA = [
  {
    section: "Violin 1",
    members: [
      { name: "Nama Personel 1", photo: "images/personel/DSC00036-768x512.jpg" },
      { name: "Nama Personel 2", photo: "images/personel/DSC00041-768x512.jpg" },
      { name: "Nama Personel 3", photo: "images/personel/DSC00055-1-683x1024.jpg" }
    ]
  },
  {
    section: "Violin 2",
    members: [
      { name: "Nama Personel 4", photo: "images/personel/DSC00062-683x1024.jpg" },
      { name: "Nama Personel 5", photo: "images/personel/DSC00064-683x1024.jpg" },
      { name: "Nama Personel 6", photo: "images/personel/DSC00076-683x1024.jpg" }
    ]
  },
  {
    section: "Violin 3",
    members: [
      { name: "Nama Personel 7", photo: "images/personel/DSC00091-683x1024.jpg" },
      { name: "Nama Personel 8", photo: "images/personel/agatha-768x512.jpg" }
    ]
  },
  {
    section: "Viola 1",
    members: [
      { name: "Nama Personel 9", photo: "images/personel/aisha-new-768x512.jpg" },
      { name: "Nama Personel 10", photo: "images/personel/DSC00036-768x512.jpg" }
    ]
  },
  {
    section: "Viola 2",
    members: [
      { name: "Nama Personel 11", photo: "images/personel/DSC00041-768x512.jpg" },
      { name: "Nama Personel 12", photo: "images/personel/DSC00055-1-683x1024.jpg" }
    ]
  },
  {
    section: "Cello",
    members: [
      { name: "Nama Personel 13", photo: "images/personel/DSC00062-683x1024.jpg" },
      { name: "Nama Personel 14", photo: "images/personel/DSC00064-683x1024.jpg" }
    ]
  },
  {
    section: "Flute",
    members: [
      { name: "Nama Personel 15", photo: "images/personel/DSC00076-683x1024.jpg" },
      { name: "Nama Personel 16", photo: "images/personel/DSC00091-683x1024.jpg" }
    ]
  },
  {
    section: "Percussion",
    members: [
      { name: "Nama Personel 17", photo: "images/personel/agatha-768x512.jpg" },
      { name: "Nama Personel 18", photo: "images/personel/aisha-new-768x512.jpg" }
    ]
  }
];

/* ====== Home Page ====== */
function initHomePage() {
  loadFeaturedEvent();
}

function loadFeaturedEvent() {
  const events = EVENTS_DATA;
  const featured = events.find(e => e.featured) || events[0];

  const container = document.getElementById('featured-event');
  if (!container || !featured) return;

  container.innerHTML = `
    <div class="featured-event-grid">
      <div class="featured-event-image reveal">
        <img src="${featured.image}" alt="${featured.title}" loading="lazy">
      </div>
      <div class="featured-event-info reveal reveal-delay-2">
        <div class="section-label">Event Terbaru</div>
        <h3>${featured.title}</h3>
        <p>${featured.description}</p>
        <div class="event-meta">
          <div class="event-meta-item">
            <span class="icon">📍</span>
            <span>${featured.venue}</span>
          </div>
          <div class="event-meta-item">
            <span class="icon">📅</span>
            <span>${featured.date}</span>
          </div>
        </div>
        <a href="event.html" class="btn-outline">Lihat Semua Event →</a>
      </div>
    </div>
  `;

  // Re-init reveal for new elements
  initScrollReveal();
}

/* ====== Community Page ====== */
function initCommunityPage() {
  const team = TEAM_DATA;

  const grid = document.getElementById('team-grid');
  if (!grid) return;

  grid.innerHTML = team.map((member, i) => `
    <div class="team-card reveal reveal-delay-${(i % 5) + 1}">
      <div class="team-photo-wrapper">
        <div class="team-photo-ring"></div>
        <img class="team-photo" src="${member.photo}" alt="${member.name}" loading="lazy">
      </div>
      <h3 class="team-name">${member.name}</h3>
      <p class="team-role">${member.role}</p>
    </div>
  `).join('');

  renderPersonel();
  initScrollReveal();
}

/* ====== Personel by Instrument ====== */
function renderPersonel() {
  const container = document.getElementById('personel-container');
  if (!container) return;

  container.innerHTML = PERSONEL_DATA.map((group) => `
    <div class="personel-instrument-group reveal">
      <h3 class="personel-instrument-title">${group.section}</h3>
      <div class="personel-members-grid">
        ${group.members.map((member, i) => `
          <div class="personel-card reveal reveal-delay-${(i % 5) + 1}">
            <div class="personel-card-photo-wrapper">
              <img class="personel-card-photo" src="${member.photo}" alt="${member.name}" loading="lazy">
            </div>
            <p class="personel-card-name">${member.name}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* ====== Event Page ====== */
function initEventPage() {
  const events = EVENTS_DATA;

  const grid = document.getElementById('events-grid');
  if (!grid) return;

  grid.innerHTML = events.map((event, i) => `
    <div class="event-card reveal">
      <div class="event-card-image">
        <img src="${event.image}" alt="${event.title}" loading="lazy">
      </div>
      <div class="event-card-content">
        <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 12px;">
          ${event.tags.map(tag => `<span class="event-tag">${tag}</span>`).join('')}
        </div>
        <h3>${event.title}</h3>
        <p>${event.description}</p>
        <div class="event-meta" style="margin-bottom: 16px;">
          <div class="event-meta-item">
            <span class="icon">📍</span>
            <span>${event.venue}</span>
          </div>
          <div class="event-meta-item">
            <span class="icon">📅</span>
            <span>${event.date}</span>
          </div>
        </div>
        ${event.gallery && event.gallery.length > 0 ? `
          <div class="event-gallery">
            ${event.gallery.slice(0, 3).map(img => `
              <img src="${img}" alt="${event.title} gallery" loading="lazy">
            `).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  `).join('');

  initScrollReveal();
}
