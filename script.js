document.documentElement.classList.add("is-enhanced");

const cursor = document.querySelector(".cursor");
const ring = document.querySelector(".cursor__ring");
const label = document.querySelector(".cursor__label");
const heroImage = document.querySelector(".hero__image");
const zoomSection = document.querySelector(".zoom-experience");
const zoomStage = document.querySelector(".zoom-stage");
const revealItems = [...document.querySelectorAll(".reveal")];
const sectionMotionItems = [...document.querySelectorAll(".section-motion")];
const counters = [...document.querySelectorAll("[data-count]")];
const magneticItems = [...document.querySelectorAll(".magnetic")];
const languageButtons = [...document.querySelectorAll("[data-lang]")];
const translatedItems = [...document.querySelectorAll("[data-i18n]")];

const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const cursorPosition = { x: pointer.x, y: pointer.y };
let scrollTicking = false;

const translations = {
  zh: {
    heroCopy:
      "為台灣室內設計公司打造的高質感網站 Demo。以作品集、品牌敘事、動態互動、CMS 後台與 SEO 基礎設定，讓客戶在第一次瀏覽時就理解你的設計價值。",
    zoomCopy: "作品照片不只是排列，而是透過節奏、留白與互動，引導訪客慢慢進入空間。",
    showcaseCopy: "讓客戶還沒見面，就先感受到你的設計品味、專業程度與作品價值。",
    workResidence: "以大圖、細節圖與材質說明，呈現家的溫度與完整動線。",
    workCommercial: "強調品牌形象、客流動線與空間記憶點，適合餐飲、美業與零售。",
    workOffice: "整理辦公室、展間、會議空間案例，讓 B2B 客戶快速建立信任。",
    caseButton: "閱讀更多",
    studioCopy:
      "我們協助台灣室內設計公司製作能展現品牌質感、作品價值與專業信任感的網站。從網站企劃、設計、前端互動、CMS 後台、多語言內容到上線後維護，都可以依照預算與需求一起規劃。",
    studioPoint1: "先整理品牌定位、作品分類與詢問流程，再設計適合成交的網站架構。",
    studioPoint2: "製作高質感視覺、滑順動畫與手機版體驗，讓作品看起來更有價值。",
    studioPoint3: "可加入後台更新作品與消息，也能提供公開後的保守維護與小幅修改。",
    cmsTitle: "作品與消息，自己也能優雅更新。",
    cmsCopy:
      "後台可依預算與需求調整。基本方案可管理作品與最新消息，進階方案可加入多語內容、表單管理、SEO 欄位與權限設定。",
    cmsFeature1: "新增、編輯、排序作品案例，包含分類、坪數、地點、年份與圖片。",
    cmsFeature2: "發布裝修知識、媒體報導、品牌消息，增加網站內容厚度。",
    cmsFeature3: "可依需求支援繁中、英文、日文等多語欄位。",
    cmsFeature4: "收集詢問資料，整理預算、需求類型與聯絡狀態。",
    seoTitle: "不只好看，也讓正在找設計公司的客戶更容易遇見你。",
    seoCopy:
      "可追加設定基礎 SEO：頁面標題、描述、Open Graph 分享圖、作品分類、圖片 alt、網站速度與搜尋引擎提交。也能協助規劃「台北室內設計」「商業空間設計」等關鍵字方向。",
    serviceTitle: "客製網站設計，讓作品被看見、讓詢問更自然。",
    serviceCopy:
      "依照室內設計公司的品牌風格、作品類型與業務目標，規劃專屬網站視覺、頁面架構與後台功能。從形象展示到作品管理、SEO 基礎設定與上線維護，都能依預算分階段製作。",
    servicePoint1: "依品牌質感客製視覺設計",
    servicePoint2: "全站支援手機、平板與桌機瀏覽",
    servicePoint3: "可加入 CMS 後台、SEO 欄位與多語內容",
    serviceType1: "形象網站設計",
    serviceType2: "作品案例網站",
    serviceType3: "CMS 後台建置",
    serviceType4: "SEO 與多語設定",
    serviceProcessTitle: "服務流程，用心對待每一步",
    flowTitle1: "確認網站需求",
    flowTitle2: "規劃頁面架構",
    flowTitle3: "進行網站製作",
    flowTitle4: "修改確認與上線",
    flow1: "討論網站架構、品牌風格、作品分類、功能需求與預算範圍。",
    flow2: "整理首頁、作品、關於我們、服務內容與聯絡流程，讓訪客更容易諮詢。",
    flow3: "製作高質感視覺、互動動畫、手機版體驗、多語內容與必要後台功能。",
    flow4: "公開前確認內容與樣式，完成上線設定，並可接續保守維護與小幅更新。",
    pricingTitle: "從清楚的預算開始，依照品牌需求逐步升級。",
    pricingCopy:
      "基本製作費約 NT$30,000 起。實際金額會依頁面數、作品數量、多語言、CMS 後台功能、SEO 設定與客製互動效果而調整。",
    priceBuild: "形象首頁、作品展示、公司介紹、聯絡表單等。",
    priceAddon: "後台、多語內容、SEO 欄位、文章系統依需求估價。",
    priceCare: "輕微修改、備份、狀態確認、操作支援與基本維護。",
    contactTitle: "讓網站成為你的線上門面，也成為客戶主動諮詢的入口。",
    contactCopy: "可依實際室內設計公司的作品、品牌調性與預算，調整成正式提案網站。"
  },
  en: {
    heroCopy:
      "A premium website demo for interior design studios in Taiwan. Portfolio storytelling, refined motion, CMS management, and SEO foundations help clients understand your design value from the first visit.",
    zoomCopy: "Project images are not just arranged. They are paced with space, motion, and interaction so visitors can enter the atmosphere slowly.",
    showcaseCopy: "Before a consultation begins, the website can already communicate taste, professionalism, and the value of each project.",
    workResidence: "Large visuals, detail shots, materials, and planning notes communicate warmth and livable flow.",
    workCommercial: "Brand identity, customer routes, and memorable scenes for restaurants, beauty, retail, and service spaces.",
    workOffice: "Office, showroom, and meeting space portfolios help B2B clients build trust quickly.",
    caseButton: "View More",
    studioCopy:
      "We help interior design studios in Taiwan build websites that communicate brand quality, portfolio value, and professional trust. Planning, design, frontend interaction, CMS, multilingual content, launch, and maintenance can be shaped around your budget and goals.",
    studioPoint1: "We organize brand positioning, portfolio categories, and inquiry flow before designing the site structure.",
    studioPoint2: "We create refined visuals, smooth motion, and mobile experiences that make each project feel more valuable.",
    studioPoint3: "CMS updates, news posting, post-launch maintenance, and small revisions can be included.",
    cmsTitle: "A backend your team can update with confidence.",
    cmsCopy:
      "The backend can scale with budget and needs. A basic setup manages projects and news; advanced options can add multilingual content, inquiry management, SEO fields, and permissions.",
    cmsFeature1: "Add, edit, and sort portfolio projects with category, size, location, year, and image fields.",
    cmsFeature2: "Publish renovation guides, press updates, and brand news to strengthen content depth.",
    cmsFeature3: "Support Traditional Chinese, English, Japanese, or other language fields when needed.",
    cmsFeature4: "Collect inquiry details, budget ranges, project types, and contact status.",
    seoTitle: "A beautiful site that can also be found by clients searching for design studios.",
    seoCopy:
      "Optional SEO setup can include page titles, descriptions, Open Graph images, project categories, image alt text, speed checks, and search engine submission. Keyword direction such as Taipei interior design or commercial space design can also be planned.",
    serviceTitle: "Custom website design that makes projects visible and inquiries feel natural.",
    serviceCopy:
      "We plan dedicated visuals, page structure, and backend functions around each interior studio's brand, project types, and business goals. Portfolio presentation, CMS management, SEO foundations, and post-launch care can be built in stages based on budget.",
    servicePoint1: "Custom visuals shaped around brand quality",
    servicePoint2: "Responsive design for mobile, tablet, and desktop",
    servicePoint3: "CMS, SEO fields, and multilingual content can be added",
    serviceType1: "Brand Website",
    serviceType2: "Portfolio Website",
    serviceType3: "CMS Backend",
    serviceType4: "SEO & Multilingual",
    serviceProcessTitle: "A careful process for every step",
    flowTitle1: "Confirm Requirements",
    flowTitle2: "Plan Structure",
    flowTitle3: "Design & Build",
    flowTitle4: "Revise & Launch",
    flow1: "Discuss site structure, brand tone, portfolio categories, functional needs, and budget range.",
    flow2: "Organize the homepage, portfolio, about page, services, and inquiry flow so visitors can contact you easily.",
    flow3: "Build refined visuals, motion, mobile experience, multilingual content, and required CMS functions.",
    flow4: "Review content and styling before launch, complete setup, then continue with maintenance and small updates.",
    pricingTitle: "Start with a clear budget, then upgrade by brand needs.",
    pricingCopy:
      "Website production starts around NT$30,000. The final quote depends on page count, project volume, multilingual scope, CMS functions, SEO setup, and custom interactions.",
    priceBuild: "Landing page, portfolio, company profile, inquiry form, and core brand pages.",
    priceAddon: "CMS, multilingual fields, SEO fields, and article systems are quoted by scope.",
    priceCare: "Small edits, backups, status checks, operation support, and basic maintenance.",
    contactTitle: "Turn your website into a refined first impression and a clear path to inquiry.",
    contactCopy: "This demo can be adapted into a real proposal website based on the studio's portfolio, brand tone, and budget."
  }
};

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function setLanguage(language) {
  const dictionary = translations[language] || translations.zh;
  document.documentElement.lang = language === "zh" ? "zh-Hant" : "en";

  translatedItems.forEach((item) => {
    const key = item.dataset.i18n;
    if (dictionary[key]) item.textContent = dictionary[key];
  });

  languageButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === language);
  });
}

function renderCursor() {
  cursorPosition.x = lerp(cursorPosition.x, pointer.x, 0.34);
  cursorPosition.y = lerp(cursorPosition.y, pointer.y, 0.34);
  cursor.style.transform = `translate3d(${cursorPosition.x - 46}px, ${cursorPosition.y - 46}px, 0)`;
  requestAnimationFrame(renderCursor);
}

function startCounter(element) {
  if (element.dataset.done) return;
  element.dataset.done = "true";

  const target = Number(element.dataset.count);
  const duration = 1100;
  const startedAt = performance.now();

  function tick(now) {
    const progress = Math.min((now - startedAt) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.round(target * eased).toLocaleString("ja-JP");

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      if (entry.target.matches("[data-count]")) startCounter(entry.target);
      entry.target.querySelectorAll?.("[data-count]").forEach(startCounter);
    });
  },
  { threshold: 0.22 }
);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-in-section", entry.isIntersecting);
    });
  },
  { rootMargin: "-18% 0px -22%", threshold: 0.18 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 4, 3) * 90}ms`;
  observer.observe(item);
});
counters.forEach((counter) => observer.observe(counter));
sectionMotionItems.forEach((section) => sectionObserver.observe(section));

window.addEventListener("pointermove", (event) => {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
  cursor.classList.add("is-visible");
});

window.addEventListener("pointerleave", () => {
  cursor.classList.remove("is-visible");
});

magneticItems.forEach((item) => {
  item.addEventListener("pointerenter", () => {
    cursor.classList.add("is-active");
    label.textContent = item.dataset.cursor || "VIEW";
  });

  item.addEventListener("pointermove", (event) => {
    if (item.classList.contains("work-card")) return;

    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    item.style.transform = `translate3d(${x * 0.08}px, ${y * 0.08}px, 0)`;

    if (ring) {
      ring.style.transform = `translate3d(${x * 0.1}px, ${y * 0.1}px, 0)`;
    }
  });

  item.addEventListener("pointerleave", () => {
    cursor.classList.remove("is-active");
    item.style.transform = "";
    if (ring) ring.style.transform = "";
  });
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.lang);
  });
});

function updateScrollEffects() {
  scrollTicking = false;

  if (heroImage) {
    const y = Math.min(window.scrollY * 0.18, 92);
    const heroScale = 1.04 + Math.min(window.scrollY / window.innerHeight, 1) * 0.08;
    heroImage.style.setProperty("--parallax", `${y}px`);
    heroImage.style.setProperty("--hero-scale", heroScale.toFixed(3));
  }

  if (zoomSection && zoomStage) {
    const rect = zoomSection.getBoundingClientRect();
    const travel = zoomSection.offsetHeight - window.innerHeight;
    const progress = clamp(-rect.top / travel, 0, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    zoomStage.style.setProperty("--zoom-progress", eased.toFixed(3));
    zoomStage.style.setProperty("--zoom-scale", (0.64 + eased * 1.11).toFixed(3));
    zoomStage.style.setProperty("--zoom-image-scale", (1.18 - eased * 0.2).toFixed(3));
    zoomStage.style.setProperty("--zoom-radius", `${Math.round(34 - eased * 34)}px`);
    zoomStage.style.setProperty("--zoom-copy-opacity", `${clamp(1 - progress * 1.75, 0, 1).toFixed(3)}`);
    zoomStage.style.setProperty("--zoom-copy-y", `${Math.round(progress * -34)}px`);
  }

  sectionMotionItems.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const progress = clamp(
      (window.innerHeight - rect.top) / (window.innerHeight + rect.height),
      0,
      1
    );
    const fadeIn = clamp(
      (window.innerHeight * 1.18 - rect.top) / (window.innerHeight * 0.48),
      0,
      1
    );
    const fadeOut = clamp(
      (rect.bottom + window.innerHeight * 0.2) / (window.innerHeight * 0.52),
      0,
      1
    );
    const visibility = Math.min(fadeIn, fadeOut);
    const baseOpacity = section.classList.contains("section-motion--linger") ? 0.76 : 0.6;
    const maxFadeY = section.classList.contains("section-motion--linger") ? 10 : 16;
    const sectionOpacity = baseOpacity + visibility * (1 - baseOpacity);
    const gridOpacity = (0.08 + progress * 0.14) * visibility;
    const darkGridOpacity = (0.14 + progress * 0.18) * visibility;
    section.style.setProperty("--section-progress", progress.toFixed(3));
    section.style.setProperty("--section-visibility", visibility.toFixed(3));
    section.style.setProperty("--section-opacity", sectionOpacity.toFixed(3));
    section.style.setProperty("--section-grid-opacity", gridOpacity.toFixed(3));
    section.style.setProperty("--section-dark-grid-opacity", darkGridOpacity.toFixed(3));
    section.style.setProperty("--section-fade-y", `${Math.round((1 - visibility) * maxFadeY)}px`);
    section.style.setProperty("--section-drift", `${Math.round((progress - 0.5) * 34)}px`);
  });
}

function requestScrollUpdate() {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(updateScrollEffects);
}

window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("resize", requestScrollUpdate);

updateScrollEffects();
setLanguage("zh");
renderCursor();
